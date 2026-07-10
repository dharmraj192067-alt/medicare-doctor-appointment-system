import { Link } from "react-router-dom";
import "./DoctorCard.css";

function DoctorCard({ doctor }) {
  const imageUrl = doctor.image
    ? `http://127.0.0.1:3000/uploads/${encodeURIComponent(doctor.image)}`
    : "https://placehold.co/120x120?text=Doctor";

  console.log("Doctor:", doctor);
  console.log("Image:", doctor.image);
  console.log("Image URL:", imageUrl);

  return (
    <div className="doctor-card">
      <img
        src={imageUrl}
        alt={doctor.name}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "15px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onLoad={() => {
          console.log("✅ Image Loaded:", doctor.image);
        }}
        onError={(e) => {
          console.log("❌ Image Failed:", doctor.image);

          // fallback image
          e.target.src = "https://placehold.co/120x120?text=Doctor";
        }}
      />

      <h3>{doctor.name}</h3>

      <p>
        <strong>Specialization:</strong> {doctor.specialization}
      </p>

      <p>
        <strong>Experience:</strong> {doctor.experience} Years
      </p>

      <p>
        <strong>Fees:</strong> Rs. {doctor.fees}
      </p>

      <Link to={`/doctor/${doctor._id}`}>
        <button>View Details</button>
      </Link>

      <br />
      <br />

      <Link to={`/edit-doctor/${doctor._id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default DoctorCard;