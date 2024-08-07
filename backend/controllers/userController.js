import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import Doctor from "../models/doctorModel.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      data: updateedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Your account has been deleted.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed." });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Users not found." });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile info fetched successfully.",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, could not get data.",
    });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    /* step 1: retrieve appointments from booking for specific user */
    const bookings = await Booking.find({ user: req.userId });
    /* step 2: extract doctor ids from appointment bookings */
    const doctorIds = bookings.map((el) => el.doctor.id);
    /* step 3: retrieve doctors by doctor ids */
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully.",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, could not get data.",
    });
  }
};
