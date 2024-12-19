/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : main.tsx
Created By  : Vincent Fournier et Bettina-Sarah Janesch
About       : Ce code importe les dépendances nécessaires, y compris React, le 
              composant App, le fichier de style index.css, et la bibliothèque de 
              notifications React Toastify. Ensuite, il rend le composant App dans 
              l'élément HTML avec l'ID "root" en utilisant createRoot de React.
====================================================================================
------------------------------------------------------------------------------------
*/


import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")!).render(<App/>);
