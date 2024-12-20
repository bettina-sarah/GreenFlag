/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : DeleteAccountForm.tsx
Created By  : Vincent Fournier (Contribution: Bettina-Sarah Janesch)
About       : Le composant DeleteAccountForm implémente un formulaire de suppression
              de compte utilisateur avec validation des champs via react-hook-form, 
              incluant un email, un mot de passe et une confirmation de mot de passe.
              Une requête API est envoyée pour effectuer la suppression, et des 
              notifications Toast sont utilisées pour afficher des retours.
====================================================================================
------------------------------------------------------------------------------------
*/

import { IP_SERVER } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import LockIcon from "@/../ressources/icons/lock.png";
import EmailIcon from "@/../ressources/icons/email.png";

const DeleteAccountForm = () => {
  const navigate = useNavigate();
  type FormData = {
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

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const answer = await axios.post(IP_SERVER + "/delete-account", data);
      if (answer.data) {
        navigate("/login");
        toast.success("Account deleted successfully");
      }
    } catch (error) {
      toast.error("Error during login");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col h-48 justify-between m-5 space-y-6"
    >
      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={EmailIcon} className="size-7 mb-3" />
        <input
          className="pl-3 w-80 mb-2 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Email"
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

      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7 mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Password"
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
        />
        {errors.password &&(
          <span className="absolute top-0 right-1 text-red-500 text-xs">
            {errors.password?.type === "required" && "This is required"}
            {errors.password?.type === "maxLength" && "Max length exceeded"}
          </span>
        )}
      </div>

      <div className="relative flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg mb-3">
        <img src={LockIcon} className="size-7" />
        <input
          className="pl-3 mb-2w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Password confirmation"
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

      <button
        className="transition-colors duration-300 bg-red-600 hover:bg-red-900
             text-red-900 hover:text-red-600 border-2 border-red-950
             font-bold py-2 px-4 rounded my-4 mx-6 w-72"
        type="submit"
      >
        Delete Account
      </button>
    </form>
  );
};

export default DeleteAccountForm;
