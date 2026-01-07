import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  const update = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">All Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} className="border p-2 mb-2">
          {b.user.name} | {b.date} {b.time} | {b.status}
          <button onClick={() => update(b._id, "approved")}
            className="bg-green-500 text-white ml-2 px-2">Approve</button>
          <button onClick={() => update(b._id, "rejected")}
            className="bg-red-500 text-white ml-2 px-2">Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
