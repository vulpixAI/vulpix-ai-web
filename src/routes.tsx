import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Application/Dashboard";
import Posts from "./pages/Application/Posts";
import Ai from "./pages/Application/Ai";

import UseAuth from "./hooks/useAuth";

function PrivatePage({ Item }: any) {
    const { isLoggedIn }: any = UseAuth();
    return isLoggedIn ? Item : <Login />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<PrivatePage Item={<Dashboard />} />} />
                <Route path="/posts" element={<PrivatePage Item={<Posts />} />} />
                <Route path="/ai" element={<PrivatePage Item={<Ai />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}