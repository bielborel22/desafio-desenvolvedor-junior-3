import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { User } from "../pages/SignUp";
import { Navigate } from "react-router-dom";

type AuthContextType = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user) as User);
    }
  }, []);

  console.log(user);

  const signIn = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
