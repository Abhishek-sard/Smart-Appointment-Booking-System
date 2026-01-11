import { useEffect, useState } from "react";
import api from "../api/axios";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ date: "", time: "" });
  const [message, setMessage] = useState({ type: "", content: "" });

  const load = async () => {
    try {
      const res = await api.get("/bookings/me");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings");
    }
  };

  const submit = async () => {
    try {
      await api.post("/bookings", form);
      setMessage({ type: "success", content: "Booking successful!" });
      load();
    } catch (err) {
      setMessage({ type: "error", content: err.response?.data?.message || "Booking failed" });
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Book Appointment</h2>
        {message.content && (
          <div className={`p-4 mb-4 rounded ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message.content}
          </div>
        )}
        <div className="flex gap-4">
          <input
            type="date"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <button
            onClick={submit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="border p-4 rounded-lg flex justify-between items-center hover:bg-gray-50">
                <div>
                  <span className="font-semibold">{b.date}</span> at <span className="font-semibold">{b.time}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${b.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                  }`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
