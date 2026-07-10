const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// const Appointment = require("../models/appointment");
// ====================== Register User ======================
const registerUser = async (req, res) => {
  try {
    console.log("Register API called");
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Name, email and password are required",
      });
    }

    console.log("Step 1: Checking existing user...");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    console.log("Step 2: Hashing password...");

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Step 3: Creating user...");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Step 4: User created successfully");

    res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      status: "failed",
      message: error.message,
      error: error.name,
    });
  }
};

// ====================== Login User ======================
const loginUser = async (req, res) => {
  try {
     console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: "success",
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
// Get Logged-in User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Current password and new password are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
// Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        status: "failed",
        message: "Appointment not found",
      });
    }

    // आफ्नो appointment मात्र cancel गर्न मिल्ने
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "failed",
        message: "Not authorized to cancel this appointment",
      });
    }

    appointment.status = "Cancelled";

    await appointment.save();

    res.status(200).json({
      status: "success",
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Export
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  cancelAppointment,
};