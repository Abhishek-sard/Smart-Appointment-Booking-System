import React from 'react'
import { useState } from 'react'
import api from "../api/axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({name: "", email:"", password: ""});
    const navigate = useNavigate();

    const submit = async(e) => {
        e.preventDefault();
        await api.post("/auth/register", form);
        navigate("/login");
    };
  return (
    <form onSubmit={submit} className='max-w-sm mx-auto mt-10 space-y-4'>
        <input className='border p-2 w-full' placeholder='Name' onChange={(e) => setForm({...form, name: e.target.value})} />

        <input className='border p-2 w-full' placeholder='Email' onChange={(e) => setForm({...form, email: e.target.value})} />

        <input className="border p-2 w-full" type='password' placeholder='password' onChange={(e) => setForm({...form, password:e.target.value})} />


        <button className='bg-green-600 text-white w-full p-2'>Register</button>

    </form>
  )
}

export default Register
