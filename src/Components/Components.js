import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home.js"
import Notes from "./Notes/Notes.js"
import Footer from "./Footer/Footer.js";
import Users from "./Users/Users.js";

export default function Components() {
    return (
        <div>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/users" element={<Users />} />
            </Routes>
            <Footer />
        </Router>
        </div>
    );
}