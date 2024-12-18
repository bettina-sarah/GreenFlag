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
      className="flex space-y-2 flex-col justify-between items-center p-4"
    >
      <div className="flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={PersonIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="First name"
          {...register("firstname", { required: true, maxLength: 50 })}
        />
      </div>
      {errors.firstname?.type === "required" && (
        <span className="text-red-500 text-xs">This is required</span>
      )}
      {errors.firstname?.type === "maxLength" && (
        <span className="text-red-500 text-xs">Max length exceeded</span>
      )}

      <div className="flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={PersonIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Last name"
          {...register("lastname", { required: true, maxLength: 50 })}
        />
      </div>
      {errors.lastname?.type === "required" && (
        <span className="text-red-500 text-xs">This is required</span>
      )}
      {errors.lastname?.type === "maxLength" && (
        <span className="text-red-500 text-xs">Max length exceeded</span>
      )}

      <div className="flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={EmailIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="E-mail"
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

      <div className="flex py-6 items-center w-full max-w-sm border-b-2 h-6 border-custom-bg">
        <img src={LockIcon} className="size-7" />
        <input
          className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
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

      <div
        className="!mb-[12px] py-6 flex items-center w-full max-w-sm 
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
