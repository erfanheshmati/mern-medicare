import Doctor from "../models/doctorModel.js";
import Booking from "../models/bookingModel.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updateedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully.",
      data: updateedDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed." });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Your account has been deleted.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed." });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor fetched successfully.",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Doctor not found." });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    // Get filtered doctors (based on search params)
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully.",
      data: doctors,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Doctors list not found." });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found." });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "Profile info fetched successfully.",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, could not get data.",
    });
  }
};
