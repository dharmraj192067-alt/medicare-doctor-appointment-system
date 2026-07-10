import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getDoctor();
    getReviews();
  }, []);

  // Doctor Details
  const getDoctor = async () => {
    try {
      const res = await api.get(`/doctors/${id}`);
      setDoctor(res.data.doctor);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Reviews
  const getReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Review
  const addReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/reviews",
        {
          doctor: id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Added Successfully ⭐");

      setRating(5);
      setComment("");

      getReviews();

    } catch (error) {
      console.log(error);
      alert("Failed to add review");
    }
  };

  if (!doctor) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,.1)",
      }}
    >
      <img
        src={
          doctor.image
            ? `http://127.0.0.1:3000/uploads/${encodeURIComponent(
                doctor.image
              )}`
            : "https://placehold.co/150x150?text=Doctor"
        }
        alt={doctor.name}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <h1>{doctor.name}</h1>

      <h3>{doctor.specialization}</h3>

      <p>
        <strong>Experience:</strong> {doctor.experience} Years
      </p>

      <p>
        <strong>Consultation Fee:</strong> Rs. {doctor.fees}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {doctor.available ? "🟢 Available" : "🔴 Not Available"}
      </p>

      {/* Patient Only */}
      {user?.role !== "admin" && (
        <>
          <button
            onClick={() => navigate(`/book/${doctor._id}`)}
            style={{
              padding: "12px 25px",
              background: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Book Appointment
          </button>

          <hr style={{ margin: "30px 0" }} />

          <h2>⭐ Write a Review</h2>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <br />
          <br />

          <textarea
            rows="4"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

          <br />
          <br />

          <button
            onClick={addReview}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Submit Review
          </button>
        </>
      )}

      <hr style={{ margin: "30px 0" }} />

      <h2>Patient Reviews</h2>

      {reviews.length === 0 ? (
        <p>No Reviews Yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            <h4>{review.patient?.name}</h4>

            <p>⭐ {review.rating}/5</p>

            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorDetails;