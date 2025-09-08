import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import URLShortener from "./URLShortener";
import URLStats from "./URLStats";
import RedirectPage from "./RedirectPage";
import './App.css'

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Shortener</Link>
        <Link to="/stats">Statistics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/stats" element={<URLStats />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}
