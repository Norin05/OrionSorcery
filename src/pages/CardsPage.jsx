import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import zodiacSigns from "../zodiacData";
import "./CardsPage.css";

const CardsPage = () => {
  const { name } = useUser();
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [fortunes, setFortunes] = useState({});
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://quotes.rest/qod?category=inspire");
        const data = await res.json();
        setQuote(data.contents.quotes[0].quote);
      } catch (err) {
      }
    };
    fetchQuote();
  }, []);

  const handleCardClick = async (index, signName) => {
    if (flippedIndex === index) {
      setFlippedIndex(null);
    } else {
      if (!fortunes[index]) {
        try {
          const res = await fetch("https://api.adviceslip.com/advice");
          const data = await res.json();
          setFortunes((prev) => ({ ...prev, [index]: data.slip.advice }));
        } catch (err) {
            console.error("Failed to fetch quote:", err);
             setFortunes((prev) => ({
            ...prev,
            [index]: "Your fortune awaits...",
          }));
        }
      }
      setFlippedIndex(index);
    }
  };

  return (
    <div className="cards-container">
      <h2 className="quote">{quote}</h2>

      <h1 className="cards-title">
        Choose the Celestial Mark of Your Birth 🔮{name ? `, ${name}` : ""}
      </h1>

      <div className="cards-grid">
        {zodiacSigns.map((sign, index) => (
          <div
            key={sign.name}
            className={`flip-card ${flippedIndex === index ? "flipped" : ""}`}
            onClick={() => handleCardClick(index, sign.name)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={sign.image} alt={sign.name} className="card-img" />
                <div className="card-info">
                  <h3>{sign.name}</h3>
                  <p>{sign.dateRange}</p>
                </div>
              </div>
              <div className="flip-card-back">
                <p>{fortunes[index] || "Loading fortune..."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
