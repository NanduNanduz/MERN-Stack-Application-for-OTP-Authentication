import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ email }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/otp/verify-otp",
        {
          email,
          otp,
        }
      );
      alert(response.data.message);
      if (response.data.message === "OTP matched! Welcome!") {
        navigate("/welcome"); 
      }
    } catch (error) {
      console.error(error);
      alert("Invalid OTP or OTP expired. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Enter OTP
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Verify OTP
        </Button>
      </form>
    </Container>
  );
};

export default OtpForm;
