import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import EmailIcon from "@/../ressources/icons/email.png";
import LockIcon from "@/../ressources/icons/lock.png";
import PersonIcon from "@/../ressources/icons/person.png";

const RegisterForm = () => {
    const navigate = useNavigate(); //hook

    type FormData = {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const authenticate = () => {
        localStorage.setItem('accountCreated', 'true');
        navigate('/login');
    };

    const onSubmit = handleSubmit(async (data:any) => {
        try {
            const response = await axios.post(IP_SERVER + '/create-account', data);
            if (response.data) {
                authenticate();
            } else {
                console.log('Error during account creation:', response);
            }
        } catch (error) {
            console.error('Error during account creation:', error);
        }
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-between p-4 h-72">
            <div className="flex items-center w-full max-w-sm border-b-2 border-button-light">
                <img src={PersonIcon} className="size-7"/>
                <input className="pl-3 w-80 text-button-light font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-button-light"
                placeholder="Firstname"
                {...register("firstname", { required: true, maxLength: 50 })} />
                {errors.firstname?.type === "required" && <span className="text-red-500 text-xs">This is required</span>}
                {errors.firstname?.type === "maxLength" && <span className="text-red-500 text-xs">Max length exceeded</span>}
            </div>

            <div className="flex items-center w-full max-w-sm border-b-2 border-button-light">
                <img src={PersonIcon} className="size-7"/>
                <input  className="pl-3 w-80 text-button-light font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-button-light"
                placeholder="LastName"
                {...register("lastname", { required: true, maxLength: 50 })}/>
                {errors.lastname?.type === "required" && <span className="text-red-500 text-xs">This is required</span>}
                {errors.lastname?.type === "maxLength" && <span className="text-red-500 text-xs">Max length exceeded</span>}
            </div>

            <div className="flex items-center w-full max-w-sm border-b-2 border-button-light">
                <img src={EmailIcon} className="size-7"/>
                <input className="pl-3 w-80 text-button-light font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-button-light"
                placeholder="Email"
                {...register("email", { required: true, pattern: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/ })}/>
                {errors.email?.type === "required" && <span className="text-red-500 text-xs">This is required</span>}
                {errors.email?.type === "pattern" && <span className="text-red-500 text-xs">You need to provide a valid email</span>}
            </div>
            <div className="flex items-center w-full max-w-sm border-b-2 border-button-light">
                <img src={LockIcon} className="size-7"/>
                <input className="pl-3 w-80 text-button-light font-inter bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-button-light"
                placeholder="Password"
                {...register("password", { required: true, maxLength: 20 })}/>
                {errors.password?.type === "required" && <span className="text-red-500 text-xs">This is required</span>}
                {errors.password?.type === "maxLength" && <span className="text-red-500 text-xs">Max length exceeded</span>}
            </div>

            <button className="bg-button-light text-button-dark max-w-sm py-2 rounded-md text-lg font-inter font-semibold" type="submit">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;