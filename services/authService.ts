import { account } from "@/lib/appwrite"

export const logoutUser = async () => {
    try {
        await account.deleteSession("current")

        return true
    } catch (error) {
        console.error("Błąd wylogowywania: ", error)
        return false
    }
}