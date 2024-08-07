import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ResetPasswordToken from "../models/resetPasswordTokenModel.js";
import { generateRandomByte } from "../utils/helper.js";
import { generateMailTransporter } from "../utils/mail.js";

export const register = async (req, res) => {
  const { name, email, password, role, gender, photo } = req.body;
  try {
    let user = null;
    if (role === "patient") user = await User.findOne({ email });
    if (role === "doctor") user = await Doctor.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });
    // Hash password
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
      .json({ success: true, message: "Account created successfully." });
  } catch (error) {
    console.error("Register error:", error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again." });
  }
};

export const login = async (req, res) => {
  const { email, rememberMe } = req.body;
  try {
    let user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));
    // Authenticate user
    if (!user) return res.status(404).json({ message: "User not found." });
    // Compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid password." });
    }
    // Create token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: rememberMe ? "7d" : "1h",
    });
    // Remember me
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });
    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "User logged in.",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ status: false, message: "Internal server error, try again." });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));
    // Authenticate user
    if (!user)
      return res.status(404).json({
        status: false,
        message: "User with this email doesn't exist.",
      });
    // Check token
    const alreadyHasToken = await ResetPasswordToken.findOne({
      owner: user._id,
    });
    if (alreadyHasToken)
      return res.status(401).json({
        status: false,
        message: "You can request another link after 2 minutes.",
      });
    // Generate random token
    const token = generateRandomByte();
    // Hash token
    const hashedToken = bcrypt.hashSync(token, 10);
    // Create new reset password token
    const newResetPasswordToken = new ResetPasswordToken({
      owner: user._id,
      token: hashedToken,
    });
    await newResetPasswordToken.save();
    // Reset password url
    const resetPasswordURL = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;
    // Email transporter config
    const transport = generateMailTransporter();
    // Send email to user
    transport.sendMail({
      from: "security@medicare.com",
      to: user.email,
      subject: "Reset Password",
      html: `
       <h2>Hi ${user.name}</h2>
       <h3>Click here to reset your password:</h3>
       <a href="${resetPasswordURL}">Reset password link</a>
       `,
    });
    res.status(200).json({ message: "Reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, try again." });
  }
};

// export const sendResetPasswordTokenStatus = (req, res) => {
//   res.json({ valid: true });
// };

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.params.id;
  try {
    let user = (await User.findById(userId)) || (await Doctor.findById(userId));
    // Compare new password with old password
    const isMatched = bcrypt.compareSync(newPassword, user.password);
    if (isMatched)
      return res
        .status(401)
        .json({ message: "Your new password must be different from old one." });
    // Hash new password and save it in the database
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    // Clear password token
    await ResetPasswordToken.findByIdAndDelete(req.resetPasswordToken._id);
    // Generate email transporter
    const transport = generateMailTransporter();
    // Send email to user
    transport.sendMail({
      from: "security@medicare.com",
      to: user.email,
      subject: "Password Reset Successfully",
      html: `
         <h2>Hi ${user.name}</h2>
         <h3>Password Reset Successfully</h3>
         <h3>You can use your new password now.</h3>
         `,
    });
    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, try again." });
  }
};
