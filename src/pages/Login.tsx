import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UseAuth from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

const loginFormSchema = z.object({
    email: z.string().min(1, "O e-mail é obrigatório").email("Formato de e-mail inválido"),
    password: z.string().min(8, "Mínimo de 8 caracteres")
});

type loginFormData = z.infer<typeof loginFormSchema>

export default function Login() {
    const { login }: any = UseAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<loginFormData>({ resolver: zodResolver(loginFormSchema) });

    const [isLoading, setLoading] = useState<boolean>(false);

    async function loginUser(data: loginFormData) {
        setLoading(true);
        const response = await login(data.email, data.password);

        if (!response) {
            setLoading(false);
            toast.error("Falha de conexão com o servidor.");
            return;
        }

        if (response.status == 200 && response.data.status == "AGUARDANDO_PAGAMENTO") {
            navigate("/plan");
        } else if (response.status == 200 && response.data.status == "AGUARDANDO_FORMULARIO") {
            navigate("/form");
        } else if (response.status == 200 && response.data.status == "CADASTRO_FINALIZADO") {
            navigate("/creative");
        } else {
            toast.warn("E-mail ou senha inválidos.");
        }

        setLoading(false);
    }

    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
    const togglePasswordVisibility = () => setPasswordVisible(prevState => !prevState);

    return (
        <div className='h-screen bg-black overflow-hidden flex mobile:justify-center'>
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

            <button onClick={() => navigate("/")} className="absolute top-4 right-4 text-white-gray hover:text-purple transition-all"><HomeIcon sx={{ fontSize: 30 }} /></button>

            <div className="h-full w-[65%] bg-login bg-cover bg-no-repeat bg-center clip-path-login mobile:hidden"></div>
            <div className="h-full w-[40%] flex flex-col items-center justify-center mobile:w-full">
                <div className="h-40 flex items-center justify-center flex-col mb-4">
                    <h1 className=" text-5xl font-semibold text-white-gray text-center mobile:text-3xl">Bem-vindo de volta</h1>
                    <p className="text-white-gray mt-3 text-lg">Faça seu login para prosseguir</p>
                </div>
                <form
                    onSubmit={handleSubmit(loginUser)}
                    className="w-[23rem] mobile:w-80"
                >
                    <div className="flex flex-col">
                        <Input
                            value={watch('email')}
                            placeholder="Endereço de e-mail*"
                            type="email"
                            id="inputEmail"
                            name="email"
                            register={register}
                        />
                        {errors.email && <span className="text-white-gray text-sm ml-3 mt-2">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col mt-6 relative">
                        <Input
                            value={watch('password')}
                            placeholder='Senha*'
                            type={isPasswordVisible ? "text" : "password"}
                            id="inputPassword"
                            name="password"
                            register={register}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-white-gray cursor-pointer"
                            onClick={togglePasswordVisibility}
                            tabIndex={-1}
                        >
                            {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                        </button>
                        {errors.password && <span className="text-white-gray text-sm ml-3 mt-2">{errors.password.message}</span>}
                    </div>
                    <div className="flex justify-end">
                        <a href="" className="text-white-gray mt-4 mb-8 mr-3 text-sm hover:text-purple transition-all">Esqueci minha senha</a>
                    </div>
                    <Button.Purple type="submit" disabled={isLoading ? true : false}>
                        {isLoading
                            ? <CircularProgress size="24px" sx={{ color: "#ffffff" }} />
                            : "Entrar"
                        }
                    </Button.Purple>
                    <div className="flex justify-center items-start">
                        <p className="text-white-gray mt-8 whitespace-nowrap select-none">Ainda não possui uma conta? <Link to="/signup" className="text-purple hover:text-purple-dark transition-all">Inscreva-se</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}