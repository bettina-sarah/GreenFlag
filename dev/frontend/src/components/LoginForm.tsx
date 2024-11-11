import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';


// FORM LIBRARY: React hook form

const LoginForm = () => {
    const navigate = useNavigate(); //hook

    type FormData = {
        email: string
        password: string
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()
    const onSubmit = handleSubmit( async (data: any)=> {
        try{
            const answer = await axios.post(IP_SERVER+'/login',data)
            if (answer.data){
                console.log(answer.data[0]);
                sessionStorage.setItem("id", answer.data[0]);
                if(localStorage.getItem("fillQuestionnaire") === "true"){
                    navigate('/questionnaire')
                }
                else{
                    navigate('/matching')
                }
                
            }
        } catch(error){
            console.error('Error during login:',error)
        }
    } )

    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-between">
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
//         email: "",
//         password: "",
//     });

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//         //setFormData({email: formData.email, password: formData.password });
//         // spread operaror: array into an object, cant spread object into an array
//     };

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
//         event.preventDefault();
//         const response = await axios.post('http://127.0.0.1:5000/login',formData);
//         if (response.data){
//             console.log(response)
//             navigate('/matching');
//         } 
//     }
//     return(
//         <form onSubmit={handleSubmit}>
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


export default LoginForm