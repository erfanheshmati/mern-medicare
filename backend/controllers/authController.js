import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { name, email, password, role, gender, photo } = req.body;

  try {
    let user = null;

    if (role === "patient") user = await User.findOne({ email });
    if (role === "doctor") user = await Doctor.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        photo,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        photo,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) user = patient;
    if (doctor) user = doctor;

    if (!user) return res.status(404).json({ message: "User not found" });

    // password comparison
    const isMatch = bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });

    // get token
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Login successfully",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Login failed" });
  }
};
