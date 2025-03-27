import PageLoading from "@/components/PageLoading";
import { useAuth } from "@/context/AuthContext";
import { getShoppingList } from "@/services/shoppingListService";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Models } from "react-native-appwrite";

export default function Index() {
    const { user, isLoading: isUserLoading } = useAuth()
    const router = useRouter()
    const [shoppingList, setShoppingList] = useState<Models.Document[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            fetchShoppingList()
        }
    }, [user])

    const fetchShoppingList = async () => {
        setIsLoading(true)
        const data = await getShoppingList(user?.id!)
        setShoppingList(data)
        setIsLoading(false)
        console.log(data)
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
        <Link href="./sign-in" className="mb-10 p-5 bg-blue-500 text-white text-center mt-10">
            <Text>Sign in</Text>
        </Link>
        <Link href="./sign-up" className="mb-10 p-5 bg-blue-500 text-white text-center">
            <Text>Sign up</Text>
        </Link>
        <Text>{user.email}</Text>
    </View>
  );
}
