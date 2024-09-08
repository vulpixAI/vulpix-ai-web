import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

interface AuthProvider {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProvider) {
    const [isLoggedIn, setLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        const userToken = sessionStorage.getItem("user_token");
        userToken ? setLoggedIn(true) : setLoggedIn(false)
    }, []);

    async function login(email: string, password: string) {
        try {
            const response = await axios.post("http://localhost:8080/usuarios/login", {
                email: email,
                senha: password
            });

            const token = Math.random().toString(36).substring(2);
            sessionStorage.setItem("user_token", token);
            setLoggedIn(true);

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) return error.response;
        }
    }

    function signOut() {
        sessionStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, login, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}