import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import { Input } from "../Input";
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
    password: z.string().min(8, "Mínimo de 8 caracteres"),
    confirmPassword: z.string().min(8, "Mínimo de 8 caracteres")
}).refine(data => data.password == data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
});

type PasswordFormData = z.infer<typeof passwordFormSchema>

export function Security({ isLoading, setLoading, setMessage, openSuccessModal, openErrorModal }: Security) {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PasswordFormData>({ resolver: zodResolver(passwordFormSchema) });

    const [isPasswordFormCompleted, setPasswordFormCompleted] = useState<boolean>(false);
    const [isPasswordFormChanged, setPasswordFormChanged] = useState<boolean>(false);

    useEffect(() => {
        if (watch('currentPassword') != "" && watch('password') != "" && watch('confirmPassword') != "") setPasswordFormCompleted(true);
    }, [watch('currentPassword'), watch('password'), watch('confirmPassword')]);

    return (
        <form onSubmit={handleSubmit(() => { })} className="w-full h-full flex flex-col items-center justify-between">
            <h2 className="text-center">Quer mudar sua senha? É aqui mesmo! Fácil, rápido e seguro. 🔒</h2>

            <div className="h-[360px] -mt-4 py-2 px-4 w-full overflow-x-hidden">
                <div className="flex flex-col">
                    <Input.Modal
                        value={watch('currentPassword')}
                        placeholder="Senha Atual"
                        type="text"
                        id="inputCurrentPassword"
                        name="currentPassword"
                        register={register}
                        onChange={(e: any) => { register('currentPassword').onChange(e), !isPasswordFormChanged && setPasswordFormChanged(true) }}
                        disabled={isLoading ? true : false}
                    />
                    {errors.currentPassword && <span className="text-white-gray text-sm ml-3 mt-2">{errors.currentPassword.message}</span>}
                </div>

                <div className="flex flex-col mt-5">
                    <Input.Modal
                        value={watch('password')}
                        placeholder="Nova Senha"
                        type="text"
                        id="inputPassword"
                        name="password"
                        register={register}
                        onChange={(e: any) => { register('password').onChange(e), !isPasswordFormChanged && setPasswordFormChanged(true) }}
                        disabled={isLoading ? true : false}
                    />
                    {errors.password && <span className="text-white-gray text-sm ml-3 mt-2">{errors.password.message}</span>}
                </div>

                <div className="flex flex-col mt-5">
                    <Input.Modal
                        value={watch('confirmPassword')}
                        placeholder="Confirmar Nova Senha"
                        type="text"
                        id="inputConfirmPassword"
                        name="confirmPassword"
                        register={register}
                        onChange={(e: any) => { register('confirmPassword').onChange(e), !isPasswordFormChanged && setPasswordFormChanged(true) }}
                        disabled={isLoading ? true : false}
                    />
                    {errors.confirmPassword && <span className="text-white-gray text-sm ml-3 mt-2">{errors.confirmPassword.message}</span>}
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