import { IP_SERVER } from "@/config/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const DeleteAccountForm = () => {
  const navigate = useNavigate();
  type FormData = {
    email: string;
    password: string;
  };

  const email = sessionStorage.getItem("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const answer = await axios.post(IP_SERVER + "/delete-account", data);
      if (answer.data) {
        console.log(answer);
        console.log("Account deleted successfully");
        navigate("/login");
        // extra message: account deleted
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-between">
      <label>Password:</label>
      <input {...register("password", { required: true, maxLength: 20 })} />
      {errors.password && errors.password.type === "required" && (
        <span>This is required</span>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <span>Max length exceeded</span>
      )}
      <input
        type="email"
        {...register("email")}
        defaultValue={email}
        readOnly
      />
      <button className="bg-red-600 p-1 rounded-md text-white" type="submit">
        Delete Account
      </button>
    </form>
  );
};

export default DeleteAccountForm;
