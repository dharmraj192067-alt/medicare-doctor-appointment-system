const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getMyAppointments,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");
router.post("/",protect, bookAppointment);
router.get("/", getAppointments);
router.put("/:id", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);
router.get("/my", protect, getMyAppointments);

module.exports = router;