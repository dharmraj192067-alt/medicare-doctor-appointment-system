const express = require("express");
const router = express.Router();

const {
  addReview,
  getDoctorReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Add Review
router.post("/", protect, addReview);

// Get Reviews of a Doctor
router.get("/:doctorId", getDoctorReviews);

module.exports = router;