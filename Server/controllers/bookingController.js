import Booking from "../models/Booking.js";
import sendEmail from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user.id,
    date: req.body.date,
    time: req.body.time,
  });

  res.json(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });
  res.json(bookings);
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user");
  res.json(bookings);
};

export const updateStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  ).populate("user");

  await sendEmail(
    booking.user.email,
    "Booking Update",
    `Your booking status is ${booking.status}`
  );
  res.json(booking);
};

