import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <nav className='bg-blue-600 text-white p-4 flex justify-between'>
            <h1 className='font-bold'>Booking System</h1>
            <div className="space-x-4">
                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                {user?.role === "admin" && <link to="/admin">Admin</link>}
                {user?.role === "user" && <link to="/dashboard">Dashboard</link>}
            </div>

        </nav>
    )
}

export default Navbar
