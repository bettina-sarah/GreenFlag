import { IP_SERVER } from "@/config/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import EmailIcon from "@/../ressources/icons/email.png";
import LockIcon from "@/../ressources/icons/lock.png";

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
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const answer = await axios.post(IP_SERVER + "/login", data);
      if (answer.data) {
        console.log("login data: ", answer.data);
        sessionStorage.setItem("id", answer.data.id);
        // should get token via login route here !
        sessionStorage.setItem("authToken", answer.data.token);
        sessionStorage.setItem(
          "profileComplete",
          answer.data.profile_completed
        );
        console.log(
          "session storages: id",
          sessionStorage.getItem("id"),
          "profileComplete:",
          sessionStorage.getItem("profileComplete")
        );
        if (sessionStorage.getItem("profileComplete") === "true") {
          navigate("/matching");
        } else {
          navigate("/questionnaire");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-between items-center w-full h-44">
      <div className="flex items-center w-full max-w-sm border-b-2 border-custom-bg">
        <img src={EmailIcon} className="size-7"/>
        <input className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <span className="justify-start">This is required</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span>you need to give an email</span>
        )}
      </div>
      
      <div className="flex items-center w-full max-w-sm border-b-2 border-custom-bg">
        <img src={LockIcon} className="size-7"/>
        <input className="pl-3 w-80 text-custom-bg font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-custom-bg"
          placeholder="Password"
          type="password"
          {...register("password", { required: true, maxLength: 20 })} />
        {errors.password && errors.password.type === "required" && (
          <span>This is required</span>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <span>Max length exceeded</span>
        )}
      </div>
      <button className="bg-custom-bg text-primary-color w-full max-w-sm py-2 rounded-md text-lg font-inter font-semibold" type="submit">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
