import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = ({ onOtpSent }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 

 const handleSubmit = async (event) => {
   event.preventDefault();

   try {
     const response = await axios.post("http://localhost:3000/otp/send-otp", {
       email,
     });
     alert("OTP sent to your email!");
     onOtpSent(email);
     navigate("/otp");
   } catch (error) {
     console.error("Error occurred:", error.response || error);
     alert(error.response ? error.response.data.message : "Error occurred");
   }
 };


  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Enter Your Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Form;
