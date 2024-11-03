import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Modal } from "../components/Modal";
import HomeIcon from '@mui/icons-material/Home';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { SignUpProgressBar } from "../components/SignUpProgressBar";
import UseAuth from "../hooks/useAuth";
import useLastPage from "../hooks/useLastPage";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const userFormSchema = z.object({
    nome: z.string().min(1, "Campo obrigatório"),
    sobrenome: z.string().min(1, "Campo obrigatório"),
    email: z.string().min(1, "Campo obrigatório").email("Formato de e-mail inválido"),
    telefone: z.string().regex(/^\(\d{2}\) (?:\d{4}-\d{4}|9\d{4}-\d{4})$/, "Formato de telefone inválido"),
    password: z.string().min(8, "Mínimo de 8 caracteres"),
    confirmPassword: z.string().min(8, "Mínimo de 8 caracteres")
}).refine(data => data.password == data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
});

const empresaFormSchema = z.object({
    razaoSocial: z.string().min(1, "Campo obrigatório"),
    nomeFantasia: z.string().min(1, "Campo obrigatório"),
    cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Formato de CNPJ inválido")
});

const enderecoEmpresaFormSchema = z.object({
    cep: z.string().regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido"),
    numero: z.string().min(1, "Campo obrigatório"),
    logradouro: z.string().min(1, "Campo obrigatório"),
    cidade: z.string().min(1, "Campo obrigatório"),
    estado: z.string().min(1, "Campo obrigatório"),
    bairro: z.string().min(1, "Campo obrigatório"),
    complemento: z.string().nullable()
});

type userFormData = z.infer<typeof userFormSchema>
type empresaFormData = z.infer<typeof empresaFormSchema>
type enderecoEmpresaFormData = z.infer<typeof enderecoEmpresaFormSchema>

export default function SignUp() {
    useLastPage();

    const { signUp }: any = UseAuth();
    const navigate = useNavigate();

    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const openSuccessModal = () => setSuccessModalOpen(true);
    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        navigate("/login");
    }

    const {
        register: registerUser,
        handleSubmit: handleSubmitUser,
        watch: watchUser,
        setValue: setValueUser,
        setError: setUserError,
        clearErrors: clearUserErrors,
        formState: { errors: userErrors }
    } = useForm<userFormData>({ resolver: zodResolver(userFormSchema) });

    const {
        register: registerEmpresa,
        handleSubmit: handleSubmitEmpresa,
        watch: watchEmpresa,
        setValue: setValueEmpresa,
        setError: setEmpresaError,
        clearErrors: clearEmpresaErrors,
        formState: { errors: empresaErrors }
    } = useForm<empresaFormData>({ resolver: zodResolver(empresaFormSchema) });

    const {
        register: registerEnderecoEmpresa,
        handleSubmit: handleSubmitEnderecoEmpresa,
        watch: watchEnderecoEmpresa,
        setValue: setValueEnderecoEmpresa,
        setError: setEnderecoEmpresaError,
        clearErrors: clearEnderecoEmpresaErrors,
        formState: { errors: enderecoEmpresaErrors }
    } = useForm<enderecoEmpresaFormData>({ resolver: zodResolver(enderecoEmpresaFormSchema) });

    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<object[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    function setPreviousStep() {
        step > 1 && setStep(step => step - 1);
        setFormData(data => data.slice(0, -1));
    }

    function setNextStep(data: any) {
        step < 3 && setStep(step => step + 1);
        setFormData([...formData, data]);
    }

    function getCep(cep: string) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (response.data.cep) {
                    setValueEnderecoEmpresa('logradouro', response.data.logradouro);
                    setValueEnderecoEmpresa('cidade', response.data.localidade);
                    setValueEnderecoEmpresa('estado', response.data.estado);
                    setValueEnderecoEmpresa('bairro', response.data.bairro);

                    clearEnderecoEmpresaErrors('logradouro');
                    clearEnderecoEmpresaErrors('cidade');
                    clearEnderecoEmpresaErrors('estado');
                    clearEnderecoEmpresaErrors('bairro');
                }
            })
            .catch(err => console.error(err));
    }

    async function signUpUser(data: enderecoEmpresaFormData) {
        const userFormData = formData[0];
        const empresaFormData = formData[1];
        const enderecoEmpresaFormData = data;

        setLoading(true);
        const response = await signUp(userFormData, empresaFormData, enderecoEmpresaFormData);

        if (!response) {
            setLoading(false);
            toast.error("Falha de conexão com o servidor.");
            return;
        }

        if (response.status == 201) {
            setStep(4);
            openSuccessModal();
        } else {
            toast.warn("Falha ao realizar inscrição.");
        }

        setLoading(false);
    }

    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
    const togglePasswordVisibility = () => setPasswordVisible(prevState => !prevState);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prevState => !prevState);

    function maskTelefoneInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
        setValueUser('telefone', value);
        (/^\(\d{2}\) 9\d{4}-\d{4}$/).test(value) ? clearUserErrors('telefone') : setUserError('telefone', { message: 'Formato de telefone inválido' });
    }

    function maskCnpjInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
            .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
        setValueEmpresa('cnpj', value);
        (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).test(value) ? clearEmpresaErrors('cnpj') : setEmpresaError('cnpj', { message: 'Formato de CNPJ inválido' });
    }

    function maskCepInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
        setValueEnderecoEmpresa('cep', value);
        (/^\d{5}-\d{3}$/).test(value) ? clearEnderecoEmpresaErrors('cep') : setEnderecoEmpresaError('cep', { message: 'Formato de CEP inválido' });
    }

    return (
        <div className='h-screen bg-black overflow-hidden flex mobile:justify-center'>
            <ToastContainer
                position="top-left"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                theme="dark"
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <button onClick={() => navigate("/")} className="absolute top-4 left-4 text-white-gray hover:text-purple transition-all"><HomeIcon sx={{ fontSize: 30 }} /></button>

            <div className="h-full w-[40%] flex flex-col items-center justify-center mobile:w-full">
                <div className="flex items-center justify-center flex-col mb-8">
                    <h1 className=" text-5xl font-semibold text-white-gray text-center mobile:text-3xl">
                        Crie sua conta
                    </h1>
                    <p className="text-white-gray mt-3 text-lg text-center">
                        {step == 1 && "Insira seus dados de usuário para continuar"}
                        {step == 2 && "Forneça as informações sobre a sua empresa"}
                        {step >= 3 && "Informe o endereço completo de sua empresa"}
                    </p>
                </div>

                {step == 1 &&

                    <form
                        onSubmit={handleSubmitUser(setNextStep)}
                        className="w-[23rem] mobile:w-80"
                    >

                        <div className="flex">
                            <div className="flex flex-col mr-1">
                                <Input
                                    value={watchUser('nome')}
                                    placeholder="Nome*"
                                    type="text"
                                    id="inputNome"
                                    name="nome"
                                    register={registerUser}
                                />
                                {userErrors.nome && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.nome.message}</span>}
                            </div>

                            <div className="flex flex-col ml-1">
                                <Input
                                    value={watchUser('sobrenome')}
                                    placeholder="Sobrenome*"
                                    type="text"
                                    id="inputSobrenome"
                                    name="sobrenome"
                                    register={registerUser}
                                />
                                {userErrors.sobrenome && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.sobrenome.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input
                                value={watchUser('email')}
                                placeholder="Endereço de e-mail*"
                                type="email"
                                id="inputEmail"
                                name="email"
                                register={registerUser}
                            />
                            {userErrors.email && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.email.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input
                                value={watchUser('telefone')}
                                placeholder="Telefone*"
                                type="text"
                                maxLength={15}
                                id="inputTelefone"
                                name="telefone"
                                register={registerUser}
                                onChange={maskTelefoneInput}
                            />
                            {userErrors.telefone && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.telefone.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4 relative">
                            <Input
                                value={watchUser('password')}
                                placeholder='Senha*'
                                type={isPasswordVisible ? "text" : "password"}
                                id="inputPassword"
                                name="password"
                                register={registerUser}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-white-gray cursor-pointer"
                                onClick={togglePasswordVisibility}
                                tabIndex={-1}
                            >
                                {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                            </button>
                            {userErrors.password && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.password.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4 relative">
                            <Input
                                value={watchUser('confirmPassword')}
                                placeholder='Confirmar senha*'
                                type={isConfirmPasswordVisible ? "text" : "password"}
                                id="inputConfirmPassword"
                                name="confirmPassword"
                                register={registerUser}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-white-gray cursor-pointer"
                                onClick={toggleConfirmPasswordVisibility}
                                tabIndex={-1}
                            >
                                {isConfirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
                            </button>
                            {userErrors.confirmPassword && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.confirmPassword.message}</span>}
                        </div>

                        <SignUpProgressBar step={step} />

                        <Button.Purple type="submit">Próximo</Button.Purple>
                    </form>
                }

                {step == 2 &&

                    <form
                        onSubmit={handleSubmitEmpresa(setNextStep)}
                        className="w-[23rem] mobile:w-80"
                    >

                        <div className="flex flex-col">
                            <Input
                                value={watchEmpresa('razaoSocial')}
                                placeholder="Razão social*"
                                type="text"
                                id="inputRazaoSocial"
                                name="razaoSocial"
                                register={registerEmpresa}
                            />
                            {empresaErrors.razaoSocial && <span className="text-white-gray text-sm ml-3 mt-2">{empresaErrors.razaoSocial.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input
                                value={watchEmpresa('nomeFantasia')}
                                placeholder="Nome fantasia*"
                                type="text"
                                id="inputNomeFantasia"
                                name="nomeFantasia"
                                register={registerEmpresa}
                            />
                            {empresaErrors.nomeFantasia && <span className="text-white-gray text-sm ml-3 mt-2">{empresaErrors.nomeFantasia.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input
                                value={watchEmpresa('cnpj')}
                                placeholder="CNPJ*"
                                type="text"
                                maxLength={18}
                                id="inputCnpj"
                                name="cnpj"
                                register={registerEmpresa}
                                onChange={maskCnpjInput}
                            />
                            {empresaErrors.cnpj && <span className="text-white-gray text-sm ml-3 mt-2">{empresaErrors.cnpj.message}</span>}
                        </div>

                        <SignUpProgressBar step={step} />

                        <div className="flex justify-between">
                            <Button.Transparent width="w-44 mobile:w-36" type="button" onClick={setPreviousStep}>Voltar</Button.Transparent>
                            <Button.Purple width="w-44 mobile:w-36" type="submit">Próximo</Button.Purple>
                        </div>
                    </form>
                }

                {step >= 3 &&

                    <form
                        onSubmit={handleSubmitEnderecoEmpresa(signUpUser)}
                        className="w-[23rem] mobile:w-80"
                    >
                        <div className="flex">
                            <div className="flex flex-col mr-1">
                                <Input
                                    onBlur={getCep}
                                    value={watchEnderecoEmpresa('cep')}
                                    placeholder="CEP*"
                                    type="text"
                                    maxLength={9}
                                    id="inputCep"
                                    name="cep"
                                    register={registerEnderecoEmpresa}
                                    onChange={maskCepInput}
                                />
                                {enderecoEmpresaErrors.cep && <span className="text-white-gray text-sm ml-3 mt-2">{enderecoEmpresaErrors.cep.message}</span>}
                            </div>

                            <div className="flex flex-col ml-1">
                                <Input
                                    value={watchEnderecoEmpresa('numero')}
                                    placeholder="Número*"
                                    type="number"
                                    id="inputNumero"
                                    name="numero"
                                    register={registerEnderecoEmpresa}
                                />
                                {enderecoEmpresaErrors.numero && <span className="text-white-gray text-sm ml-3 mt-2">{enderecoEmpresaErrors.numero.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input
                                value={watchEnderecoEmpresa('logradouro')}
                                placeholder="Logradouro*"
                                type="text"
                                id="inputLogradouro"
                                name="logradouro"
                                register={registerEnderecoEmpresa}
                            />
                            {enderecoEmpresaErrors.logradouro && <span className="text-white-gray text-sm ml-3 mt-2">{enderecoEmpresaErrors.logradouro.message}</span>}
                        </div>

                        <div className="flex mt-4">
                            <div className="flex flex-col mr-1">
                                <Input
                                    value={watchEnderecoEmpresa('cidade')}
                                    placeholder="Cidade*"
                                    type="text"
                                    id="inputCidade"
                                    name="cidade"
                                    register={registerEnderecoEmpresa}
                                />
                                {enderecoEmpresaErrors.cidade && <span className="text-white-gray text-sm ml-3 mt-2">{enderecoEmpresaErrors.cidade.message}</span>}
                            </div>

                            <div className="flex flex-col ml-1">
                                <Input
                                    value={watchEnderecoEmpresa('estado')}
                                    placeholder="Estado*"
                                    type="text"
                                    id="inputEstado"
                                    name="estado"
                                    register={registerEnderecoEmpresa}
                                />
                                {enderecoEmpresaErrors.estado && <span className="text-white-gray text-sm ml-3 mt-2">{enderecoEmpresaErrors.estado.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input
                                value={watchEnderecoEmpresa('bairro')}
                                placeholder="Bairro*"
                                type="text"
                                id="inputBairro"
                                name="bairro"
                                register={registerEnderecoEmpresa}
                            />
                            {enderecoEmpresaErrors.bairro && <span className="text-white-gray text-sm ml-3 mt-2">{enderecoEmpresaErrors.bairro.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input
                                value={watchEnderecoEmpresa('complemento')}
                                placeholder="Complemento"
                                type="text"
                                id="inputComplemento"
                                name="complemento"
                                register={registerEnderecoEmpresa}
                            />
                        </div>

                        <SignUpProgressBar step={step} />

                        <div className="flex justify-between">
                            <Button.Transparent width="w-44 mobile:w-36" type="button" onClick={setPreviousStep} disabled={isLoading ? true : false}>Voltar</Button.Transparent>
                            <Button.Purple width="w-44 mobile:w-36" type="submit" disabled={isLoading ? true : false}>
                                {isLoading
                                    ? <CircularProgress size="24px" sx={{ color: "#ffffff" }} />
                                    : "Inscrever-se"
                                }
                            </Button.Purple>
                        </div>
                    </form>
                }

                <div className="flex justify-center items-start">
                    <p className="text-white-gray mt-8 whitespace-nowrap select-none">Já possui uma conta? <Link to="/login" className="text-purple hover:text-purple-dark transition-all">Faça login</Link></p>
                </div>
            </div>
            <div className="h-full w-[65%] bg-signup bg-cover bg-no-repeat bg-center clip-path-signup mobile:hidden"></div>

            <Modal.Info content="Cadastro realizado com sucesso!" onConfirm={closeSuccessModal} isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
        </div>
    )
}