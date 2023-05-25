import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

// Interfaces and initial values
interface AuthContextValue {
  user: any;
  setUser: (user: any) => void;
  userAuthentication: () => void;
}

const initialAuthValues: AuthContextValue = {
  user: {},
  setUser: () => {},
  userAuthentication: () => {},
};
interface User {
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

  const userAuthentication = useCallback(async () => {
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
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
