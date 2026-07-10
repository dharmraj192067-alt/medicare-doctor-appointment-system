const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

connectDB();

const app = express();

// ===== Check uploads folder =====
console.log("__dirname:", __dirname);
console.log(
  "Uploads exists:",
  fs.existsSync(path.join(__dirname, "uploads"))
);

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Serve uploaded images =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Test Routes =====
app.get("/", (req, res) => {
  res.send("MediCare API Running...");
});

app.get("/test", (req, res) => {
  res.send("Server OK");
});

// ===== Check Image Route =====
app.get("/check-image", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "uploads",
      "1783239980385-WhatsApp Image 2026-07-05 at 1.22.17 PM.png"
    )
  );
});

// ===== API Routes =====
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});