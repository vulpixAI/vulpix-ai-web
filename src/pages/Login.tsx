import { useState } from "react";
import { useLastPage } from "../hooks/useLastPage";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UseAuth from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

const loginFormSchema = z.object({
    email: z.string().min(1, "O e-mail é obrigatório").email("Formato de e-mail inválido"),
    password: z.string().min(8, "Mínimo de 8 caracteres")
});

type signInFormData = z.infer<typeof loginFormSchema>

export default function Login() {
    useLastPage();

    const { login }: any = UseAuth();
    const navigate = useNavigate();

    const [isPasswordVisible, setPasswordVisible] = useState<Boolean>(false);
    const togglePasswordVisibility = () => setPasswordVisible(prevState => !prevState);

    const { register, handleSubmit, formState: { errors } } = useForm<signInFormData>({ resolver: zodResolver(loginFormSchema) });

    async function loginUser(data: any) {
        const response = await login(data.email, data.password);
        response.status == 200 ? navigate("/dashboard") : toast.error("E-mail ou senha inválidos!");
    }

    return (
        <div className='h-screen bg-black overflow-hidden flex'>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                theme="dark"
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="h-full w-[65%] bg-login bg-cover bg-no-repeat bg-center clip-path-login">
            </div>
            <div className="h-full w-[40%] flex flex-col items-center justify-center">
                <div className="h-40 flex items-center justify-center flex-col mb-4">
                    <h1 className=" text-5xl font-semibold text-white-gray text-center">Bem-vindo de volta!</h1>
                    <p className="text-white-gray mt-3 text-lg">Faça seu login para prosseguir.</p>
                </div>
                <form
                    onSubmit={handleSubmit(loginUser)}
                    className="h-96 w-[23rem]"
                >
                    <div className="flex flex-col">
                        <label className="text-white-gray mb-2 ml-3" htmlFor="inputEmail">E-mail</label>
                        <Input
                            placeholder="Insira seu e-mail"
                            type="text"
                            id="inputEmail"
                            name="email"
                            register={register}
                        />
                        {errors.email && <span className="text-white-gray text-sm ml-3 mt-2">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col mt-4 relative">
                        <label className="text-white-gray mb-2 ml-3" htmlFor="inputPassword">Senha</label>
                        <Input
                            placeholder='Insira sua senha'
                            type={isPasswordVisible ? "text" : "password"}
                            id="inputPassword"
                            name="password"
                            register={register}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-11 text-white-gray cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                        </button>
                        {errors.password && <span className="text-white-gray text-sm ml-3 mt-2">{errors.password.message}</span>}
                    </div>
                    <div className=" flex justify-end">
                        <a href="" className="text-white-gray mt-4 mb-8 mr-3 text-sm hover:text-purple transition-all">Esqueci minha senha</a>
                    </div>
                    <Button.Input value="Entrar" />
                    <div className="flex justify-center items-start">
                        <p className="text-white-gray mt-8 whitespace-nowrap select-none">Ainda não possui uma conta? <a href="/signup" className="text-purple hover:text-purple-dark transition-all">Inscreva-se</a>.</p>
                    </div>
                </form>
            </div>
        </div>
    )
}