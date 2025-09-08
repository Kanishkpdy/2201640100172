import React, { useEffect, useState } from "react";
import log from "logging-middleware";

export default function URLStats() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrls(stored);
    log("info", "component", "Viewed statistics page");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Statistics</h2>
      {urls.map((u, i) => (
        <div key={i} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
          <p>
            <b>Short:</b> {window.location.origin}/{u.code} <br />
            <b>Original:</b> {u.url} <br />
            <b>Created:</b> {new Date(u.createdAt).toLocaleString()} <br />
            <b>Expires:</b> {new Date(u.expiresAt).toLocaleString()} <br />
            <b>Clicks:</b> {u.clicks.length}
          </p>
          {u.clicks.map((c, j) => (
            <p key={j}>Clicked at {new Date(c).toLocaleString()}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
