import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const navigate = useNavigate(); //hook
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/create_account',formData);
        if (response.data){
            console.log(response)
            navigate('/login');
        } 
    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstname">Firstname:</label>
                <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="your firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="lastname">Lastname:</label>
                <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="your lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                type="text"
                id="email"
                name="email"
                placeholder="your@email.com"
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
                placeholder="your password"
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