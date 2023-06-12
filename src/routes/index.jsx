import { Routes, Route } from "react-router-dom";

import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/register" element={<SignUp />} />
        </Routes>
    )
}

export default RoutesApp