/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : HomePage.tsx
Created By  : Vincent Fournier (contribution visuelle: Bettina-Sarah Janesch)
About       : Le composant HomePage affiche un logo et des boutons pour se connecter 
              ou créer un compte. Il utilise useNavigate pour gérer la navigation 
              entre les pages de connexion et d'inscription. Les boutons sont stylés 
              avec une transition de couleurs pour améliorer l'interaction de 
              l'utilisateur.
====================================================================================
------------------------------------------------------------------------------------
*/

import { useNavigate } from "react-router-dom";
import Logo from "../../ressources/icons/logo.png";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleRegisterButtonClick = () => {
    navigate("/create-account");
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-home-bg bg-cover bg-bottom">
      <h1
        className="p-8 font-leckerli text-base-text text-6xl font-extrabold"
        style={{
          transform: "translateX(-1rem) translateY(3rem) rotate(-20deg)",
        }}
      >
        GreenFlag
      </h1>
      <div>
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="text-align-left text-2xl text-custom-bg">
          Emotional availability-based matching
        </h2>
        <p className="text-custom-bg">
          Tired of traditional dating apps? We got you!
        </p>
        <div className="flex flex-col m-3 py-3">
          <button
            onClick={handleLoginButtonClick}
            className=" transition-colors duration-300 bg-custom-bg hover:bg-primary-color
             text-primary-color hover:text-custom-bg border-2 border-custom-bg 
             font-bold py-2 px-4 rounded my-2 mx-6"
          >
            Go to Login
          </button>
          <button
            onClick={handleRegisterButtonClick}
            className="transition-colors duration-300 ease-in-out bg-primary-color hover:bg-custom-bg/80
            text-custom-bg hover:text-primary-color border-2 border-custom-bg hover:border-custom-bg/80
            font-bold py-2 px-4 rounded my-2 mx-6"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
