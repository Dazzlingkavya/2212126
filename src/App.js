import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./pages/RedirectHandler";

function App() {
return (
<>
<AppBar position="static">
<Toolbar>
<Typography variant="h6" sx={{ flexGrow: 1 }}>
URL Shortener
</Typography>
<Button color="inherit" component={Link} to="/">Shortener</Button>
<Button color="inherit" component={Link} to="/stats">Statistics</Button>
</Toolbar>
</AppBar>
<Container sx={{ mt: 4 }}>
<Routes>
<Route path="/" element={<UrlShortenerPage />} />
<Route path="/stats" element={<StatsPage />} />
<Route path=":shortcode" element={<RedirectHandler />} />
</Routes>
</Container>
</>
);
}


export default App;