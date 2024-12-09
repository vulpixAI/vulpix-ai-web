import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import { Input } from "../Input";
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircularProgress from '@mui/material/CircularProgress';
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
import UseAuth from "../../hooks/useAuth";

interface Account {
    isLoading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setMessage: Dispatch<SetStateAction<string>>,
    openSuccessModal: () => void,
    openErrorModal: () => void
}

const userFormSchema = z.object({
    telefone: z.string().regex(/^\(\d{2}\) \d{4}-\d{4}$/, "Formato de telefone inválido"),
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
    nome: string,
    sobrenome: string,
    email: string,
    cnpj: string,
    razaoSocial: string
}

export function Account({ isLoading, setLoading, setMessage, openSuccessModal, openErrorModal }: Account) {
    const { userData, setUserData }: any = UseAuth();
    const { register, handleSubmit, watch, setValue, setError, clearErrors, formState: { errors } } = useForm<UserFormData>({ resolver: zodResolver(userFormSchema) });

    const [isUserDataLoading, setUserDataLoading] = useState<boolean>(true);
    const [isUserFormChanged, setUserFormChanged] = useState<boolean>(false);

    useEffect(() => {
        clearErrors();
        setValue('nome', userData.nome);
        setValue('sobrenome', userData.sobrenome);
        setValue('email', userData.email);
        setValue('telefone', userData.telefone.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{4})/, '$1-$2'));
        setValue('cnpj', userData.cnpj.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4').replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5'));
        setValue('razaoSocial', userData.razaoSocial);
        setValue('nomeFantasia', userData.nomeFantasia);
        setValue('cep', userData.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2'));
        setValue('numero', userData.numero);
        setValue('logradouro', userData.logradouro);
        setValue('cidade', userData.cidade);
        setValue('estado', userData.estado);
        setValue('bairro', userData.bairro);
        setValue('complemento', userData.complemento);
        setUserDataLoading(false);
    }, []);

    async function updateUserData(data: UserFormData) {
        const payload = {
            nomeFantasia: data.nomeFantasia,
            telefone: data.telefone.replace(/\D/g, ''),
            cep: data.cep.replace(/\D/g, ''),
            logradouro: data.logradouro,
            numero: data.numero,
            bairro: data.bairro,
            complemento: data.complemento,
            cidade: data.cidade,
            estado: data.estado
        }

        setLoading(true);

        await axios.patch(`${import.meta.env.VITE_API_URL}/empresas`, payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(() => {
            setUserData((prevData: object) => ({
                ...prevData,
                nomeFantasia: data.nomeFantasia,
                telefone: data.telefone.replace(/\D/g, ''),
                cep: data.cep.replace(/\D/g, ''),
                logradouro: data.logradouro,
                numero: data.numero,
                bairro: data.bairro,
                complemento: data.complemento,
                cidade: data.cidade,
                estado: data.estado
            }));
            sessionStorage.setItem("userData", JSON.stringify(userData));
            setMessage("Alteração realizada com sucesso! 🚀");
            setUserFormChanged(false);
            openSuccessModal();
        }).catch(() => {
            setMessage("Houve um problema ao realizar a atualização de dados.");
            openErrorModal();
        });

        setLoading(false);
    }

    function maskTelefoneInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d{4})/, '$1-$2');
        setValue('telefone', value);
        (/^\(\d{2}\) \d{4}-\d{4}$/).test(value) ? clearErrors('telefone') : setError('telefone', { message: 'Formato de telefone inválido' });
    }

    function maskCepInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
        setValue('cep', value);
        (/^\d{5}-\d{3}$/).test(value) ? clearErrors('cep') : setError('cep', { message: 'Formato de CEP inválido' });
    }

    function getCep(cep: string) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (response.data.cep) {
                    setValue('logradouro', response.data.logradouro);
                    setValue('cidade', response.data.localidade);
                    setValue('estado', response.data.estado);
                    setValue('bairro', response.data.bairro);

                    clearErrors('logradouro');
                    clearErrors('cidade');
                    clearErrors('estado');
                    clearErrors('bairro');
                }
            });
    }

    return (
        <>
            {isUserDataLoading
                ?
                <div className="w-full h-full flex items-center justify-center">
                    <CircularProgress size="50px" sx={{ color: "#5d5aff" }} />
                </div>
                :
                <form onSubmit={handleSubmit(updateUserData)} className="w-full h-full flex flex-col items-center justify-between">
                    <h2 className="text-center">Pretende atualizar seus dados? Atualize suas informações por aqui!</h2>

                    <div className="h-[360px] -mt-4 py-2 px-4 w-full overflow-x-hidden">
                        <h3 className="mb-5 flex items-center"><PersonIcon fontSize="small" /> <span className="mt-[2px] ml-1">Dados Pessoais</span></h3>

                        <div className="flex justify-between">
                            <div className="relative w-[236px]">
                                <label className="text-slate-400 text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10">Nome</label>
                                <input className="relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 border-zinc-600 placeholder:blue-gray p-2 pl-4 text-zinc-400" {...register("nome")} disabled />
                                <span className="absolute right-3 top-[10px] text-zinc-400 cursor-no-drop"><LockIcon /></span>
                            </div>

                            <div className="relative w-[236px]">
                                <label className="text-slate-400 text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10">Sobrenome</label>
                                <input className="relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 border-zinc-600 placeholder:blue-gray p-2 pl-4 text-zinc-400" {...register("sobrenome")} disabled />
                                <span className="absolute right-3 top-[10px] text-zinc-400 cursor-no-drop"><LockIcon /></span>
                            </div>
                        </div>

                        <div className="relative mt-5">
                            <label className="text-slate-400 text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10">E-mail</label>
                            <input className="relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 border-zinc-600 placeholder:blue-gray p-2 pl-4 text-zinc-400" {...register("email")} disabled />
                            <span className="absolute right-3 top-[10px] text-zinc-400 cursor-no-drop"><LockIcon /></span>
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
                                disabled={isLoading ? true : false}
                            />
                            {errors.nomeFantasia && <span className="text-white-gray text-sm ml-3 mt-2">{errors.nomeFantasia.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('telefone')}
                                placeholder="Telefone"
                                type="text"
                                maxLength={14}
                                id="inputTelefone"
                                name="telefone"
                                register={register}
                                onChange={(e: any) => { register('telefone').onChange(e), maskTelefoneInput(e), !isUserFormChanged && setUserFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.telefone && <span className="text-white-gray text-sm ml-3 mt-2">{errors.telefone.message}</span>}
                        </div>

                        <h3 className="my-5 flex items-center"><LocationOnIcon fontSize="small" /> <span className="mt-[2px] ml-1">Endereço Comercial</span></h3>

                        <div className="flex justify-between mt-5">
                            <div className="flex flex-col w-[236px]">
                                <Input.Modal
                                    onBlur={getCep}
                                    value={watch('cep')}
                                    placeholder="CEP"
                                    type="text"
                                    maxLength={9}
                                    id="inputCep"
                                    name="cep"
                                    register={register}
                                    onChange={(e: any) => { register('cep').onChange(e), maskCepInput(e), !isUserFormChanged && setUserFormChanged(true) }}
                                    disabled={isLoading ? true : false}
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
                                    disabled={isLoading ? true : false}
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
                                disabled={isLoading ? true : false}
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
                                    disabled={isLoading ? true : false}
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
                                    disabled={isLoading ? true : false}
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
                                disabled={isLoading ? true : false}
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
                                disabled={isLoading ? true : false}
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
        </>
    )
}