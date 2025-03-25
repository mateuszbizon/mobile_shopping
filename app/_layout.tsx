import { Stack } from "expo-router";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="categories/create" options={{ headerShown: false }} />
            <Stack.Screen name="categories/update/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="products/create" options={{ headerShown: false }} />
        </Stack>
    </AuthProvider>
  )
}
