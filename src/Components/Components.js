import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home.js"
import Notes from "./Notes/Notes.js"
import Footer from "./Footer/Footer.js";

export default function Components() {
    return (
        <div>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<Notes />} />
            </Routes>
            <Footer />
        </Router>
        </div>
    );
}