import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CircularProgress from '@mui/material/CircularProgress';
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
import UseAuth from "../hooks/useAuth";

interface Settings {
    isOpen: boolean,
    onClose: any
}

interface MenuState {
    account: boolean,
    connection: boolean
}

interface ConnectionData {
    media: string,
    accessToken: string,
    clientId: string,
    clientSecret: string,
    igUserId: string
}

const userFormSchema = z.object({
    nome: z.string().min(1, "Campo obrigatório"),
    sobrenome: z.string().min(1, "Campo obrigatório"),
    telefone: z.string().regex(/^\(\d{2}\) (?:\d{4}-\d{4}|9\d{4}-\d{4})$/, "Formato de telefone inválido"),
    nomeFantasia: z.string().min(1, "Campo obrigatório"),
    cep: z.string().regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido"),
    numero: z.string().min(1, "Campo obrigatório"),
    logradouro: z.string().min(1, "Campo obrigatório"),
    cidade: z.string().min(1, "Campo obrigatório"),
    estado: z.string().min(1, "Campo obrigatório"),
    bairro: z.string().min(1, "Campo obrigatório"),
    complemento: z.string().nullable()
});

type UserFormData = z.infer<typeof userFormSchema> & {
    email: string,
    cnpj: string,
    razaoSocial: string
}

export function Settings({ isOpen, onClose }: Settings) {
    const { setMediaConnected }: any = UseAuth();
    const { register, handleSubmit, watch, setValue, setError, clearErrors, formState: { errors } } = useForm<UserFormData>({ resolver: zodResolver(userFormSchema) });

    const [menuState, setMenuState] = useState<MenuState>({ account: true, connection: false });
    const handleOptionChange = (option: string) => setMenuState({ account: false, connection: false, [option]: true });

    const [userData] = useState<UserFormData>(JSON.parse(sessionStorage.getItem("userData") || ""));
    const [isUserFormChanged, setUserFormChanged] = useState<boolean>(false);

    const [connectionData, setConnectionData] = useState<Partial<ConnectionData>>({});
    const [isConnectionFormCompleted, setConnectionFormCompleted] = useState<boolean>(false);

    function loadUserData() {
        setValue('nome', userData.nome);
        setValue('sobrenome', userData.sobrenome);
        setValue('email', userData.email);
        setValue('telefone', userData.telefone.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2'));
        clearErrors('telefone');
        setValue('cnpj', userData.cnpj);
        setValue('razaoSocial', userData.razaoSocial);
        setValue('nomeFantasia', userData.nomeFantasia);
        setValue('cep', userData.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2'));
        clearErrors('cep');
        setValue('numero', userData.numero);
        setValue('logradouro', userData.logradouro);
        setValue('cidade', userData.cidade);
        setValue('estado', userData.estado);
        setValue('bairro', userData.bairro);
        setValue('complemento', userData.complemento);
    }

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        if (connectionData.media && connectionData.accessToken && connectionData.clientId && connectionData.clientSecret && connectionData.igUserId) {
            setConnectionFormCompleted(true);
        } else {
            setConnectionFormCompleted(false);
        }
    }, [connectionData]);

    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const openSuccessModal = () => setSuccessModalOpen(true);
    const closeSuccessModal = () => { setSuccessModalOpen(false) }
    const [message, setMessage] = useState<string>("");
    const [isErrorModalOpen, setErrorModalOpen] = useState<boolean>(false);
    const openErrorModal = () => setErrorModalOpen(true);
    const closeErrorModal = () => setErrorModalOpen(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    const resetSettingsModal = () => setTimeout(() => { loadUserData(), setConnectionData({}), setMenuState({ account: true, connection: false }), setUserFormChanged(false) }, 200);

    async function updateUserData() {

    }

    async function sendConnectionForm() {
        const postPayload = {
            tipo: connectionData.media
        }

        const patchPayload = {
            accessToken: connectionData.accessToken,
            clientId: connectionData.clientId,
            clientSecret: connectionData.clientSecret,
            igUserId: connectionData.igUserId
        }

        setLoading(true);

        await axios.post(`${import.meta.env.VITE_API_URL}/integracoes`, postPayload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(() => {
            axios.patch(`${import.meta.env.VITE_API_URL}/integracoes`, patchPayload, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
                }
            }).then(() => {
                sessionStorage.setItem("mediaConnected", "true");
                setMediaConnected(true);
                setMessage("Conexão realizada com sucesso! 🚀");
                openSuccessModal();
            }).catch(() => {
                setMessage("Houve um problema ao realizar a conexão.");
                openErrorModal();
            });
        }).catch(() => {
            setMessage("Houve um problema ao realizar a conexão.");
            openErrorModal();
        });

        setLoading(false);
    }

    function maskTelefoneInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
        setValue('telefone', value);
        (/^\(\d{2}\) 9\d{4}-\d{4}$/).test(value) ? clearErrors('telefone') : setError('telefone', { message: 'Formato de telefone inválido' });
    }

    function maskCepInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
        setValue('cep', value);
        (/^\d{5}-\d{3}$/).test(value) ? clearErrors('cep') : setError('cep', { message: 'Formato de CEP inválido' });
    }

    return (
        <>
            <Modal.Modal width={800} height={600} title="Configurações" isOpen={isOpen} onClose={() => { !isLoading && (resetSettingsModal(), onClose()) }}>
                <div className="flex h-full w-full">
                    <div className="h-full w-1/4 flex flex-col">
                        <button disabled={isLoading ? true : false} onClick={() => handleOptionChange("account")} className={`flex items-center py-4 pl-2 mb-1 rounded-md transition-all select-none hover:bg-zinc-700 ${menuState.account && "text-purple"}`}><PersonIcon /> <span className="ml-2 mt-[2px]">Conta</span></button>
                        <button disabled={isLoading ? true : false} onClick={() => handleOptionChange("connection")} className={`flex items-center py-4 pl-2 rounded-md transition-all select-none hover:bg-zinc-700 ${menuState.connection && "text-purple"}`}><PublicIcon /> <span className="ml-2">Conexões</span></button>
                    </div>

                    <div className="h-full w-3/4 flex flex-col px-4">
                        {menuState.account &&
                            <form onSubmit={handleSubmit(updateUserData)} className="w-full h-full flex flex-col items-center justify-between">
                                <h2 className="text-center">Pretende atualizar seus dados? Atualize suas informações por aqui! ✏️</h2>

                                <div className="h-[360px] -mt-4 py-2 px-4 w-full overflow-x-hidden">
                                    <h3 className="mb-5 flex items-center"><PersonIcon fontSize="small" /> <span className="mt-[2px] ml-1">Dados Pessoais</span></h3>

                                    <div className="flex flex-col">
                                        <Input.Modal
                                            value={watch('nome')}
                                            placeholder="Nome"
                                            type="text"
                                            id="inputNome"
                                            name="nome"
                                            register={register}
                                            onChange={(e: any) => { register('nome').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                        />
                                        {errors.nome && <span className="text-white-gray text-sm ml-3 mt-2">{errors.nome.message}</span>}
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <Input.Modal
                                            value={watch('sobrenome')}
                                            placeholder="Sobrenome"
                                            type="text"
                                            id="inputSobrenome"
                                            name="sobrenome"
                                            register={register}
                                            onChange={(e: any) => { register('sobrenome').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                        />
                                        {errors.sobrenome && <span className="text-white-gray text-sm ml-3 mt-2">{errors.sobrenome.message}</span>}
                                    </div>

                                    <div className="relative mt-5">
                                        <label className="text-slate-400 text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10">E-mail</label>
                                        <input className="relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 border-zinc-600 placeholder:blue-gray p-2 pl-4 text-zinc-400" {...register("email")} disabled />
                                        <span className="absolute right-3 top-[10px] text-zinc-400 cursor-no-drop"><LockIcon /></span>
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <Input.Modal
                                            value={watch('telefone')}
                                            placeholder="Telefone"
                                            type="text"
                                            maxLength={15}
                                            id="inputTelefone"
                                            name="telefone"
                                            register={register}
                                            onChange={(e: any) => { register('telefone').onChange(e), maskTelefoneInput(e), !isUserFormChanged && setUserFormChanged(true) }}
                                        />
                                        {errors.telefone && <span className="text-white-gray text-sm ml-3 mt-2">{errors.telefone.message}</span>}
                                    </div>

                                    <h3 className="my-5 flex items-center"><ApartmentIcon fontSize="small" /> <span className="mt-[2px] ml-1">Detalhes da Empresa</span></h3>

                                    <div className="relative mt-5">
                                        <label className="text-slate-400 text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10">CNPJ</label>
                                        <input className="relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 border-zinc-600 placeholder:blue-gray p-2 pl-4 text-zinc-400" {...register("cnpj")} disabled />
                                        <span className="absolute right-3 top-[10px] text-zinc-400 cursor-no-drop"><LockIcon /></span>
                                    </div>

                                    <div className="relative mt-5">
                                        <label className="text-slate-400 text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10">Razão Social</label>
                                        <input className="relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 border-zinc-600 placeholder:blue-gray p-2 pl-4 text-zinc-400" {...register("razaoSocial")} disabled />
                                        <span className="absolute right-3 top-[10px] text-zinc-400 cursor-no-drop"><LockIcon /></span>
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <Input.Modal
                                            value={watch('nomeFantasia')}
                                            placeholder="Nome Fantasia"
                                            type="text"
                                            id="inputNomeFantasia"
                                            name="nomeFantasia"
                                            register={register}
                                            onChange={(e: any) => { register('nomeFantasia').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                        />
                                        {errors.nomeFantasia && <span className="text-white-gray text-sm ml-3 mt-2">{errors.nomeFantasia.message}</span>}
                                    </div>

                                    <h3 className="my-5 flex items-center"><LocationOnIcon fontSize="small" /> <span className="mt-[2px] ml-1">Endereço Comercial</span></h3>

                                    <div className="flex justify-between mt-5">
                                        <div className="flex flex-col w-[236px]">
                                            <Input.Modal
                                                onBlur={() => { }}
                                                value={watch('cep')}
                                                placeholder="CEP"
                                                type="text"
                                                maxLength={9}
                                                id="inputCep"
                                                name="cep"
                                                register={register}
                                                onChange={(e: any) => { register('cep').onChange(e), maskCepInput(e), !isUserFormChanged && setUserFormChanged(true) }}
                                            />
                                            {errors.cep && <span className="text-white-gray text-sm ml-3 mt-2">{errors.cep.message}</span>}
                                        </div>

                                        <div className="flex flex-col w-[236px]">
                                            <Input.Modal
                                                value={watch('numero')}
                                                placeholder="Número"
                                                type="number"
                                                id="inputNumero"
                                                name="numero"
                                                register={register}
                                                onChange={(e: any) => { register('numero').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                            />
                                            {errors.numero && <span className="text-white-gray text-sm ml-3 mt-2">{errors.numero.message}</span>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <Input.Modal
                                            value={watch('logradouro')}
                                            placeholder="Logradouro"
                                            type="text"
                                            id="inputLogradouro"
                                            name="logradouro"
                                            register={register}
                                            onChange={(e: any) => { register('logradouro').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                        />
                                        {errors.logradouro && <span className="text-white-gray text-sm ml-3 mt-2">{errors.logradouro.message}</span>}
                                    </div>

                                    <div className="flex justify-between mt-5">
                                        <div className="flex flex-col w-[236px]">
                                            <Input.Modal
                                                value={watch('cidade')}
                                                placeholder="Cidade"
                                                type="text"
                                                id="inputCidade"
                                                name="cidade"
                                                register={register}
                                                onChange={(e: any) => { register('cidade').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                            />
                                            {errors.cidade && <span className="text-white-gray text-sm ml-3 mt-2">{errors.cidade.message}</span>}
                                        </div>

                                        <div className="flex flex-col w-[236px]">
                                            <Input.Modal
                                                value={watch('estado')}
                                                placeholder="Estado"
                                                type="text"
                                                id="inputEstado"
                                                name="estado"
                                                register={register}
                                                onChange={(e: any) => { register('estado').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                            />
                                            {errors.estado && <span className="text-white-gray text-sm ml-3 mt-2">{errors.estado.message}</span>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <Input.Modal
                                            value={watch('bairro')}
                                            placeholder="Bairro"
                                            type="text"
                                            id="inputBairro"
                                            name="bairro"
                                            register={register}
                                            onChange={(e: any) => { register('bairro').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                        />
                                        {errors.bairro && <span className="text-white-gray text-sm ml-3 mt-2">{errors.bairro.message}</span>}
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <Input.Modal
                                            value={watch('complemento')}
                                            placeholder="Complemento"
                                            type="text"
                                            id="inputComplemento"
                                            name="complemento"
                                            register={register}
                                            onChange={(e: any) => { register('complemento').onChange(e), !isUserFormChanged && setUserFormChanged(true) }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-end justify-end w-full">
                                    <Button.Purple type="submit" width="w-44" disabled={(isUserFormChanged && !isLoading) ? false : true}>
                                        {isLoading
                                            ? <CircularProgress size="24px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                            : "Salvar Alterações"
                                        }
                                    </Button.Purple>
                                </div>
                            </form>
                        }

                        {menuState.connection &&
                            <div className="w-full h-full flex flex-col items-center justify-between">
                                <h2 className="text-center">Escolha uma rede, preencha os campos e, ao se conectar, você poderá fazer publicações através da nossa plataforma! 🚀</h2>

                                <div className="flex mt-[8px] select-none">
                                    <button
                                        onClick={() => setConnectionData((prevData: any) => ({ ...prevData, media: "INSTAGRAM" }))}
                                        className={`flex items-center py-2 px-3 mr-2 rounded-md border-solid border-2 transition-all ${connectionData.media == "INSTAGRAM" ? "text-purple border-purple" : "border-white-gray"}`}
                                        disabled={isLoading ? true : false}
                                    >
                                        <InstagramIcon />
                                        <span className="ml-2">Instagram</span>
                                    </button>

                                    <button
                                        onClick={() => setConnectionData((prevData: any) => ({ ...prevData, media: "FACEBOOK" }))}
                                        className={`flex items-center py-2 px-3 ml-2 rounded-md border-solid border-2 transition-all ${connectionData.media == "FACEBOOK" ? "text-purple border-purple" : "border-white-gray"}`}
                                        disabled={isLoading ? true : false}
                                    >
                                        <FacebookIcon />
                                        <span className="ml-2">Facebook</span>
                                    </button>
                                </div>

                                <div className="w-full mt-4">
                                    <Input.Modal
                                        value={connectionData.accessToken || null}
                                        placeholder="Token de acesso*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, accessToken: e.target.value }))}
                                    />
                                </div>

                                <div className="w-full mt-4">
                                    <Input.Modal
                                        value={connectionData.clientId || null}
                                        placeholder="Id do cliente*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, clientId: e.target.value }))}
                                    />
                                </div>

                                <div className="w-full mt-4">
                                    <Input.Modal
                                        value={connectionData.clientSecret || null}
                                        placeholder="Secret do cliente*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, clientSecret: e.target.value }))}
                                    />
                                </div>

                                <div className="w-full my-4">
                                    <Input.Modal
                                        value={connectionData.igUserId || null}
                                        placeholder="Id de usuário*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, igUserId: e.target.value }))}
                                    />
                                </div>

                                <div className="flex items-end justify-end w-full">
                                    <Button.Purple onClick={sendConnectionForm} type="button" width="w-44" disabled={(isConnectionFormCompleted && !isLoading) ? false : true}>
                                        {isLoading
                                            ? <CircularProgress size="24px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                            : "Salvar Alterações"
                                        }
                                    </Button.Purple>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Modal.Modal>

            <Modal.Info children={message} onConfirm={closeSuccessModal} isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
            <Modal.Error children={message} onConfirm={closeErrorModal} isOpen={isErrorModalOpen} onClose={closeErrorModal} />
        </>
    )
}