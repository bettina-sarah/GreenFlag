import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const navigate = useNavigate(); //hook
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/register',formData);
        if (response.data){
            console.log(response)
            navigate('/matching');
        } 
    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
    )

};


export default RegisterForm