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

  const getDoctor = async () => {
    try {
      const res = await api.get(`/doctors/${id}`);
      setDoctor(res.data.doctor);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

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
    return <h2 className="section">Loading...</h2>;
  }

  return (
    <div className="container section">
      <div className="detail-card">
        <div className="detail-hero">
          <img
            src={
              doctor.image
                ? `http://127.0.0.1:3000/uploads/${encodeURIComponent(doctor.image)}`
                : "https://placehold.co/150x150?text=Doctor"
            }
            alt={doctor.name}
          />

          <div className="detail-meta">
            <h1>{doctor.name}</h1>
            <h3>{doctor.specialization}</h3>
            <p>
              <strong>Experience:</strong> {doctor.experience} Years
            </p>
            <p>
              <strong>Consultation Fee:</strong> Rs. {doctor.fees}
            </p>
            <p>
              <strong>Status:</strong> {doctor.available ? "Available" : "Not Available"}
            </p>
            {user?.role !== "admin" && (
              <button className="button-primary" onClick={() => navigate(`/book/${doctor._id}`)}>
                Book Appointment
              </button>
            )}
          </div>
        </div>

        {user?.role !== "admin" && (
          <div style={{ marginTop: "32px" }}>
            <div className="section-head">
              <div>
                <h2>Write a Review</h2>
              </div>
            </div>

            <div className="form-panel">
              <div className="form-row">
                <div className="input-group">
                  <label>Rating</label>
                  <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Review</label>
                  <textarea
                    rows="4"
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="button-primary" type="button" onClick={addReview}>
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "32px" }}>
          <div className="section-head">
            <div>
              <h2>Patient Reviews</h2>
            </div>
          </div>

          {reviews.length === 0 ? (
            <p>No Reviews Yet.</p>
          ) : (
            reviews.map((review) => (
              <div className="review-card" key={review._id}>
                <h4>{review.patient?.name}</h4>
                <p>⭐ {review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
