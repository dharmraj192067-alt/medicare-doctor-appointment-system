const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentDate: {
      type: String,   // date string use गर (simple)
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Rejected", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);