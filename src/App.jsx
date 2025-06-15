import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";
import { UserProvider } from "./context/UserContext";

const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </Router>
  </UserProvider>
);

export default App;

