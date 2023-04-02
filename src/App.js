import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  function handleLogin() {
    setIsAuth(true);
  }

  return (
    <Router>
      <Routes>
        <Route path="/StudentPortal" element={<LoginPage />} />
        <Route element={<PrivateRoutes isAuth={isAuth} />}>
          <Route path="/StudentPortal/:id" element={<HomePage />} />
          <Route path="StudentPortal/:id/notes" element={<NotesPage />} />
        </Route>
        <Route
          path="/StudentPortal/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route path="/StudentPortal/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
