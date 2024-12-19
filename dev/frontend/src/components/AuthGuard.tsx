/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : AuthGuard.tsx
Created By  : Bettina-Sarah Janesh
About       : Le composant AuthGuard vérifie la présence d'un jeton d'authentification
              dans le sessionStorage pour déterminer si l'utilisateur est authentifié. 
              S'il n'y a pas de jeton, l'utilisateur est redirigé vers la page de 
              connexion. Si le jeton est présent, il est vérifié auprès du backend. 
              En cas de succès, l'utilisateur reste authentifié, sinon, il est 
              redirigé vers la page d'accueil. Les enfants sont rendus uniquement si 
              l'utilisateur est authentifié.
====================================================================================
------------------------------------------------------------------------------------
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "@/api/fetchData";
import { AuthGuardProps, TokenData } from "@/interfaces/interfaces";

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
            "auth session storage:",
            sessionStorage.getItem("authToken")
          );
          const response = await fetchData<TokenData>(
            "/verify-token",
            sessionStorage.getItem("authToken")
          );
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
          } else if (response.token !== undefined) {
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

export default AuthGuard;
