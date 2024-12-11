import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import { Input } from "../Input";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

interface Security {
    isLoading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setMessage: Dispatch<SetStateAction<string>>,
    openSuccessModal: () => void,
    openErrorModal: () => void
}

const passwordFormSchema = z.object({
    currentPassword: z.string().min(8, "Mínimo de 8 caracteres"),
    newPassword: z.string().min(8, "Mínimo de 8 caracteres"),
    confirmNewPassword: z.string().min(8, "Mínimo de 8 caracteres")
}).refine(data => data.newPassword == data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"]
});

type PasswordFormData = z.infer<typeof passwordFormSchema>

export function Security({ isLoading, setLoading, setMessage, openSuccessModal, openErrorModal }: Security) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PasswordFormData>({ resolver: zodResolver(passwordFormSchema) });

    const [isPasswordFormCompleted, setPasswordFormCompleted] = useState<boolean>(false);
    const [isPasswordFormChanged, setPasswordFormChanged] = useState<boolean>(false);

    const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState<boolean>(false);
    const [isNewPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
    const [isConfirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
        if (watch('currentPassword') != "" && watch('newPassword') != "" && watch('confirmNewPassword') != "") setPasswordFormCompleted(true);
    }, [watch('currentPassword'), watch('newPassword'), watch('confirmNewPassword')]);

    async function updatePassword(data: PasswordFormData) {
        const payload = {
            senhaAtual: data.currentPassword,
            novaSenha: data.newPassword
        }

        setLoading(true);

        await axios.patch(`${import.meta.env.VITE_API_URL}/usuarios/senha`, payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(() => {
            reset();
            setMessage("Senha atualizada com sucesso! 🚀");
            openSuccessModal();
        }).catch((err) => {
            if (err.response) {
                err.response.status == 401 && setMessage("Senha atual incorreta.");
            } else {
                setMessage("Houve um problema ao realizar a atualização da senha.")
            }
            openErrorModal();
        })

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(updatePassword)} className="w-full h-full flex flex-col items-center justify-between">
            <h2 className="text-center">Quer mudar sua senha? É aqui mesmo! Fácil, rápido e seguro.</h2>

            <div className="h-[360px] -mt-4 py-2 px-4 w-full overflow-x-hidden">
                <div className="flex flex-col relative">
                    <Input.Modal
                        value={watch('currentPassword')}
                        placeholder="Senha Atual"
                        type={isCurrentPasswordVisible ? "text" : "password"}
                        id="inputCurrentPassword"
                        name="currentPassword"
                        register={register}
                        onChange={(e: any) => { register('currentPassword').onChange(e), !isPasswordFormChanged && setPasswordFormChanged(true) }}
                        disabled={isLoading ? true : false}
                        hasIcon
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[10px] text-white-gray cursor-pointer"
                        onClick={() => setCurrentPasswordVisible(prevState => !prevState)}
                        tabIndex={-1}
                    >
                        {isCurrentPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </button>
                    {errors.currentPassword && <span className="text-white-gray text-sm ml-3 mt-2">{errors.currentPassword.message}</span>}
                </div>

                <div className="flex flex-col mt-5 relative">
                    <Input.Modal
                        value={watch('newPassword')}
                        placeholder="Nova Senha"
                        type={isNewPasswordVisible ? "text" : "password"}
                        id="inputNewPassword"
                        name="newPassword"
                        register={register}
                        onChange={(e: any) => { register('newPassword').onChange(e), !isPasswordFormChanged && setPasswordFormChanged(true) }}
                        disabled={isLoading ? true : false}
                        hasIcon
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[10px] text-white-gray cursor-pointer"
                        onClick={() => setNewPasswordVisible(prevState => !prevState)}
                        tabIndex={-1}
                    >
                        {isNewPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </button>
                    {errors.newPassword && <span className="text-white-gray text-sm ml-3 mt-2">{errors.newPassword.message}</span>}
                </div>

                <div className="flex flex-col mt-5 relative">
                    <Input.Modal
                        value={watch('confirmNewPassword')}
                        placeholder="Confirmar Nova Senha"
                        type={isConfirmNewPasswordVisible ? "text" : "password"}
                        id="inputConfirmNewPassword"
                        name="confirmNewPassword"
                        register={register}
                        onChange={(e: any) => { register('confirmNewPassword').onChange(e), !isPasswordFormChanged && setPasswordFormChanged(true) }}
                        disabled={isLoading ? true : false}
                        hasIcon
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[10px] text-white-gray cursor-pointer"
                        onClick={() => setConfirmNewPasswordVisible(prevState => !prevState)}
                        tabIndex={-1}
                    >
                        {isConfirmNewPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </button>
                    {errors.confirmNewPassword && <span className="text-white-gray text-sm ml-3 mt-2">{errors.confirmNewPassword.message}</span>}
                </div>
            </div>

            <div className="flex items-end justify-end w-full">
                <Button.Purple type="submit" width="w-44" disabled={(isPasswordFormCompleted && !isLoading) ? false : true}>
                    {isLoading
                        ? <CircularProgress size="24px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                        : "Salvar Alterações"
                    }
                </Button.Purple>
            </div>
        </form>
    )
}