import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const StatsPage = () => {
  const [urls, setUrls] = useState([]);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("shortenedUrls");
    if (saved) {
      setUrls(JSON.parse(saved));
    }
    const savedClicks = localStorage.getItem("clickLogs");
    if (savedClicks) {
      setClicks(JSON.parse(savedClicks));
    }
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>

      {urls.length === 0 ? (
        <Typography>No shortened URLs yet.</Typography>
      ) : (
        urls.map(u => (
          <Paper key={u.id} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">{u.shortUrl}</Typography>
            <Typography><b>Original:</b> {u.longUrl}</Typography>
            <Typography><b>Expiry:</b> {new Date(u.expiryDate).toString()}</Typography>

            <Typography sx={{ mt: 2 }}><b>Click Details:</b></Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Referrer</TableCell>
                    <TableCell>Location (Mock)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clicks.filter(c => c.shortUrl === u.shortUrl).map((c, i) => (
                    <TableRow key={i}>
                      <TableCell>{c.timestamp}</TableCell>
                      <TableCell>{c.referrer || "Direct"}</TableCell>
                      <TableCell>{c.location || "Unknown"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default StatsPage;
