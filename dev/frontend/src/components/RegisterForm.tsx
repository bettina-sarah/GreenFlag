import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

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
        <form onSubmit={onSubmit} className="flex flex-col justify-between">
            <label>Firstname:</label>
            <input {...register("firstname", { required: true, maxLength: 50 })} />
            {errors.firstname?.type === "required" && <span>This is required</span>}
            {errors.firstname?.type === "maxLength" && <span>Max length exceeded</span>}

            <label>Lastname:</label>
            <input {...register("lastname", { required: true, maxLength: 50 })} />
            {errors.lastname?.type === "required" && <span>This is required</span>}
            {errors.lastname?.type === "maxLength" && <span>Max length exceeded</span>}

            <label>Email:</label>
            <input
                {...register("email", { required: true, pattern: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
            />
            {errors.email?.type === "required" && <span>This is required</span>}
            {errors.email?.type === "pattern" && <span>You need to provide a valid email</span>}

            <label>Password:</label>
            <input {...register("password", { required: true, maxLength: 20 })} />
            {errors.password?.type === "required" && <span>This is required</span>}
            {errors.password?.type === "maxLength" && <span>Max length exceeded</span>}

            <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
                Login
            </button>
        </form>
    );
};

export default RegisterForm;