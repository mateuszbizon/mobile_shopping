import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    if (isLoading) {
        return <ActivityIndicator size={"large"} />
    }

    if (!user) {
        router.replace('/sign-in');
        return null;
    }

  return (
    <View>
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
