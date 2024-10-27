import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

interface AuthProvider {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProvider) {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const userToken = sessionStorage.getItem("bearerToken");
        userToken ? setLoggedIn(true) : setLoggedIn(false)
    }, []);

    async function login(email: string, password: string) {
        try {
            const response = await axios.post("http://localhost:8080/usuarios/login", {
                email: email,
                senha: password
            });

            sessionStorage.setItem("bearerToken", response.data.token);
            setLoggedIn(true);

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) return error.response;
        }
    }

    async function signUp(userFormData: any, empresaFormData: any, enderecoEmpresaFormData: any) {
        try {
            return await axios.post("http://localhost:8080/usuarios", {
                nome: userFormData.nome,
                sobrenome: userFormData.sobrenome,
                email: userFormData.email,
                telefone: userFormData.telefone.replace(/\D/g, ''),
                senha: userFormData.password,
                razaoSocial: empresaFormData.razaoSocial,
                nomeFantasia: empresaFormData.nomeFantasia,
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
        sessionStorage.removeItem("isPageLoaded");
        sessionStorage.removeItem("bearerToken");
        setLoggedIn(false);
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, login, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}