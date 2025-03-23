import { account } from '@/lib/appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

type User = {
    id: string;
    email: string;
} | null

type AuthContextType = {
  user: User;
  isLoading: boolean;
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
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
        {children}
    </AuthContext.Provider>
  );
};
