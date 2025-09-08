import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import log from "../../LoggingMiddleware";

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls") || "[]");
    const found = stored.find(u => u.code === shortcode);

    if (!found) {
      log("error", "component", `Shortcode ${shortcode} not found`);
      navigate("/");
      return;
    }

    const now = new Date();
    if (new Date(found.expiresAt) < now) {
      log("warn", "component", `Shortcode ${shortcode} expired`);
      navigate("/");
      return;
    }

    found.clicks.push(new Date());
    localStorage.setItem("urls", JSON.stringify(stored));
    log("info", "component", `Redirecting ${shortcode} -> ${found.url}`);
    window.location.href = found.url;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}
