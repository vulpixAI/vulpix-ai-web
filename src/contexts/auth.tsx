import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

interface AuthProvider {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProvider) {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

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

    async function signUp(userFormData: any, empresaFormData: any, enderecoEmpresaFormData: any) {
        let userResponse: any = {};

        try {
            userResponse = await axios.post("http://localhost:8080/usuarios/signup", {
                nome: userFormData.nome,
                sobrenome: userFormData.sobrenome,
                email: userFormData.email,
                telefone: userFormData.telefone.replace(/\D/g, ''),
                senha: userFormData.password
            });

            const empresaResponse = await axios.post("http://localhost:8080/empresas", {
                razaoSocial: empresaFormData.razaoSocial,
                nomeFantasia: empresaFormData.nomefantasia,
                cnpj: empresaFormData.cnpj.replace(/\D/g, ''),
                cep: enderecoEmpresaFormData.cep.replace(/\D/g, ''),
                numero: enderecoEmpresaFormData.numero,
                logradouro: enderecoEmpresaFormData.logradouro,
                cidade: enderecoEmpresaFormData.cidade,
                estado: enderecoEmpresaFormData.estado,
                bairro: enderecoEmpresaFormData.bairro,
                complemento: enderecoEmpresaFormData?.complemento,
                usuario: {
                    id: userResponse.data.id_usuario
                }
            });

            return empresaResponse;
        } catch (err) {
            userResponse?.data?.id_usuario && axios.delete(`http://localhost:8080/usuarios/${userResponse.data.id_usuario}`);
            if (axios.isAxiosError(err)) return err.response;
        }
    }

    function signOut() {
        sessionStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, login, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}