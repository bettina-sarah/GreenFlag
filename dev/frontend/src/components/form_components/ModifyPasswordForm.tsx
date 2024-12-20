/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : ModifyPasswordForm.tsx
Created By  : Vincent Fournier
About       : Le composant ModifyPasswordForm utilise React Hook Form pour gérer le
              formulaire de modification de mot de passe avec validation des champs 
              anciens et nouveaux mots de passe, et envoie les données du formulaire 
              à une API pour mise à jour de mot de passe.
====================================================================================
------------------------------------------------------------------------------------
*/

import { IP_SERVER } from "@/constants";
import { useForm } from "react-hook-form";
import axios from "axios";
import LockIcon from "@/../ressources/icons/lock.png";
import EmailIcon from "@/../ressources/icons/email.png";
import { toast } from "react-toastify";

const ModifyPasswordForm = () => {
  type FormData = {
    email: string;
    password: string;
    cpassword: string;
    newpassword: string;
    cnewpassword: string;
  };

  const email = sessionStorage.getItem("email") || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const PasswordValue = watch("password");
  const NewPasswordValue = watch("newpassword");

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const answer = await axios.post(IP_SERVER + "/modify-password", data);
      if (answer.data) {
        toast.success("Password succesfully changed");
      }
    } catch (error) {
      console.error("Error during password modification:", error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col h-60 m-5 space-y-6"
    >
      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={EmailIcon} className="size-7 mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Email"
          defaultValue={email}
          {...register("email", {
            required: true,
            pattern: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
        />
        {errors.email && (
          <span className="absolute top-0 right-1 text-red-500 text-xs">
            {errors.email?.type === "required" && "This is required"}
            {errors.email?.type === "pattern" && "You need to provide a valid email"}
          </span>
        )}
      </div>

      {/* Old Password */}
      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7  mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Old password"
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
        />
        {errors.password && (
          <span className="absolute top-0 right-1 text-red-500 text-xs">
            {errors.password?.type === "required" && "This is required"}
            {errors.password?.type === "maxLength" && "Max length exceeded"}
          </span>
        )}
      </div>

      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7  mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Old password confirmation"
          type="password"
          {...register("cpassword", {
            required: true,
            validate: (val: string) =>
              PasswordValue != val ? "Your passwords do not match" : true,
          })}
        />
        {errors.cpassword && (
          <span className="absolute top-0 right-1 text-red-500 text-xs">
            {errors.cpassword.type === "required" ? "This is required" : errors.cpassword.message}
          </span>
        )}
      </div>
      
      {/* New Password */}
      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7  mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="New password"
          type="password"
          {...register("newpassword", { required: true, maxLength: 20 })}
        />
        {errors.password && (
          <span className="absolute top-0 right-1 text-red-500 text-xs">
            {errors.password?.type === "required" && "This is required"}
            {errors.password?.type === "maxLength" && "Max length exceeded"}
          </span>
        )}
      </div>

      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7  mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="New password confirmation"
          type="password"
          {...register("cnewpassword", {
            required: true,
            validate: (val: string) =>
              NewPasswordValue != val ? "Your passwords do not match" : true,
          })}
        />
        {errors.cpassword && (
          <span className="absolute top-0 right-1 text-red-500 text-xs">
            {errors.cpassword.type === "required" ? "This is required" : errors.cpassword.message}
          </span>
        )}
      </div>

      <button
        className="transition-colors duration-300 bg-secondary-color hover:bg-primary-color
             text-custom-bg/85 hover:text-custom-bg border-2 border-secondary-color
             font-bold py-2 px-4 rounded my-4 mx-6 w-72"
        type="submit"
      >
        Change Password
      </button>
    </form>
  );
};

export default ModifyPasswordForm;