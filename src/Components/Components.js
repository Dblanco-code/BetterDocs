import React from "react";
import {
    BrowserRouter as Router, 
    Navigate, 
    Routes, 
    Route, 
} from "react-router-dom";
// Authentication Component Imports
import AuthModule from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";

// App Component Imports
import Home from "./Home/Home.js"
import Notes from "./Notes/Notes.js"
import Footer from "./Footer/Footer.js";
import Users from "./Users/Users.js";

// This component initializes protected routing and authentication
export default function Components() {
    return (
        <div>
        <Router>
            <Routes>
                {/* Unprotected Routes */}
                <Route path="/auth" element={<AuthModule />} />
                <Route path="/auth/register" element={<AuthRegister />} />
                <Route path="/auth/login" element={<AuthLogin />} />
                <Route path="/" element={<Home />} />

                {/* Protected Routes */}
                <Route
                    path="/notes"
                    element={<ProtectedRoute path="/notes" element={Notes} />}
                />
                <Route
                    path="/users"
                    element={<ProtectedRoute path="/users" element={Users} />}
                />

                {/* Catch-all route that redirects if unauthenticated */}
                <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
            <Footer />
        </Router>
        </div>
    );
}