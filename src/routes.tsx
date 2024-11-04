import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Form from "./pages/Application/Form";
import Dashboard from "./pages/Application/Dashboard";
import Post from "./pages/Application/Post";
import Creative from "./pages/Application/Creative";
import Plan from "./pages/Application/Plan";

import UseAuth from "./hooks/useAuth";

function PrivatePage({ Item }: any) {
    const { isLoggedIn }: any = UseAuth();
    return isLoggedIn ? Item : setTimeout(() => <NotFound />, 200);
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/form" element={<PrivatePage Item={<Form />} />} />
                <Route path="/dashboard" element={<PrivatePage Item={<Dashboard />} />} />
                <Route path="/post" element={<PrivatePage Item={<Post />} />} />
                <Route path="/creative" element={<PrivatePage Item={<Creative />} />} />
                <Route path="/plan" element={<PrivatePage Item={<Plan />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}