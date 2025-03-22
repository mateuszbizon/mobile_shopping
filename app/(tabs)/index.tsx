import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
        <Link href="./sign-in" className="mb-10 p-5 bg-blue-500 text-white text-center mt-10">
            <Text>Sign in</Text>
        </Link>
        <Link href="./sign-up">
            <Text>Sign up</Text>
        </Link>
    </View>
  );
}
