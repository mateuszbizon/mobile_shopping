import PageLoading from "@/components/PageLoading";
import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    const { user, isLoading: isUserLoading } = useAuth()
    const router = useRouter()

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
