import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ add this
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import OtpModal from "./OtpModal";

export default function AuthSection({ onClose }) {
  const [screen, setScreen] = useState("login"); // "login" | "register" | "otp"
  const [regData, setRegData] = useState(null);
  const navigate = useNavigate(); // ⬅️ add this

  const handleAuthed = () => {
    // data is whatever your API returns; token is already saved in modals
    onClose?.();
    navigate("/explore"); 
  };

  if (screen === "register") {
    return (
      <RegisterModal
        onClose={onClose}
        onSwitchToLogin={() => setScreen("login")}
        onProceedOTP={(data) => {
          setRegData(data);
          setScreen("otp");
        }}
      />
    );
  }

  if (screen === "otp") {
    return (
      <OtpModal
        regData={regData}
        onClose={onClose}
        onBack={() => setScreen("register")}
        onSuccess={handleAuthed}  
      />
    );
  }

  return (
    <LoginModal
      onClose={onClose}
      onSwitchToRegister={() => setScreen("register")}
      onSuccess={handleAuthed}    
    />
  );
}
