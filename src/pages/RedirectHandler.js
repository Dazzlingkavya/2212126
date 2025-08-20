import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../utils/logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("shortenedUrls");
    if (saved) {
      const urls = JSON.parse(saved);
      const match = urls.find(u => u.shortUrl.endsWith(shortcode));

      if (match) {
        const now = new Date();
        const expiry = new Date(match.expiryDate);

        if (now > expiry) {
          alert("This short link has expired.");
          logEvent("WARN", "Attempted expired link", { shortcode });
          navigate("/");
          return;
        }

        // Log click
        const clickRecord = {
          shortUrl: match.shortUrl,
          timestamp: now.toISOString(),
          referrer: document.referrer,
          location: "Mock-Location", // Geolocation API can be integrated here
        };

        const existing = JSON.parse(localStorage.getItem("clickLogs") || "[]");
        existing.push(clickRecord);
        localStorage.setItem("clickLogs", JSON.stringify(existing));

        logEvent("INFO", "Redirecting to long URL", clickRecord);

        window.location.href = match.longUrl;
        return;
      }
    }

    alert("Invalid or unknown short link.");
    logEvent("ERROR", "Invalid shortcode redirect", { shortcode });
    navigate("/");
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
