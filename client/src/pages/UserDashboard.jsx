import { useEffect, useState } from "react";
import api from "../api/axios";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ date: "", time: "" });

  const load = async () => {
    const res = await api.get("/bookings/me");
    setBookings(res.data);
  };

  const submit = async () => {
    await api.post("/bookings", form);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Book Appointment</h2>
      <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input type="time" className="ml-2"
        onChange={(e) => setForm({ ...form, time: e.target.value })} />
      <button onClick={submit} className="bg-blue-600 text-white ml-2 px-4">
        Book
      </button>

      <h2 className="text-xl mt-6">My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} className="border p-2 mt-2">
          {b.date} {b.time} - {b.status}
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
