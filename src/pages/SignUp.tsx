import { useState } from "react";
import { useLastPage } from "../hooks/useLastPage";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UseAuth from "../hooks/useAuth";
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
    complemento: z.string().nullable()
});

type userFormData = z.infer<typeof userFormSchema>
type empresaFormData = z.infer<typeof empresaFormSchema>
type enderecoEmpresaFormData = z.infer<typeof enderecoEmpresaFormSchema>

interface CepProps {
    logradouro: string,
    localidade: string,
    estado: string,
    bairro: string
}

export default function SignUp() {
    useLastPage();

    const { signUp }: any = UseAuth();
    const navigate = useNavigate();

    const { register: registerUser, handleSubmit: handleSubmitUser, watch: watchUser, formState: { errors: userErrors } } = useForm<userFormData>({ resolver: zodResolver(userFormSchema) });
    const { register: registerEmpresa, handleSubmit: handleSubmitEmpresa, watch: watchEmpresa, formState: { errors: empresaErrors } } = useForm<empresaFormData>({ resolver: zodResolver(empresaFormSchema) });
    const { register: registerEnderecoEmpresa, handleSubmit: handleSubmitEnderecoEmpresa, watch: watchEnderecoEmpresa, formState: { errors: enderecoEmpresaErrors } } = useForm<enderecoEmpresaFormData>({ resolver: zodResolver(enderecoEmpresaFormSchema) });

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Object[]>([]);

    function setPreviousStep() {
        step > 1 && setStep(step => step - 1);
        setFormData(data => data.slice(0, -1));
    }

    function setNextStep(data: any) {
        step < 3 && setStep(step => step + 1);
        setFormData([...formData, data]);
    }

    const [cepData, setCepData] = useState<CepProps>();
    function getCep(cep: string) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => setCepData(response.data))
            .catch(err => console.error(err));
    }

    async function signUpUser(data: any) {
        if (!cepData?.logradouro || !cepData?.localidade || !cepData?.estado || !cepData?.bairro) {
            toast.warn("Informações de endereço inválidas.");
            return;
        }

        const userFormData = formData[0];
        const empresaFormData = formData[1];
        const enderecoEmpresaFormData = {
            cep: data.cep,
            numero: data.numero,
            logradouro: cepData.logradouro,
            cidade: cepData.localidade,
            estado: cepData.estado,
            bairro: cepData.bairro,
            complemento: data?.complemento
        };

        const response = await signUp(userFormData, empresaFormData, enderecoEmpresaFormData);

        if (!response) {
            toast.error("Falha de conexão com o servidor.");
            return;
        }

        if (response.status == 201) {
            toast.info("Inscrição realizada com sucesso. Acessando a tela de login...");
            setTimeout(() => navigate("/login"), 4000)
        } else {
            toast.warn("Falha ao realizar inscrição.");
        }
    }

    const [isPasswordVisible, setPasswordVisible] = useState<Boolean>(false);
    const togglePasswordVisibility = () => setPasswordVisible(prevState => !prevState);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState<Boolean>(false);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prevState => !prevState);

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

            <div className="h-full w-[40%] flex flex-col items-center justify-center mobile:w-full">
                <div className="flex items-center justify-center flex-col mb-8">
                    <h1 className=" text-5xl font-semibold text-white-gray text-center mobile:text-3xl">
                        Crie sua conta
                    </h1>
                    <p className="text-white-gray mt-3 text-lg">
                        {step == 1 && "Insira seus dados de usuário para continuar"}
                        {step == 2 && "Forneça as informações sobre a sua empresa"}
                        {step == 3 && "Informe o endereço completo de sua empresa"}
                    </p>
                </div>
                {
                    step == 1 &&

                    <form
                        onSubmit={handleSubmitUser(setNextStep)}
                        className="w-[23rem] mobile:w-80"
                    >

                        <div className="flex">
                            <div className="flex flex-col mr-1">
                                <Input.Input
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
                                <Input.Input
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
                            <Input.Input
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
                            <Input.Mask
                                value={watchUser('telefone')}
                                placeholder="Telefone*"
                                type="text"
                                id="inputTelefone"
                                name="telefone"
                                register={registerUser}
                                mask="(99) 99999-9999"
                            />
                            {userErrors.telefone && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.telefone.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4 relative">
                            <Input.Input
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
                            >
                                {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                            </button>
                            {userErrors.password && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.password.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4 mb-8 relative">
                            <Input.Input
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
                            >
                                {isConfirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
                            </button>
                            {userErrors.confirmPassword && <span className="text-white-gray text-sm ml-3 mt-2">{userErrors.confirmPassword.message}</span>}
                        </div>

                        <Button.Input value="Próximo" type="submit" />

                        <div className="flex justify-center items-start">
                            <p className="text-white-gray mt-8 whitespace-nowrap select-none">Já possui uma conta? Faça <Link to="/login" className="text-purple hover:text-purple-dark transition-all">login</Link></p>
                        </div>
                    </form>
                }

                {
                    step == 2 &&

                    <form
                        onSubmit={handleSubmitEmpresa(setNextStep)}
                        className="w-[23rem] mobile:w-80"
                    >

                        <div className="flex flex-col">
                            <Input.Input
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
                            <Input.Input
                                value={watchEmpresa('nomeFantasia')}
                                placeholder="Nome fantasia*"
                                type="text"
                                id="inputNomeFantasia"
                                name="nomeFantasia"
                                register={registerEmpresa}
                            />
                            {empresaErrors.nomeFantasia && <span className="text-white-gray text-sm ml-3 mt-2">{empresaErrors.nomeFantasia.message}</span>}
                        </div>

                        <div className="flex flex-col mt-4 mb-8">
                            <Input.Mask
                                value={watchEmpresa('cnpj')}
                                placeholder="CNPJ*"
                                type="text"
                                id="inputCnpj"
                                name="cnpj"
                                register={registerEmpresa}
                                mask="99.999.999/9999-99"
                            />
                            {empresaErrors.cnpj && <span className="text-white-gray text-sm ml-3 mt-2">{empresaErrors.cnpj.message}</span>}
                        </div>

                        <div className="flex justify-between">
                            <Button.Transparent width="w-44" value="Voltar" type="button" onClick={setPreviousStep} />
                            <Button.Input width="w-44" value="Próximo" type="submit" />
                        </div>

                        <div className="flex justify-center items-start">
                            <p className="text-white-gray mt-8 whitespace-nowrap select-none">Já possui uma conta? Faça <Link to="/login" className="text-purple hover:text-purple-dark transition-all">login</Link></p>
                        </div>
                    </form>
                }

                {
                    step == 3 &&

                    <form
                        onSubmit={handleSubmitEnderecoEmpresa(signUpUser)}
                        className="w-[23rem] mobile:w-80"
                    >
                        <div className="flex">
                            <div className="flex flex-col mr-1">
                                <Input.Mask
                                    onBlurFunc={getCep}
                                    value={watchEnderecoEmpresa('cep')}
                                    placeholder="CEP*"
                                    type="text"
                                    id="inputCep"
                                    name="cep"
                                    register={registerEnderecoEmpresa}
                                    mask="99999-999"
                                />
                                {enderecoEmpresaErrors.cep && <span className="text-white-gray text-sm ml-3 mt-2">{enderecoEmpresaErrors.cep.message}</span>}
                            </div>

                            <div className="flex flex-col ml-1">
                                <Input.Input
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
                            <Input.Input
                                value={cepData ? cepData.logradouro : ""}
                                placeholder="Logradouro*"
                                type="text"
                                id="inputLogradouro"
                                isDisabled={true}
                            />
                        </div>

                        <div className="flex mt-4">
                            <div className="flex flex-col mr-1">
                                <Input.Input
                                    value={cepData ? cepData.localidade : ""}
                                    placeholder="Cidade*"
                                    type="text"
                                    id="inputCidade"
                                    isDisabled={true}
                                />
                            </div>

                            <div className="flex flex-col ml-1">
                                <Input.Input
                                    value={cepData ? cepData.estado : ""}
                                    placeholder="Estado*"
                                    type="text"
                                    id="inputEstado"
                                    isDisabled={true}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <Input.Input
                                value={cepData ? cepData.bairro : ""}
                                placeholder="Bairro*"
                                type="text"
                                id="inputBairro"
                                isDisabled={true}
                            />
                        </div>

                        <div className="flex flex-col mt-4 mb-8">
                            <Input.Input
                                value={watchEnderecoEmpresa('complemento')}
                                placeholder="Complemento"
                                type="text"
                                id="inputComplemento"
                                name="complemento"
                                register={registerEnderecoEmpresa}
                            />
                        </div>

                        <div className="flex justify-between">
                            <Button.Transparent width="w-44" value="Voltar" type="button" onClick={setPreviousStep} />
                            <Button.Input width="w-44" value="Inscrever-se" type="submit" />
                        </div>

                        <div className="flex justify-center items-start">
                            <p className="text-white-gray mt-8 whitespace-nowrap select-none">Já possui uma conta? Faça <Link to="/login" className="text-purple hover:text-purple-dark transition-all">login</Link></p>
                        </div>
                    </form>
                }
            </div>
            <div className="h-full w-[65%] bg-signup bg-cover bg-no-repeat bg-center clip-path-signup mobile:hidden"></div>
        </div>
    )
}