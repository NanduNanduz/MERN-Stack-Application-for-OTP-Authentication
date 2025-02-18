const express = require("express");
const nodemailer = require("nodemailer");
const userData = require("../model/userData"); // Assuming this is the correct path

const router = express.Router();

// Route for sending OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 5); // OTP expires in 5 minutes

    // Save OTP to DB
    await userData.findOneAndUpdate(
      { email },
      { otp, otpExpiration },
      { upsert: true } // Insert if the email is not found
    );

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
});

// Route for verifying OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await userData.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otpExpiration)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.status(200).json({ message: "OTP matched! Welcome!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
});

module.exports = router;
