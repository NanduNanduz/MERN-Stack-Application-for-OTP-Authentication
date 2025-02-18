import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import OtpForm from "./components/OtpForm";
import Welcome from "./components/Home";
import Home from "./components/Home";

const App = () => {
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [email, setEmail] = useState(""); // State to store the email

  const handleOtpSent = (email) => {
    setOtpSent(true); // OTP sent, show OTP form
    setEmail(email); // Store email for OTP verification
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form onOtpSent={handleOtpSent} />} />
        <Route path="/otp" element={<OtpForm email={email} />} />{" "}
        <Route path="/welcome" element={<Home />} /> {/* Welcome page */}
      </Routes>
    </Router>
  );
};

export default App;
