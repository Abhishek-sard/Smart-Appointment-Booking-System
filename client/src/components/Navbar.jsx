import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Smart Booking</h1>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user?.role === "user" && (
          <Link to="/dashboard">Dashboard</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
