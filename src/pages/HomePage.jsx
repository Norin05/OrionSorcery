import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./HomePage.css";

const HomePage = () => {
  const { setName } = useUser();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (input.trim()) {
      setName(input.trim());
      navigate("/cards");
    }
  };

  return (
    <div className="home-container">
      <div className="form-box fade-in">
        <h2>Whisper your name into the stars to unveil your destiny</h2>
        <input
          type="text"
          value={input}
          placeholder="Your Name"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button onClick={handleSubmit}>Reveal My Fortune</button>
      </div>
    </div>
  );
};

export default HomePage;
