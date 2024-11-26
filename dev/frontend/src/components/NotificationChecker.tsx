import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "@/api/fetchData";

interface AuthGuardProps {
  children: React.ReactNode;
}

export interface TokenData {
  valid: boolean;
  token?: string;
}


interface NotificationProps {
    children: React.ReactNode;
  }

const NotificationChecker: React.FC<NotificationProps> = ({ children }) => {


    useEffect(() => {

    }
    );

}


export default NotificationChecker;











const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        // No token; redirect to login
        setIsAuthenticated(false);
        navigate("/login");
        return;
      } else {
        try {
          // Send the token to the backend for validation
          console.log(
            "auth session storage:",sessionStorage.getItem("authToken"));
          const response = await fetchData<TokenData>( "/verify-token", sessionStorage.getItem("authToken"));
          console.log("apres fetch AUTHGUARD:", response);
          if (typeof response === "boolean") {
            if (response) {
              setIsAuthenticated(true);
            }
            if (!response) {
              setIsAuthenticated(false);
              sessionStorage.removeItem("authToken");
              navigate("/");
            }
          } else if (response.token !== undefined){
            setIsAuthenticated(true);
            console.log("token if response is not bool:", response);
            console.log("response.token: ", response.token);
            const newToken = response.token;
            sessionStorage.setItem("authToken", newToken);
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          setIsAuthenticated(false);
          sessionStorage.removeItem("authToken");
          navigate("/");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  // While checking, dont render
  if (isAuthenticated === null) return null;

  // Render children if authenticated; otherwise, user is redirected
  return <>{isAuthenticated ? children : null}</>;
};
