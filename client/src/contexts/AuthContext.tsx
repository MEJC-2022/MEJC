import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextValue {
  user: any;
  setUser: (user: any) => void;
}

interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
}

const initialAuthValues: AuthContextValue = {
  user: {},
  setUser: () => {}
};

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>(initialAuthValues);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
