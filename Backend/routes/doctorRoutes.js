
const express = require("express");
console.log("Doctor Routes Loaded");
const router = express.Router();
const upload = require("../middleware/upload");

const { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } = require("../controllers/doctorController");
const { protect, admin } = require("../middleware/authMiddleware");
// router.post("/", addDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById );
router.put("/:id", upload.single("image"), updateDoctor);
router.delete("/:id", protect, admin, deleteDoctor);
router.post("/", upload.single("image"), addDoctor);
// router.get("/", getDoctors);
module.exports = router;