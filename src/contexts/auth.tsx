import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

interface AuthProvider {
    children: ReactNode
}

interface userData {
    status: string
}

export function AuthProvider({ children }: AuthProvider) {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<Partial<userData>>({});
    const [isMediaConnected, setMediaConnected] = useState<boolean>(false);

    useEffect(() => {
        const bearerToken = sessionStorage.getItem("bearerToken");
        const userData = sessionStorage.getItem("userData");
        const mediaConnected = sessionStorage.getItem("mediaConnected");

        mediaConnected && setMediaConnected(JSON.parse(sessionStorage.getItem("mediaConnected") || ""));

        if (bearerToken && userData) {
            setLoggedIn(true);
            setUserData(JSON.parse(sessionStorage.getItem("userData") || ""));
        } else {
            signOut();
        }
    }, []);

    useEffect(() => {
        if (userData.status == "AGUARDANDO_PAGAMENTO" || userData.status == "AGUARDANDO_FORMULARIO" || userData.status == "CADASTRO_FINALIZADO") {
            sessionStorage.setItem("userData", JSON.stringify(userData));
        }
    }, [userData]);

    async function verifyConnection(token: string) {
        await axios.get(`${import.meta.env.VITE_API_URL}/integracoes/possui-integracao`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            sessionStorage.setItem("mediaConnected", JSON.stringify(response.data));
            setMediaConnected(response.data);
        });
    }

    async function getUserData(token: string) {
        await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            sessionStorage.setItem("userData", JSON.stringify(response.data));
            setUserData(response.data);
        });
    }

    async function login(email: string, password: string, dispositivoCode: string) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
                email: email,
                senha: password,
                dispositivoCode: dispositivoCode
            });

            if (!response.data.mfaRequerido) {
                sessionStorage.setItem("bearerToken", response.data.token);
                setLoggedIn(true);
                await getUserData(response.data.token)
                await verifyConnection(response.data.token);
            }

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) return error.response;
        }
    }

    async function loginWithMfa(email: string, otp: string, secretKey: string, dispositiveCode: string) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/autenticacoes/google/validar-otp`, {
                email: email,
                otp: otp,
                secretKey: secretKey,
                dispositivoCode: dispositiveCode
            });

            sessionStorage.setItem("bearerToken", response.data.token);
            setLoggedIn(true);
            await getUserData(response.data.token)
            await verifyConnection(response.data.token);

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) return error.response;
        }
    }

    async function signUp(userFormData: any, empresaFormData: any, enderecoEmpresaFormData: any) {
        try {
            return await axios.post(`${import.meta.env.VITE_API_URL}/usuarios`, {
                nome: userFormData.nome,
                sobrenome: userFormData.sobrenome,
                email: userFormData.email,
                senha: userFormData.password,
                razaoSocial: empresaFormData.razaoSocial,
                nomeFantasia: empresaFormData.nomeFantasia,
                telefone: empresaFormData.telefone.replace(/\D/g, ''),
                cnpj: empresaFormData.cnpj.replace(/\D/g, ''),
                cep: enderecoEmpresaFormData.cep.replace(/\D/g, ''),
                numero: enderecoEmpresaFormData.numero,
                logradouro: enderecoEmpresaFormData.logradouro,
                cidade: enderecoEmpresaFormData.cidade,
                estado: enderecoEmpresaFormData.estado,
                bairro: enderecoEmpresaFormData.bairro,
                complemento: enderecoEmpresaFormData?.complemento
            });

        } catch (err) {
            if (axios.isAxiosError(err)) return err.response;
        }
    }

    function signOut() {
        sessionStorage.removeItem("mediaConnected");
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("hasShownLoadingScreen");
        sessionStorage.removeItem("bearerToken");
        setLoggedIn(false);
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, isMediaConnected, setMediaConnected, userData, setUserData, login, loginWithMfa, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}