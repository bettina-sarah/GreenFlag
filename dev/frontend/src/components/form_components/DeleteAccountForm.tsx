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
        console.log(answer);
        console.log("Account deleted successfully");
        navigate("/login");
        toast.success("Account deleted successfully");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col h-48 justify-between m-5 space-y-6"
    >
      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={EmailIcon} className="size-7 mb-3" />
        <input
          className="pl-3 w-80 mb-2 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Email"
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

      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7 mb-3" />
        <input
          className="pl-3 mb-2 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Password"
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

      <div className="flex items-center w-full max-w-sm border-b-2 h-6 border-custom-bg mb-3">
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
