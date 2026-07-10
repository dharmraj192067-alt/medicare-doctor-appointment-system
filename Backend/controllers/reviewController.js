const Review = require("../models/Review");

// Add Review
const addReview = async (req, res) => {
  try {
    const review = new Review({
      patient: req.user._id,
      doctor: req.body.doctor,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    await review.save();

    res.status(201).json({
      status: "success",
      message: "Review Added Successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Get Reviews of a Doctor
const getDoctorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      doctor: req.params.doctorId,
    }).populate("patient", "name");

    res.status(200).json({
      status: "success",
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getDoctorReviews,
};