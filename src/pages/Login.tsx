import { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import "react-toastify/dist/ReactToastify.css";

const loginFormSchema = z.object({
    email: z.string().min(1, "O e-mail é obrigatório").email("Formato de e-mail inválido"),
    password: z.string().min(8, "Mínimo de 8 caracteres")
});

type loginFormData = z.infer<typeof loginFormSchema>

interface qrcodeResponse {
    qrcodeBase64: string,
    secretKey: string
}

export default function Login() {
    const { login, loginWithMfa }: any = UseAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<loginFormData>({ resolver: zodResolver(loginFormSchema) });

    const [isLoading, setLoading] = useState<boolean>(false);

    const inputRefs = useRef<any>([]);
    const [qrcodeResponse, setQrcodeResponse] = useState<Partial<qrcodeResponse>>({});
    const [isMfaRequired, setMfaRequired] = useState<boolean>(false);
    const [isQrcodeGenerateRequired, setQrcodeGenerateRequired] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [dispositiveCode, setDispositiveCode] = useState<string>("teste");

    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
    const togglePasswordVisibility = () => setPasswordVisible(prevState => !prevState);

    useEffect(() => {
        getDispositiveCode();
    }, []);

    async function loginUser(data: loginFormData) {
        setLoading(true);
        const response = await login(data.email, data.password, dispositiveCode);

        if (!response) {
            setLoading(false);
            toast.error("Falha de conexão com o servidor.");
            return;
        }

        if (response.data.mfaRequerido != null && response.data.mfaRequerido) {
            if (response.data.secretKey == null) {
                await axios.get(`${import.meta.env.VITE_API_URL}/autenticacoes/google/gerar-qrcode?email=${response.data.email}`).then(response => {
                    setQrcodeResponse(response.data);
                });
                setQrcodeGenerateRequired(true);
            }

            setUserEmail(data.email);
            setMfaRequired(true);
            setLoading(false);
            return;
        }

        if (response.status == 401) {
            toast.warn("E-mail ou senha inválidos.");
        } else if (response.status == 200 && response.data.status == "AGUARDANDO_PAGAMENTO") {
            navigate("/plan");
        } else if (response.status == 200 && response.data.status == "AGUARDANDO_FORMULARIO") {
            navigate("/form");
        } else if (response.status == 200 && response.data.status == "CADASTRO_FINALIZADO") {
            navigate("/creative");
        }

        setLoading(false);
    }

    async function loginUserWithMfa(otp: string) {
        setLoading(true);

        const response = await loginWithMfa(userEmail, otp, qrcodeResponse.secretKey, dispositiveCode);

        if (response.status == 401) {
            toast.warn("Código OTP inválido.");
        } else if (response.status == 200 && response.data.status == "AGUARDANDO_PAGAMENTO") {
            navigate("/plan");
        } else if (response.status == 200 && response.data.status == "AGUARDANDO_FORMULARIO") {
            navigate("/form");
        } else if (response.status == 200 && response.data.status == "CADASTRO_FINALIZADO") {
            navigate("/creative");
        }

        setLoading(false);
    }

    async function getDispositiveCode() {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDispositiveCode(result.visitorId);
    }

    function limitInputCharacter(e: any) {
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0, 1);
        }
    }

    function focusNextInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        if (!/^\d$/.test(e.target.value)) {
            return;
        }

        if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (index == inputRefs.current.length - 1) {
            let otp = inputRefs.current.map((input: any) => input.value).join("");
            loginUserWithMfa(otp);
        }
    }

    function focusPreviusInputOnBackspace(e: any, index: number) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

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
                {isMfaRequired
                    ?
                    <>
                        <div className="mb-2">
                            <h2 className="text-2xl font-semibold text-white-gray mt-2 text-center">
                                Autenticação de Dois Fatores Necessária
                            </h2>
                            <p className="text-white-gray text-sm mt-2 text-center">
                                Para acessar sua conta com mais segurança, é necessário realizar o
                                processo de autenticação de dois fatores.
                            </p>
                        </div>

                        <ul className="list-disc mt-4 text-white-gray text-sm px-6 w-full">
                            <li>Abra o aplicativo autenticador de sua preferência (Google Authenticator, Authy, etc.).</li>
                            {isQrcodeGenerateRequired && <li className="my-2">Escaneie o <span className="text-purple select-none">QR Code</span> abaixo com o app.</li>}
                        </ul>

                        {isQrcodeGenerateRequired &&
                            <div className="flex items-center justify-center border border-purple p-3 my-4">
                                <img className="h-40" src={`data:image/png;base64,${qrcodeResponse.qrcodeBase64}`} alt="Imagem do QR Code" />
                            </div>
                        }

                        <ul className="list-disc text-white-gray text-sm px-6 mt-2 w-full">
                            <li>Insira o código de 6 dígitos gerado pelo app nos campos abaixo:</li>
                        </ul>

                        <div className="flex mt-6 text-white-gray text-xl">
                            {isLoading ?
                                <CircularProgress size="36px" sx={{ color: "#5d5aff" }} />
                                :
                                Array(6).fill(0).map((_, i) => (
                                    <input
                                        key={i}
                                        ref={el => inputRefs.current[i] = el}
                                        className="bg-dark-gray w-12 h-14 mx-2 rounded-md outline-0 text-center"
                                        type="number"
                                        onInput={e => limitInputCharacter(e)}
                                        onChange={e => focusNextInput(e, i)}
                                        onKeyDown={e => focusPreviusInputOnBackspace(e, i)}
                                        autoFocus={i == 0 && true}
                                    />
                                ))
                            }
                        </div>
                    </>
                    :
                    <>
                        <div className="h-40 flex items-center justify-center flex-col mb-4">
                            <h1 className=" text-5xl font-semibold text-white-gray text-center mobile:text-3xl">Bem-vindo de volta</h1>
                            <p className="text-white-gray mt-3 text-lg">Faça seu login para prosseguir</p>
                        </div>
                        <form
                            onSubmit={handleSubmit(loginUser)}
                            className="w-[23rem] mobile:w-80"
                        >
                            <div className="flex flex-col">
                                <Input.Input
                                    value={watch('email')}
                                    placeholder="Endereço de e-mail*"
                                    type="email"
                                    id="inputEmail"
                                    name="email"
                                    register={register}
                                    disabled={isLoading ? true : false}
                                />
                                {errors.email && <span className="text-white-gray text-sm ml-3 mt-2">{errors.email.message}</span>}
                            </div>
                            <div className="flex flex-col mt-6 relative">
                                <Input.Input
                                    value={watch('password')}
                                    placeholder='Senha*'
                                    type={isPasswordVisible ? "text" : "password"}
                                    id="inputPassword"
                                    name="password"
                                    register={register}
                                    disabled={isLoading ? true : false}
                                    hasIcon
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
                    </>
                }
            </div>
        </div>
    )
}