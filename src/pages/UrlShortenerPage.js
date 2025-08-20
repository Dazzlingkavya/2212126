import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { logEvent } from "../utils/logger";

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

const UrlShortenerPage = () => {
  const [urls, setUrls] = useState([{ id: uuidv4(), longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (id, field, value) => {
    setUrls(prev => prev.map(u => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { id: uuidv4(), longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleShorten = () => {
    const newResults = [];
    for (let u of urls) {
      if (!isValidUrl(u.longUrl)) {
        logEvent("ERROR", "Invalid URL format", { url: u.longUrl });
        alert(`Invalid URL: ${u.longUrl}`);
        return;
      }

      let shortCode = u.shortcode.trim() || uuidv4().slice(0, 6);
      let expiry = u.validity ? parseInt(u.validity, 10) : 30;

      if (isNaN(expiry) || expiry <= 0) {
        logEvent("ERROR", "Invalid validity", { validity: u.validity });
        alert("Validity must be a positive integer (minutes).");
        return;
      }

      const shortUrl = `${window.location.origin}/${shortCode}`;
      const expiryDate = new Date(Date.now() + expiry * 60000);

      const record = {
        ...u,
        shortUrl,
        expiryDate,
      };
      newResults.push(record);

      logEvent("INFO", "Short URL created", record);
    }

    setResults(newResults);
    localStorage.setItem("shortenedUrls", JSON.stringify(newResults));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        URL Shortener
      </Typography>

      {urls.map((u, idx) => (
        <Paper key={u.id} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Original URL"
                value={u.longUrl}
                onChange={e => handleChange(u.id, "longUrl", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                value={u.validity}
                onChange={e => handleChange(u.id, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={u.shortcode}
                onChange={e => handleChange(u.id, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      {urls.length < 5 && (
        <Button variant="outlined" onClick={addUrlField} sx={{ mb: 2 }}>
          Add another
        </Button>
      )}

      <Box>
        <Button variant="contained" onClick={handleShorten}>
          Shorten URLs
        </Button>
      </Box>

      {results.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Shortened URLs</Typography>
          {results.map(r => (
            <Paper key={r.id} sx={{ p: 2, mt: 2 }}>
              <Typography><b>Original:</b> {r.longUrl}</Typography>
              <Typography><b>Short:</b> <a href={r.shortUrl}>{r.shortUrl}</a></Typography>
              <Typography><b>Expiry:</b> {r.expiryDate.toString()}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default UrlShortenerPage;

