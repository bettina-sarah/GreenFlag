import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

const RegisterForm = () => {
    const navigate = useNavigate(); //hook

    type FormData = {
        firstname: string
        lastname: string
        email: string
        password: string
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()
    const onSubmit = handleSubmit( async (data)=> {
        try{
            const answer = await axios.post(IP_SERVER+'/create-account',data)
            if (answer.data){
                console.log(answer);
                navigate('/login')
            }
        } catch(error){
            console.error('Error during account creation:',error)
        }
    } )

    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-between">
            <label>Firstname:</label>
            <input {...register("firstname",{required: true, maxLength: 50})} />
            {errors.firstname && errors.firstname.type === "required" && (
                <span>This is required</span>
            )}
            {errors.firstname && errors.firstname.type === "maxLength" && (
                <span>Max length exceeded</span>
            )}
            <label>Lastname:</label>
            <input {...register("lastname",{required: true, maxLength: 50})} />
            {errors.lastname && errors.lastname.type === "required" && (
                <span>This is required</span>
            )}
            {errors.lastname && errors.lastname.type === "maxLength" && (
                <span>Max length exceeded</span>
            )}
            <label>Email:</label>
            <input {...register("email",{required: true, pattern: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/ })} />
            {errors.email && errors.email.type === "required" && (
                <span>This is required</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
                <span>you need to give an email</span>
            )}
            <label>Password:</label>
            <input {...register("password",{required: true, maxLength:20})} />
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



//     const [formData, setFormData] = useState({
//         firstname: "",
//         lastname: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
//         event.preventDefault();
//         const response = await axios.post('http://127.0.0.1:5000/create_account',formData);
//         if (response.data){
//             console.log(response)
//             navigate('/login');
//         } 
//     }
//     return(
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="firstname">Firstname:</label>
//                 <input
//                 type="text"
//                 id="firstname"
//                 name="firstname"
//                 placeholder="your firstname"
//                 value={formData.firstname}
//                 onChange={handleChange}
//                 required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="lastname">Lastname:</label>
//                 <input
//                 type="text"
//                 id="lastname"
//                 name="lastname"
//                 placeholder="your lastname"
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 placeholder="your@email.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password">Password:</label>
//                 <input
//                 type="text"
//                 id="password"
//                 name="password"
//                 placeholder="your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 />
//             </div>
//             <button type="submit">
//                 Submit
//             </button>
//         </form>
//     )

};


export default RegisterForm