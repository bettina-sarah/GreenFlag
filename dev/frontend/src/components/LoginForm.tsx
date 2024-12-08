import { IP_SERVER } from "@/config/constants";
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

  const onSubmit = handleSubmit(async (data: object|boolean) => {
    try {
      const answer = await axios.post(IP_SERVER + "/login", data);
      if (answer.data && typeof answer.data === 'object') {
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
        
        // update lat/long to current location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const {latitude, longitude} = position.coords;
            console.log("lat:" + latitude + "\nlong:" + longitude)
            data = {
              id: sessionStorage.getItem('id'),
              lat: latitude,
              long: longitude
            };
            try{
              await axios.post(IP_SERVER + "/localisation", data)
            } 
            catch (error){
              console.log("Error sending location:", error);
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
      }
      else if (answer.data === false){
        setLoginError("Invalid email or password. Please try again.")
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("A network or server error occured. Please try again")
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-between items-center w-full h-44">
      {loginError && (
        <div className="text-red-500 text-md mb-2">{loginError}</div>
      )}
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
