import EmptyList from "@/components/EmptyList";
import PageLoading from "@/components/PageLoading";
import { useAuth } from "@/context/AuthContext";
import { getShoppingList } from "@/services/shoppingListService";
import { ShoppingList } from "@/types";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

export default function Index() {
    const { user, isLoading: isUserLoading } = useAuth()
    const router = useRouter()
    const [groupedList, setGroupedList] = useState<{ [key: string]: ShoppingList[] }>({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            fetchShoppingList()
        }
    }, [user])

    const fetchShoppingList = async () => {
        setIsLoading(true)
        const data = await getShoppingList(user?.id!) as ShoppingList[]

        const groupedList = data.reduce((acc, item) => {
            const category = item.products.categories.name

            acc[category] = acc[category] || []
            acc[category].push(item)

            return acc
        }, {} as { [key: string]: ShoppingList[] })

        setGroupedList(groupedList)
        setIsLoading(false)
    }

    if (isUserLoading) {
        return <PageLoading />
    }

    if (!user) {
        router.replace('/sign-in');
        return null;
    }

  return (
    <View className="container">
        <Text className="heading1 text-center mb-8">Lista zakupów</Text>
        <Link href={"/(tabs)/shopping-list"} className="btn-primary mb-8">
            <Text className="btn-text">Edytuj listę zakupów</Text>
        </Link>
        {isLoading ? (
            <ActivityIndicator size={"large"} />
        ) : (
            <FlatList
                data={Object.keys(groupedList)}
                keyExtractor={(category) => category}
                renderItem={({ item }) => (
                    <View className="card mb-4">
                        <Text className="heading2 mb-4">{item}</Text>
                        {groupedList[item].map((product) => (
                            <Text key={product.$id} className="text-xl font-medium text-dark mb-3">
                                {product.products.name} x{product.quantity}
                            </Text>
                        ))}
                    </View>
                )}
                ListEmptyComponent={() => <EmptyList text="Lista zakupów jest pusta" />}
            />
        )}
    </View>
  );
}
