import { Routes, Route } from "react-router-dom";

import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

import Private from "./Private";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        </Routes>
    )
}

export default RoutesApp