import { IP_SERVER } from "@/config/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

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
    <form onSubmit={onSubmit} className="flex flex-col justify-between">
      <label>Email:</label>
      <input
        {...register("email", {
          required: true,
          pattern: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/,
        })}
      />
      {errors.email && errors.email.type === "required" && (
        <span>This is required</span>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <span>you need to give an email</span>
      )}
      <label>Password:</label>
      <input {...register("password", { required: true, maxLength: 20 })} />
      {errors.password && errors.password.type === "required" && (
        <span>This is required</span>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <span>Max length exceeded</span>
      )}
      <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
