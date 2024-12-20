/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : RegisterForm.tsx
Created By  : Vincent Fournier
About       : Le composant RegisterForm est un formulaire React pour l'inscription 
              d'un utilisateur. Il utilise useForm pour la gestion du formulaire avec
              validation de champs (prénom, nom, email, mot de passe, confirmation du
              mot de passe) via react-hook-form. Les erreurs sont affichées 
              directement sous chaque champ en cas de validation échouée. Le formulaire 
              envoie les données au backend via une requête POST avec axios pour créer
              un compte et, en cas de succès, navigue vers la page de connexion.
====================================================================================
------------------------------------------------------------------------------------
*/

import { IP_SERVER } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import EmailIcon from "@/../ressources/icons/email.png";
import LockIcon from "@/../ressources/icons/lock.png";
import Lock2Icon from "@/../ressources/icons/lock2.png";
import PersonIcon from "@/../ressources/icons/person.png";

const RegisterForm = () => {
  const navigate = useNavigate(); //hook

  type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    cpassword: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const PasswordValue = watch("password");

  const authenticate = () => {
    localStorage.setItem("accountCreated", "true");
    navigate("/login");
  };

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const response = await axios.post(IP_SERVER + "/create-account", data);
      if (response.data) {
        authenticate();
      } else {
        console.log("Error during account creation:", response);
      }
    } catch (error) {
      console.error("Error during account creation:", error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex space-y-2 flex-col justify-between items-center p-4"
    >
      <div className="relative flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={PersonIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="First name"
          {...register("firstname", { required: true, maxLength: 50 })}
        />
                {errors.firstname && (
          <span className="absolute top-5 right-1 text-red-500 text-xs">
            {errors.firstname.type === "required" && "This is required"}
            {errors.firstname.type === "maxLength" && "Max length exceeded"}
          </span>
        )}
      </div>

      <div className="relative flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={PersonIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Last name"
          {...register("lastname", { required: true, maxLength: 50 })}
        />
        {errors.lastname && (
          <span className="absolute top-5 right-1 text-red-500 text-xs">
            {errors.lastname.type === "required" && "This is required"}
            {errors.lastname.type === "maxLength" && "Max length exceeded"}
          </span>
        )}
      </div>

      <div className="relative flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={EmailIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="E-mail"
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

      <div className="relative flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Password"
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
        />
        {errors.password && (
          <span className="absolute top-5 right-1 text-red-500 text-xs">
            {errors.password?.type === "required" && "This is required"}
            {errors.password?.type === "maxLength" && "Max length exceeded"}
          </span>
        )}
      </div>

      <div
        className="relative py-6 flex items-center w-full max-w-sm 
                border-b-2 h-6 border-custom-bg"
      >
        <img src={Lock2Icon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent
           border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Password confirmation"
          type="password"
          {...register("cpassword", {
            required: true,
            validate: (val: string) =>
              PasswordValue != val ? "Your passwords do not match" : true,
          })}
        />
        {errors.cpassword && (
          <span className="absolute top-5 right-1 text-red-500 text-xs">
            {errors.cpassword.type === "required" ? "This is required" : errors.cpassword.message}
          </span>
        )}
      </div>

      <button
        className="transition-colors duration-300 bg-custom-bg hover:bg-primary-color
             text-primary-color hover:text-custom-bg border-2 border-custom-bg 
             font-bold py-2 px-4 rounded my-4 mx-6 w-96"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;