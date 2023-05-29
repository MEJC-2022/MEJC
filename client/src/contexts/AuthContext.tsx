import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

// Interfaces and initial values
interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  userAuthentication: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const initialAuthValues: AuthContextValue = {
  user: null,
  setUser: () => {},
  userAuthentication: () => {},
  isLoading: false,
  setLoading: () => {},
};
export interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
}

interface Props {
  children: ReactNode;
}

// Context setup
const AuthContext = createContext<AuthContextValue>(initialAuthValues);
export const useAuth = () => useContext(AuthContext);

// Provider
export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  const userAuthentication = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/authentication');
      if (response.status === 200) {
        const user = await response.json();
        setUser(user);
      }
    } catch (err) {
      console.error(
        'An error has occurred while trying to verify user authentication:\n',
        err,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userAuthentication,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
