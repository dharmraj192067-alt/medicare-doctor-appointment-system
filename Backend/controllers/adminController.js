const Doctor = require("../models/doctor");
const User = require("../models/user");
const Appointment = require("../models/appointment");

const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const pending = await Appointment.countDocuments({
      status: "Pending",
    });

    const completed = await Appointment.countDocuments({
      status: "Completed",
    });

    res.json({
      totalDoctors,
      totalUsers,
      totalAppointments,
      pending,
      completed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};