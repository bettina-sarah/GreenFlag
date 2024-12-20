/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : AuthGuard.tsx
Created By  : Bettina-Sarah Janesch
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
        setIsAuthenticated(false);
        navigate("/login");
        return;
      } else {
        try {
          const response = await fetchData<TokenData>(
            "/verify-token",
            sessionStorage.getItem("authToken")
          );
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

  if (isAuthenticated === null) return null;

  return <>{isAuthenticated ? children : null}</>;
};

export default AuthGuard;
