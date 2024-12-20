/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : LoginForm.tsx
Created By  : Vincent Fournier
About       : Le composant LoginForm utilise React Hook Form pour gérer le 
              formulaire de connexion avec validation des champs email et 
              mot de passe, et gère également les erreurs de connexion en affichant 
              des messages d’erreur pertinents.
====================================================================================
------------------------------------------------------------------------------------
*/

import { IP_SERVER } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import EmailIcon from "@/../ressources/icons/email.png";
import LockIcon from "@/../ressources/icons/lock.png";
import { useState } from "react";

// FORM LIBRARY: React hook form

const LoginForm = () => {
  const navigate = useNavigate();

  type FormData = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data: object | boolean) => {
    try {
      const answer = await axios.post(IP_SERVER + "/login", data);
      if (answer.data && typeof answer.data === "object") {
        sessionStorage.setItem("id", answer.data.id);
        sessionStorage.setItem("authToken", answer.data.token);
        sessionStorage.setItem(
          "profileComplete",
          answer.data.profile_completed
        );

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            data = {
              id: sessionStorage.getItem("id"),
              lat: latitude,
              long: longitude,
            };
            try {
              await axios.post(IP_SERVER + "/localisation", data);
            } catch (error) {
              console.error("Error sending location:", error);
            }
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              default:
                console.error("An unknown error occurred.");
                break;
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );

        if (sessionStorage.getItem("profileComplete") === "true") {
          navigate("/matching");
        } else {
          navigate("/questionnaire");
        }
      } else if (answer.data === false) {
        setLoginError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("A network or server error occured. Please try again");
    }
  });

  return (
    <div className="flex flex-col justify-center items-center w-full h-44">
      {/* Error message container */}
      {loginError && (
        <div className="flex justify-center w-full mb-4">
          <div className="rounded-md text-red-800 bg-red-400 p-2 border-red-800 border-2 text-md">
            {loginError}
          </div>
        </div>
      )}

      {/* Login form */}
      <form
        onSubmit={onSubmit}
        className="relative space-y-1 flex flex-col justify-between items-center w-full max-w-sm"
      >
        <div className="relative flex py-2 items-center w-full border-b-2 border-custom-bg mb-4">
          <img src={EmailIcon} className="size-7" />
          <input
            className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}

          />
          {errors.email && (
          <span className="absolute top-5 right-1 text-red-500 text-xs">
            {errors.email?.type === "required" && "This is required"}
            {errors.email?.type === "pattern" && "You need to provide a valid email"}
          </span>
        )}
        </div>

        <div className="relative flex !mb-[25px] py-2 items-center w-full border-b-2 border-custom-bg">
          <img src={LockIcon} className="size-7" />
          <input
            className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
            placeholder="Password"
            type="password"
            {...register("password", { required: true, maxLength: 20 })}
          />
          {errors.password && (
            <span className="absolute top-8 right-1 text-red-500 text-xs">
              {errors.password?.type === "required" && "This is required"}
              {errors.password?.type === "maxLength" && "Max length exceeded"}
            </span>
          )}
        </div>

        <button
          className="transition-colors duration-300 bg-custom-bg hover:bg-primary-color
             text-primary-color hover:text-custom-bg border-2 border-custom-bg 
             font-bold py-2 px-4 rounded my-4 mx-6 w-96"
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
