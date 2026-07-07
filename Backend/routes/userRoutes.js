const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  cancelAppointment,
} = require("../controllers/userController");

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// PROFILE
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);

// APPOINTMENT CANCEL
router.put("/:id/cancel", protect, cancelAppointment);

module.exports = router;