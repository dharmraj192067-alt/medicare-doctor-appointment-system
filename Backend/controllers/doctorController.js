const Doctor = require("../models/doctor");

// ================= Add Doctor =================
const addDoctor = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // बाँकी code...
 
    const doctor = await Doctor.create({
      name: req.body.name,
      specialization: req.body.specialization,
      experience: Number(req.body.experience),
      fees: Number(req.body.fees),
      image: req.file ? req.file.filename : "",
      available: true,
    });

    res.status(201).json({
      status: "success",
      message: "Doctor Added Successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};



// ================= Get All Doctors + Search + Filter =================
const getDoctors = async (req, res) => {
  try {
    const { search, specialization } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (specialization) {
      filter.specialization = {
        $regex: specialization,
        $options: "i",
      };
    }

    const doctors = await Doctor.find(filter);

    res.status(200).json({
      status: "success",
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// ================= Get Doctor By ID =================
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        status: "failed",
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      status: "success",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateDoctor = async (req, res) => {
  try {

    const updateData = {
      name: req.body.name,
      specialization: req.body.specialization,
      experience: Number(req.body.experience),
      fees: Number(req.body.fees),
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doctor) {
      return res.status(404).json({
        status: "failed",
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Doctor updated successfully",
      doctor,
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
// ================= Delete Doctor =================
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        status: "failed",
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
