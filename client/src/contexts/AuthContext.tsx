import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextValue {
  isSignedIn: boolean;
  isAdmin: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  //Ta bort setIsAdmin när vi får svar från servern.
  setIsAdmin: (isAdmin: boolean) => void;
  handleSignInAsUser: (userId: string) => void;
  handleSignInAsAdmin: (userId: string) => void;
  sessionId: string | null;
  setSessionId: (sessionId: string | null) => void;
}

const initialAuthValues: AuthContextValue = {
  isSignedIn: false,
  isAdmin: false,
  sessionId: null,
  setSessionId: () => {
    throw new Error('setSessionId was called without being initialized');
  },
  setIsSignedIn: () => {
    throw new Error('setIsSignedIn was called without being initialized');
  },
  setIsAdmin: () => {
    throw new Error('setIsAdmin was called without being initialized');
  },
  handleSignInAsUser: () => {
    throw new Error('handleSignInAsUser was called without being initialized');
  },
  handleSignInAsAdmin: () => {
    throw new Error('handleSignInAsAdmin was called without being initialized');
  },
};

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>(initialAuthValues);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: Props) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleSignInAsUser = (userId: string) => {
    setIsSignedIn(true);
    setIsAdmin(false);
    setSessionId(userId);
  };

  const handleSignInAsAdmin = (userId: string) => {
    setIsSignedIn(true);
    setIsAdmin(true);
    setSessionId(userId);
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        isAdmin,
        setIsSignedIn,
        setIsAdmin,
        handleSignInAsUser,
        handleSignInAsAdmin,
        sessionId,
        setSessionId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
