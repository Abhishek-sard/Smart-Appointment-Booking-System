import express from 'express';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

import {createBooking, getMyBookings, getAllBookings, updateStatus} from "../controllers/bookingController.js"

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/me", auth, getMyBookings);
router.get("/", auth, role("admin"), getAllBookings);
router.put("/:id", auth, role("admin"), updateStatus);

export default router;