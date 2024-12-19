/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : ReverseAuthGuard.tsx
Created By  : Bettina-Sarah Janesch
About       : ReverseAuthGuard est un composant React qui vérifie si un utilisateur 
              est authentifié via un token dans sessionStorage. Si l'utilisateur 
              est connecté, il est redirigé vers "/matching", sinon le contenu 
              enfant est affiché.
====================================================================================
------------------------------------------------------------------------------------
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ReverseAuthGuardProps {
  children: React.ReactNode;
}

const ReverseAuthGuard: React.FC<ReverseAuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoggedIn = () => {
      const authToken = sessionStorage.getItem("authToken");

      if (authToken) {
        setIsLoggedIn(true);
        navigate("/matching");
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, [navigate]);

  if (isLoggedIn === null) return null;

  return <>{!isLoggedIn ? children : null}</>;
};

export default ReverseAuthGuard;
