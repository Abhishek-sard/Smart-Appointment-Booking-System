import React from 'react'
import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [form, setForm] = useState({
        email: "", password: ""
    });
    const {login}  = useContext(AuthContext);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const res = await api.post("/auth/login", form);
        login(res.data);
        navigate(res.data.user.role === "admin" ? "/admin" : "/dashboard");
    };
    return (

        <form onSubmit={submit} className='max-w-sm mx-auto mt-10 space-y-4'>
            <input className='border p-2 w-full ' placeholder='Email' onChange={(e) => setForm({...form, email: e.target.value})} />


            <input className='border p-2 w-full ' type='password' placeholder='password' onChange={(e) => setForm({...form, password:e.target.value})} />


            <button className='bg-blue-600 text-white w-full p-2'>Login</button>

        </form>
    )
}

export default Login;
