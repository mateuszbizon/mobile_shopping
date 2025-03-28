import { account } from '@/lib/appwrite';
import { logoutUser } from '@/services/authService';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

type User = {
    id: string;
    email: string;
} | null

type AuthContextType = {
  user: User;
  isLoading: boolean;
  logout: () => void
  saveUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  function saveUser(user: User) {
    setUser(user)
  }

  useEffect(() => {
    const checkUser = async () => {
        try {
            const accountData = await account.get()

            setUser({
                id: accountData.$id,
                email: accountData.email,
            })
        } catch {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    checkUser();
  }, [])

  async function logout() {
    setIsLoading(true)
    const logout = await logoutUser()

    if (logout) {
        setUser(null)
        router.replace("/sign-in")
        setIsLoading(false)
        return
    }

    Alert.alert("Błąd serwera", "Spróbuj ponownie później")
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, saveUser }}>
        {children}
    </AuthContext.Provider>
  );
};
