import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Questions from "./pages/Application/Questions";
import Dashboard from "./pages/Application/Dashboard";
import Posts from "./pages/Application/Posts";
import Creative from "./pages/Application/Creative";
import Plans from "./pages/Application/Plans";

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
                <Route path="/questions" element={<PrivatePage Item={<Questions />} />} />
                <Route path="/dashboard" element={<PrivatePage Item={<Dashboard />} />} />
                <Route path="/posts" element={<PrivatePage Item={<Posts />} />} />
                <Route path="/creative" element={<PrivatePage Item={<Creative />} />} />
                <Route path="/plans" element={<PrivatePage Item={<Plans />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}