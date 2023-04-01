import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => {
    setIsAuth(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:id/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
