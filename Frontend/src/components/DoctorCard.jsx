import { Link } from "react-router-dom";
import "./DoctorCard.css";

function DoctorCard({ doctor }) {
  const imageUrl = doctor.image
    ? `http://127.0.0.1:3000/uploads/${encodeURIComponent(doctor.image)}`
    : "https://placehold.co/120x120?text=Doctor";

  return (
    <article className="doctor-card">
      <img
        src={imageUrl}
        alt={doctor.name}
        onError={(e) => {
          e.target.src = "https://placehold.co/120x120?text=Doctor";
        }}
      />

      <div className="doctor-card-body">
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

        <div className="doctor-actions">
          <Link to={`/doctor/${doctor._id}`}>
            <button className="btn-primary">View Details</button>
          </Link>
          <Link to={`/edit-doctor/${doctor._id}`}>
            <button className="btn-secondary">Edit</button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DoctorCard;
