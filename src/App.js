import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:email" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:email/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
