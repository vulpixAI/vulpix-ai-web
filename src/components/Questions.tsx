import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import { Button } from "./Button";

const stepOneFormSchema = z.object({
    sloganEmpresa: z.string().nullable(),
    descricaoEmpresa: z.string().min(1, "Campo obrigatório"),
    setorAtuacao: z.string().min(1, "Campo obrigatório"),
    anoFundacao: z.string().min(1, "Campo obrigatório"),
    logoEmpresa: z.string().min(1, "Campo obrigatório")
});

const stepTwoFormSchema = z.object({
    campo1: z.string().min(1, "Campo obrigatório"),
    campo2: z.string().min(1, "Campo obrigatório"),
    campo3: z.string().min(1, "Campo obrigatório"),
    campo4: z.string().min(1, "Campo obrigatório"),
    campo5: z.string().min(1, "Campo obrigatório")
});

const stepThreeFormSchema = z.object({
    campo6: z.string().min(1, "Campo obrigatório"),
    campo7: z.string().min(1, "Campo obrigatório"),
    campo8: z.string().min(1, "Campo obrigatório"),
    campo9: z.string().min(1, "Campo obrigatório"),
    campo10: z.string().min(1, "Campo obrigatório")
});

const stepFourFormSchema = z.object({
    campo11: z.string().min(1, "Campo obrigatório"),
    campo12: z.string().min(1, "Campo obrigatório"),
    campo13: z.string().min(1, "Campo obrigatório"),
    campo14: z.string().min(1, "Campo obrigatório"),
    campo15: z.string().min(1, "Campo obrigatório")
});

const stepFiveFormSchema = z.object({
    campo16: z.string().min(1, "Campo obrigatório"),
    campo17: z.string().min(1, "Campo obrigatório"),
    campo18: z.string().min(1, "Campo obrigatório"),
    campo19: z.string().min(1, "Campo obrigatório"),
    campo20: z.string().min(1, "Campo obrigatório")
});

const stepSixFormSchema = z.object({
    campo21: z.string().min(1, "Campo obrigatório"),
    campo22: z.string().min(1, "Campo obrigatório"),
    campo23: z.string().min(1, "Campo obrigatório"),
    campo24: z.string().min(1, "Campo obrigatório"),
    infoExtra: z.string().nullable()
});

type stepOneFormData = z.infer<typeof stepOneFormSchema>
type stepTwoFormData = z.infer<typeof stepTwoFormSchema>
type stepThreeFormData = z.infer<typeof stepThreeFormSchema>
type stepFourFormData = z.infer<typeof stepFourFormSchema>
type stepFiveFormData = z.infer<typeof stepFiveFormSchema>
type stepSixFormData = z.infer<typeof stepSixFormSchema>

export function Questions() {
    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<object[]>([]);

    const {
        register: registerStepOne,
        handleSubmit: handleSubmitStepOne,
        watch: watchStepOne,
        formState: { errors: stepOneErrors }
    } = useForm<stepOneFormData>({ resolver: zodResolver(stepOneFormSchema) });

    const {
        register: registerStepTwo,
        handleSubmit: handleSubmitStepTwo,
        watch: watchStepTwo,
        formState: { errors: stepTwoErrors }
    } = useForm<stepTwoFormData>({ resolver: zodResolver(stepTwoFormSchema) });

    const {
        register: registerStepThree,
        handleSubmit: handleSubmitStepThree,
        watch: watchStepThree,
        formState: { errors: stepThreeErrors }
    } = useForm<stepThreeFormData>({ resolver: zodResolver(stepThreeFormSchema) });

    const {
        register: registerStepFour,
        handleSubmit: handleSubmitStepFour,
        watch: watchStepFour,
        formState: { errors: stepFourErrors }
    } = useForm<stepFourFormData>({ resolver: zodResolver(stepFourFormSchema) });

    const {
        register: registerStepFive,
        handleSubmit: handleSubmitStepFive,
        watch: watchStepFive,
        formState: { errors: stepFiveErrors }
    } = useForm<stepFiveFormData>({ resolver: zodResolver(stepFiveFormSchema) });

    const {
        register: registerStepSix,
        handleSubmit: handleSubmitStepSix,
        watch: watchStepSix,
        formState: { errors: stepSixErrors }
    } = useForm<stepSixFormData>({ resolver: zodResolver(stepSixFormSchema) });


    function setPreviousStep() {
        step > 1 && setStep(step => step - 1);
        setFormData(data => data.slice(0, -1));
    }

    function setNextStep(data: any) {
        step < 6 && setStep(step => step + 1);
        if (step > 0 && step < 6) setFormData([...formData, data]);
    }

    async function sendForm(data: stepSixFormData) { }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex items-center absolute top-2 left-2 select-none">
                <img className="h-[4.5rem] pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                <h4 className="text-2xl text-white ml-[-8px] font-bold">vulpix.<span className="text-purple">AI</span></h4>
            </div>

            {step == 0

                ?

                <div className="text-white-gray flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-center">Estamos quase lá!</h1>
                    <p className="w-96 text-center my-8">Finalize a configuração de sua conta para garantir uma experiência mais precisa e personalizada. Isso permitirá que nossos serviços ofereçam ainda mais qualidade e eficiência para você.</p>
                    <Button.Input width="w-44" value="Próximo" type="button" onClick={() => setNextStep(null)} />
                </div>

                :

                <div className="w-[70%] text-white-gray">
                    <h4 className="mb-4">PASSO {step} DE 6</h4>
                    <h4>Alimente a IA com informações da sua empresa.</h4>

                    {step == 1 &&

                        <form onSubmit={handleSubmitStepOne(setNextStep)} className="mt-8">
                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepOne('sloganEmpresa')}
                                    placeholder="Digite o slogan de sua empresa"
                                    type="text"
                                    id="inputSloganEmpresa"
                                    name="sloganEmpresa"
                                    register={registerStepOne}
                                />
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepOne('descricaoEmpresa')}
                                    placeholder="Descreva brevemente sobre sua empresa*"
                                    type="text"
                                    id="inputDescricaoEmpresa"
                                    name="descricaoEmpresa"
                                    register={registerStepOne}
                                />
                                {stepOneErrors.descricaoEmpresa && <span className="text-white-gray text-sm ml-3 mt-2">{stepOneErrors.descricaoEmpresa.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepOne('setorAtuacao')}
                                    placeholder="Digite o setor de atuação*"
                                    type="text"
                                    id="inputSetorAtuacao"
                                    name="setorAtuacao"
                                    register={registerStepOne}
                                />
                                {stepOneErrors.setorAtuacao && <span className="text-white-gray text-sm ml-3 mt-2">{stepOneErrors.setorAtuacao.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepOne('anoFundacao')}
                                    placeholder="Digite o ano de fundação*"
                                    type="text"
                                    id="inputAnoFundacao"
                                    name="anoFundacao"
                                    register={registerStepOne}
                                />
                                {stepOneErrors.anoFundacao && <span className="text-white-gray text-sm ml-3 mt-2">{stepOneErrors.anoFundacao.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepOne('logoEmpresa')}
                                    placeholder="Descreva o visual do logotipo de sua empresa*"
                                    type="text"
                                    id="inputLogoEmpresa"
                                    name="logoEmpresa"
                                    register={registerStepOne}
                                />
                                {stepOneErrors.logoEmpresa && <span className="text-white-gray text-sm ml-3 mt-2">{stepOneErrors.logoEmpresa.message}</span>}
                            </div>

                            <div className="flex justify-between mt-8">
                                <p className="mr-24">Por favor, preencha as informações solicitadas sobre sua empresa. Esses dados são cruciais para personalizarmos nossos serviços eficazmente. Certifique-se de sua precisão.</p>
                                <div className="flex">
                                    <Button.Input width="w-44" value="Próximo" type="submit" />
                                </div>
                            </div>
                        </form>
                    }

                    {step == 2 &&

                        <form onSubmit={handleSubmitStepTwo(setNextStep)} className="mt-8">
                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepTwo('campo1')}
                                    placeholder="Exemplo campo 1"
                                    type="text"
                                    id=""
                                    name="campo1"
                                    register={registerStepTwo}
                                />
                                {stepTwoErrors.campo1 && <span className="text-white-gray text-sm ml-3 mt-2">{stepTwoErrors.campo1.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepTwo('campo2')}
                                    placeholder="Exemplo campo 2"
                                    type="text"
                                    id=""
                                    name="campo2"
                                    register={registerStepTwo}
                                />
                                {stepTwoErrors.campo2 && <span className="text-white-gray text-sm ml-3 mt-2">{stepTwoErrors.campo2.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepTwo('campo3')}
                                    placeholder="Exemplo campo 3"
                                    type="text"
                                    id=""
                                    name="campo3"
                                    register={registerStepTwo}
                                />
                                {stepTwoErrors.campo3 && <span className="text-white-gray text-sm ml-3 mt-2">{stepTwoErrors.campo3.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepTwo('campo4')}
                                    placeholder="Exemplo campo 4"
                                    type="text"
                                    id=""
                                    name="campo4"
                                    register={registerStepTwo}
                                />
                                {stepTwoErrors.campo4 && <span className="text-white-gray text-sm ml-3 mt-2">{stepTwoErrors.campo4.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepTwo('campo5')}
                                    placeholder="Exemplo campo 5"
                                    type="text"
                                    id=""
                                    name="campo5"
                                    register={registerStepTwo}
                                />
                                {stepTwoErrors.campo5 && <span className="text-white-gray text-sm ml-3 mt-2">{stepTwoErrors.campo5.message}</span>}
                            </div>

                            <div className="flex justify-between mt-8">
                                <p className="mr-24">Por favor, preencha as informações solicitadas sobre sua empresa. Esses dados são cruciais para personalizarmos nossos serviços eficazmente. Certifique-se de sua precisão.</p>

                                <div className="flex">
                                    <span className="mr-3"><Button.Transparent width="w-44" value="Voltar" type="button" onClick={setPreviousStep} /></span>
                                    <Button.Input width="w-44" value="Próximo" type="submit" />
                                </div>
                            </div>
                        </form>
                    }

                    {step == 3 &&

                        <form onSubmit={handleSubmitStepThree(setNextStep)} className="mt-8">
                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepThree('campo6')}
                                    placeholder="Exemplo campo 6"
                                    type="text"
                                    id=""
                                    name="campo6"
                                    register={registerStepThree}
                                />
                                {stepThreeErrors.campo6 && <span className="text-white-gray text-sm ml-3 mt-2">{stepThreeErrors.campo6.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepThree('campo7')}
                                    placeholder="Exemplo campo 7"
                                    type="text"
                                    id=""
                                    name="campo7"
                                    register={registerStepThree}
                                />
                                {stepThreeErrors.campo7 && <span className="text-white-gray text-sm ml-3 mt-2">{stepThreeErrors.campo7.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepThree('campo8')}
                                    placeholder="Exemplo campo 8"
                                    type="text"
                                    id=""
                                    name="campo8"
                                    register={registerStepThree}
                                />
                                {stepThreeErrors.campo8 && <span className="text-white-gray text-sm ml-3 mt-2">{stepThreeErrors.campo8.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepThree('campo9')}
                                    placeholder="Exemplo campo 9"
                                    type="text"
                                    id=""
                                    name="campo9"
                                    register={registerStepThree}
                                />
                                {stepThreeErrors.campo9 && <span className="text-white-gray text-sm ml-3 mt-2">{stepThreeErrors.campo9.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepThree('campo10')}
                                    placeholder="Exemplo campo 10"
                                    type="text"
                                    id=""
                                    name="campo10"
                                    register={registerStepThree}
                                />
                                {stepThreeErrors.campo10 && <span className="text-white-gray text-sm ml-3 mt-2">{stepThreeErrors.campo10.message}</span>}
                            </div>

                            <div className="flex justify-between mt-8">
                                <p className="mr-24">Por favor, preencha as informações solicitadas sobre sua empresa. Esses dados são cruciais para personalizarmos nossos serviços eficazmente. Certifique-se de sua precisão.</p>

                                <div className="flex">
                                    <span className="mr-3"><Button.Transparent width="w-44" value="Voltar" type="button" onClick={setPreviousStep} /></span>
                                    <Button.Input width="w-44" value="Próximo" type="submit" />
                                </div>
                            </div>
                        </form>
                    }

                    {step == 4 &&

                        <form onSubmit={handleSubmitStepFour(setNextStep)} className="mt-8">
                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFour('campo11')}
                                    placeholder="Exemplo campo 11"
                                    type="text"
                                    id=""
                                    name="campo11"
                                    register={registerStepFour}
                                />
                                {stepFourErrors.campo11 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFourErrors.campo11.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFour('campo12')}
                                    placeholder="Exemplo campo 12"
                                    type="text"
                                    id=""
                                    name="campo12"
                                    register={registerStepFour}
                                />
                                {stepFourErrors.campo12 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFourErrors.campo12.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFour('campo13')}
                                    placeholder="Exemplo campo 13"
                                    type="text"
                                    id=""
                                    name="campo13"
                                    register={registerStepFour}
                                />
                                {stepFourErrors.campo13 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFourErrors.campo13.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFour('campo14')}
                                    placeholder="Exemplo campo 14"
                                    type="text"
                                    id=""
                                    name="campo14"
                                    register={registerStepFour}
                                />
                                {stepFourErrors.campo14 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFourErrors.campo14.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFour('campo15')}
                                    placeholder="Exemplo campo 15"
                                    type="text"
                                    id=""
                                    name="campo15"
                                    register={registerStepFour}
                                />
                                {stepFourErrors.campo15 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFourErrors.campo15.message}</span>}
                            </div>

                            <div className="flex justify-between mt-8">
                                <p className="mr-24">Por favor, preencha as informações solicitadas sobre sua empresa. Esses dados são cruciais para personalizarmos nossos serviços eficazmente. Certifique-se de sua precisão.</p>

                                <div className="flex">
                                    <span className="mr-3"><Button.Transparent width="w-44" value="Voltar" type="button" onClick={setPreviousStep} /></span>
                                    <Button.Input width="w-44" value="Próximo" type="submit" />
                                </div>
                            </div>
                        </form>
                    }

                    {step == 5 &&

                        <form onSubmit={handleSubmitStepFive(setNextStep)} className="mt-8">
                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFive('campo16')}
                                    placeholder="Exemplo campo 16"
                                    type="text"
                                    id=""
                                    name="campo16"
                                    register={registerStepFive}
                                />
                                {stepFiveErrors.campo16 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFiveErrors.campo16.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFive('campo17')}
                                    placeholder="Exemplo campo 17"
                                    type="text"
                                    id=""
                                    name="campo17"
                                    register={registerStepFive}
                                />
                                {stepFiveErrors.campo17 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFiveErrors.campo17.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFive('campo18')}
                                    placeholder="Exemplo campo 18"
                                    type="text"
                                    id=""
                                    name="campo18"
                                    register={registerStepFive}
                                />
                                {stepFiveErrors.campo18 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFiveErrors.campo18.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFive('campo19')}
                                    placeholder="Exemplo campo 19"
                                    type="text"
                                    id=""
                                    name="campo19"
                                    register={registerStepFive}
                                />
                                {stepFiveErrors.campo19 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFiveErrors.campo19.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepFive('campo20')}
                                    placeholder="Exemplo campo 20"
                                    type="text"
                                    id=""
                                    name="campo20"
                                    register={registerStepFive}
                                />
                                {stepFiveErrors.campo20 && <span className="text-white-gray text-sm ml-3 mt-2">{stepFiveErrors.campo20.message}</span>}
                            </div>

                            <div className="flex justify-between mt-8">
                                <p className="mr-24">Por favor, preencha as informações solicitadas sobre sua empresa. Esses dados são cruciais para personalizarmos nossos serviços eficazmente. Certifique-se de sua precisão.</p>

                                <div className="flex">
                                    <span className="mr-3"><Button.Transparent width="w-44" value="Voltar" type="button" onClick={setPreviousStep} /></span>
                                    <Button.Input width="w-44" value="Próximo" type="submit" />
                                </div>
                            </div>
                        </form>
                    }

                    {step == 6 &&

                        <form onSubmit={handleSubmitStepSix(sendForm)} className="mt-8">
                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepSix('campo21')}
                                    placeholder="Exemplo campo 21"
                                    type="text"
                                    id=""
                                    name="campo21"
                                    register={registerStepSix}
                                />
                                {stepSixErrors.campo21 && <span className="text-white-gray text-sm ml-3 mt-2">{stepSixErrors.campo21.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepSix('campo22')}
                                    placeholder="Exemplo campo 22"
                                    type="text"
                                    id=""
                                    name="campo22"
                                    register={registerStepSix}
                                />
                                {stepSixErrors.campo22 && <span className="text-white-gray text-sm ml-3 mt-2">{stepSixErrors.campo22.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepSix('campo23')}
                                    placeholder="Exemplo campo 23"
                                    type="text"
                                    id=""
                                    name="campo23"
                                    register={registerStepSix}
                                />
                                {stepSixErrors.campo23 && <span className="text-white-gray text-sm ml-3 mt-2">{stepSixErrors.campo23.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepSix('campo24')}
                                    placeholder="Exemplo campo 24"
                                    type="text"
                                    id=""
                                    name="campo24"
                                    register={registerStepSix}
                                />
                                {stepSixErrors.campo24 && <span className="text-white-gray text-sm ml-3 mt-2">{stepSixErrors.campo24.message}</span>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <Input
                                    value={watchStepSix('infoExtra')}
                                    placeholder="Algo mais que gostaria de compartilhar para personalizar ainda mais as imagens?"
                                    type="text"
                                    id=""
                                    name="infoExtra"
                                    register={registerStepSix}
                                />
                            </div>

                            <div className="flex justify-between mt-8">
                                <p className="mr-24">Por favor, preencha as informações solicitadas sobre sua empresa. Esses dados são cruciais para personalizarmos nossos serviços eficazmente. Certifique-se de sua precisão.</p>

                                <div className="flex">
                                    <span className="mr-3"><Button.Transparent width="w-44" value="Voltar" type="button" onClick={setPreviousStep} /></span>
                                    <Button.Input width="w-44" value="Finalizar" type="submit" />
                                </div>
                            </div>
                        </form>
                    }
                </div>
            }
        </div>
    )
}