import { IP_SERVER } from "@/config/constants";
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
      className="flex flex-col h-60 justify-between m-5 space-y-6"
    >
      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
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
      </div>
      {errors.email?.type === "required" && (
        <span className="text-red-500 text-xs">This is required</span>
      )}
      {errors.email?.type === "pattern" && (
        <span className="text-red-500 text-xs">
          You need to provide a valid email
        </span>
      )}

      {/* Old Password */}
      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7  mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Old password"
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
        />
      </div>
      {errors.password?.type === "required" && (
        <span className="text-red-500 text-xs">This is required</span>
      )}
      {errors.password?.type === "maxLength" && (
        <span className="text-red-500 text-xs">Max length exceeded</span>
      )}

      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
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
      </div>
      {errors.password?.type === "required" && (
        <span className="text-red-500 text-xs">This is required</span>
      )}
      {errors.cpassword?.message && (
        <span className="text-red-500 text-xs">
          {errors.cpassword?.message}
        </span>
      )}

      {/* New Password */}
      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7  mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="New password"
          type="password"
          {...register("newpassword", { required: true, maxLength: 20 })}
        />
      </div>
      {errors.password?.type === "required" && (
        <span className="text-red-500 text-xs">This is required</span>
      )}
      {errors.password?.type === "maxLength" && (
        <span className="text-red-500 text-xs">Max length exceeded</span>
      )}

      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
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
      </div>
      {errors.password?.type === "required" && (
        <span className="text-red-500 text-xs">This is required</span>
      )}
      {errors.cpassword?.message && (
        <span className="text-red-500 text-xs">
          {errors.cpassword?.message}
        </span>
      )}

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
