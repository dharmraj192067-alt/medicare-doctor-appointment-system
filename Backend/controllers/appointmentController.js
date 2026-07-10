const Appointment = require("../models/appointment");

// Book Appointment
const bookAppointment = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    // Check if same user already has appointment on same date & time
    const existingAppointment = await Appointment.findOne({
      patient: req.user._id,
      appointmentDate: req.body.appointmentDate,
      time: req.body.time,
    });

    if (existingAppointment) {
      return res.status(400).json({
        status: "failed",
        message:
          "You already have an appointment at this date and time. Please choose another time.",
      });
    }

    const appointment = new Appointment({
      patient: req.user._id,
      doctor: req.body.doctor,
      appointmentDate: req.body.appointmentDate,
      time: req.body.time,
      reason: req.body.reason,
    });

    await appointment.save();

    res.status(201).json({
      status: "success",
      message: "Appointment Booked Successfully",
      appointment,
    });

  } catch (error) {
    console.error("BOOK ERROR:", error);

    res.status(500).json({
      status: "failed",
      message: error.message,
      errors: error.errors,
    });
  }
};

// Get All Appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    res.status(200).json({
      status: "success",
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Update Appointment Status
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!appointment) {
      return res.status(404).json({
        status: "failed",
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        status: "failed",
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Get My Appointments
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    }).populate("doctor", "name specialization experience fees");

    res.status(200).json({
      status: "success",
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getMyAppointments,
};