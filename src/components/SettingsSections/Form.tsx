import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import { Input } from "../Input";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

const formSchema = z.object({
    slogan: z.string().nullable(),
    descricao: z.string().min(1, "Campo obrigatório"),
    setor: z.string().min(1, "Campo obrigatório"),
    anoFundacao: z.string().min(1, "Campo obrigatório"),
    logotipo: z.string().min(1, "Campo obrigatório"),
    cor: z.string().min(1, "Campo obrigatório"),
    fonte: z.string().min(1, "Campo obrigatório"),
    estiloVisual: z.string().min(1, "Campo obrigatório"),
    publicoAlvo: z.string().min(1, "Campo obrigatório"),
    problemasQueResolve: z.string().min(1, "Campo obrigatório"),
    expectativaDoCliente: z.string().min(1, "Campo obrigatório"),
    produtoEmpresa: z.string().min(1, "Campo obrigatório"),
    diferencialSolucao: z.string().min(1, "Campo obrigatório"),
    concorrentes: z.string().min(1, "Campo obrigatório"),
    pontosFortes: z.string().min(1, "Campo obrigatório"),
    desafiosEnfrentados: z.string().min(1, "Campo obrigatório"),
    redesSociais: z.string().min(1, "Campo obrigatório"),
    tonalidadeComunicacao: z.string().min(1, "Campo obrigatório"),
    tiposConteudo: z.string().min(1, "Campo obrigatório"),
    objetivoMarketing: z.string().min(1, "Campo obrigatório"),
    resultadosEsperados: z.string().min(1, "Campo obrigatório"),
    datasImportantes: z.string().min(1, "Campo obrigatório"),
    estiloCriativos: z.string().min(1, "Campo obrigatório"),
    referenciasVisuais: z.string().min(1, "Campo obrigatório"),
    observacoesGerais: z.string().nullable()
});

type FormData = z.infer<typeof formSchema>

interface Form {
    isLoading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setMessage: Dispatch<SetStateAction<string>>,
    openSuccessModal: () => void,
    openErrorModal: () => void
}

export function Form({ isLoading, setLoading, setMessage, openSuccessModal, openErrorModal }: Form) {
    const { register, handleSubmit, watch, setValue, clearErrors, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const [isFormDataLoading, setFormDataLoading] = useState<boolean>(true);
    const [isFormChanged, setFormChanged] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/empresas/form`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            clearErrors();
            setValue('slogan', response.data.slogan);
            setValue('descricao', response.data.descricao);
            setValue('setor', response.data.setor);
            setValue('anoFundacao', response.data.anoFundacao);
            setValue('logotipo', response.data.logotipo);
            setValue('cor', response.data.corPrimaria);
            setValue('fonte', response.data.fonte);
            setValue('estiloVisual', response.data.estiloVisual);
            setValue('publicoAlvo', response.data.publicoAlvo);
            setValue('problemasQueResolve', response.data.problemasQueResolve);
            setValue('expectativaDoCliente', response.data.expectativaDoCliente);
            setValue('produtoEmpresa', response.data.produtoEmpresa);
            setValue('diferencialSolucao', response.data.diferencialSolucao);
            setValue('concorrentes', response.data.concorrentes);
            setValue('pontosFortes', response.data.pontosFortes);
            setValue('desafiosEnfrentados', response.data.desafiosEnfrentados);
            setValue('redesSociais', response.data.redesSociais);
            setValue('tonalidadeComunicacao', response.data.tonalidadeComunicacao);
            setValue('tiposConteudo', response.data.tiposConteudo);
            setValue('objetivoMarketing', response.data.objetivoMarketing);
            setValue('resultadosEsperados', response.data.resultadosEsperados);
            setValue('datasImportantes', response.data.datasImportantes);
            setValue('estiloCriativos', response.data.estiloCriativos);
            setValue('referenciasVisuais', response.data.referenciasVisuais);
            setValue('observacoesGerais', response.data.observacoesGerais);
            setFormDataLoading(false);
        })
    }, []);

    async function updateFormData(data: FormData) {
        const payload = {
            slogan: data.slogan,
            descricao: data.descricao,
            setor: data.setor,
            anoFundacao: data.anoFundacao,
            logotipo: data.logotipo,
            corPrimaria: data.cor,
            fonte: data.fonte,
            estiloVisual: data.estiloVisual,
            publicoAlvo: data.publicoAlvo,
            problemasQueResolve: data.problemasQueResolve,
            expectativaDoCliente: data.expectativaDoCliente,
            produtoEmpresa: data.produtoEmpresa,
            diferencialSolucao: data.diferencialSolucao,
            concorrentes: data.concorrentes,
            pontosFortes: data.pontosFortes,
            desafiosEnfrentados: data.desafiosEnfrentados,
            redesSociais: data.redesSociais,
            tonalidadeComunicacao: data.tonalidadeComunicacao,
            tiposConteudo: data.tiposConteudo,
            objetivoMarketing: data.objetivoMarketing,
            resultadosEsperados: data.resultadosEsperados,
            datasImportantes: data.datasImportantes,
            estiloCriativos: data.estiloCriativos,
            referenciasVisuais: data.referenciasVisuais,
            observacoesGerais: data.observacoesGerais
        }

        setLoading(true);

        await axios.put(`${import.meta.env.VITE_API_URL}/empresas/form`, payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(() => {
            setMessage("Alteração realizada com sucesso! 🚀");
            setFormChanged(false);
            openSuccessModal();
        }).catch(() => {
            setMessage("Houve um problema ao realizar a atualização do formulário.");
            openErrorModal();
        });

        setLoading(false);
    }

    return (
        <>
            {isFormDataLoading
                ?
                <div className="w-full h-full flex items-center justify-center">
                    <CircularProgress size="50px" sx={{ color: "#5d5aff" }} />
                </div>
                :
                <form onSubmit={handleSubmit(updateFormData)} className="w-full h-full flex flex-col items-center justify-between">
                    <h2 className="text-center">Deseja atualizar o formulário? Faça suas alterações por aqui! ✏️</h2>

                    <div className="h-[360px] -mt-4 py-2 px-4 w-full overflow-x-hidden">
                        <div className="flex flex-col">
                            <Input.Modal
                                value={watch('slogan')}
                                placeholder="Slogan da empresa"
                                type="text"
                                id="inputSlogan"
                                name="slogan"
                                register={register}
                                onChange={(e: any) => { register('slogan').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('descricao')}
                                placeholder="Breve descrição da empresa"
                                type="text"
                                id="inputDescricao"
                                name="descricao"
                                register={register}
                                onChange={(e: any) => { register('descricao').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.descricao && <span className="text-white-gray text-sm ml-3 mt-2">{errors.descricao.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('setor')}
                                placeholder="Setor de atuação da empresa"
                                type="text"
                                id="inputSetor"
                                name="setor"
                                register={register}
                                onChange={(e: any) => { register('setor').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.setor && <span className="text-white-gray text-sm ml-3 mt-2">{errors.setor.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('anoFundacao')}
                                placeholder="Ano de fundação da empresa"
                                type="text"
                                id="inputAnoFundacao"
                                name="anoFundacao"
                                register={register}
                                onChange={(e: any) => { register('anoFundacao').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.anoFundacao && <span className="text-white-gray text-sm ml-3 mt-2">{errors.anoFundacao.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('logotipo')}
                                placeholder="Descrição do visual do logotipo da empresa"
                                type="text"
                                id="inputLogotipo"
                                name="logotipo"
                                register={register}
                                onChange={(e: any) => { register('logotipo').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.logotipo && <span className="text-white-gray text-sm ml-3 mt-2">{errors.logotipo.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('cor')}
                                placeholder="Cores utilizadas pela empresa"
                                type="text"
                                id="inputCor"
                                name="cor"
                                register={register}
                                onChange={(e: any) => { register('cor').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.cor && <span className="text-white-gray text-sm ml-3 mt-2">{errors.cor.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('fonte')}
                                placeholder="Fonte utilizada pela empresa"
                                type="text"
                                id="inputFonte"
                                name="fonte"
                                register={register}
                                onChange={(e: any) => { register('fonte').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.fonte && <span className="text-white-gray text-sm ml-3 mt-2">{errors.fonte.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('estiloVisual')}
                                placeholder="Estilo visual utilizado pela empresa"
                                type="text"
                                id="inputEstiloVisual"
                                name="estiloVisual"
                                register={register}
                                onChange={(e: any) => { register('estiloVisual').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.estiloVisual && <span className="text-white-gray text-sm ml-3 mt-2">{errors.estiloVisual.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('publicoAlvo')}
                                placeholder="Público alvo da empresa"
                                type="text"
                                id="inputPublicoAlvo"
                                name="publicoAlvo"
                                register={register}
                                onChange={(e: any) => { register('publicoAlvo').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.publicoAlvo && <span className="text-white-gray text-sm ml-3 mt-2">{errors.publicoAlvo.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('problemasQueResolve')}
                                placeholder="Problemas que a empresa resolve"
                                type="text"
                                id="inputProblemasQueResolve"
                                name="problemasQueResolve"
                                register={register}
                                onChange={(e: any) => { register('problemasQueResolve').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.problemasQueResolve && <span className="text-white-gray text-sm ml-3 mt-2">{errors.problemasQueResolve.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('expectativaDoCliente')}
                                placeholder="Expectativas do cliente"
                                type="text"
                                id="inputExpectativaDoCliente"
                                name="expectativaDoCliente"
                                register={register}
                                onChange={(e: any) => { register('expectativaDoCliente').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.expectativaDoCliente && <span className="text-white-gray text-sm ml-3 mt-2">{errors.expectativaDoCliente.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('produtoEmpresa')}
                                placeholder="Produtos da empresa"
                                type="text"
                                id="inputProdutoEmpresa"
                                name="produtoEmpresa"
                                register={register}
                                onChange={(e: any) => { register('produtoEmpresa').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.produtoEmpresa && <span className="text-white-gray text-sm ml-3 mt-2">{errors.produtoEmpresa.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('diferencialSolucao')}
                                placeholder="Diferencial da solução da empresa"
                                type="text"
                                id="inputDiferencialSolucao"
                                name="diferencialSolucao"
                                register={register}
                                onChange={(e: any) => { register('diferencialSolucao').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.diferencialSolucao && <span className="text-white-gray text-sm ml-3 mt-2">{errors.diferencialSolucao.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('concorrentes')}
                                placeholder="Concorrentes da empresa"
                                type="text"
                                id="inputConcorrentes"
                                name="concorrentes"
                                register={register}
                                onChange={(e: any) => { register('concorrentes').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.concorrentes && <span className="text-white-gray text-sm ml-3 mt-2">{errors.concorrentes.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('pontosFortes')}
                                placeholder="Pontos fortes da empresa"
                                type="text"
                                id="inputPontosFortes"
                                name="pontosFortes"
                                register={register}
                                onChange={(e: any) => { register('pontosFortes').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.pontosFortes && <span className="text-white-gray text-sm ml-3 mt-2">{errors.pontosFortes.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('desafiosEnfrentados')}
                                placeholder="Desafios que são enfrentados pela empresa"
                                type="text"
                                id="inputDesafiosEnfrentados"
                                name="desafiosEnfrentados"
                                register={register}
                                onChange={(e: any) => { register('desafiosEnfrentados').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.desafiosEnfrentados && <span className="text-white-gray text-sm ml-3 mt-2">{errors.desafiosEnfrentados.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('redesSociais')}
                                placeholder="Redes sociais que a empresa utiliza"
                                type="text"
                                id="inputRedesSociais"
                                name="redesSociais"
                                register={register}
                                onChange={(e: any) => { register('redesSociais').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.redesSociais && <span className="text-white-gray text-sm ml-3 mt-2">{errors.redesSociais.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('tonalidadeComunicacao')}
                                placeholder="Tom de comunicação da empresa"
                                type="text"
                                id="inputTonalidadeComunicacao"
                                name="tonalidadeComunicacao"
                                register={register}
                                onChange={(e: any) => { register('tonalidadeComunicacao').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.tonalidadeComunicacao && <span className="text-white-gray text-sm ml-3 mt-2">{errors.tonalidadeComunicacao.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('tiposConteudo')}
                                placeholder="Tipos de conteúdos criados"
                                type="text"
                                id="inputTiposConteudo"
                                name="tiposConteudo"
                                register={register}
                                onChange={(e: any) => { register('tiposConteudo').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.tiposConteudo && <span className="text-white-gray text-sm ml-3 mt-2">{errors.tiposConteudo.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('objetivoMarketing')}
                                placeholder="Objetivo de marketing da empresa"
                                type="text"
                                id="inputObjetivoMarketing"
                                name="objetivoMarketing"
                                register={register}
                                onChange={(e: any) => { register('objetivoMarketing').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.objetivoMarketing && <span className="text-white-gray text-sm ml-3 mt-2">{errors.objetivoMarketing.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('resultadosEsperados')}
                                placeholder="Resultados esperados pela empresa"
                                type="text"
                                id=""
                                name="resultadosEsperados"
                                register={register}
                                onChange={(e: any) => { register('resultadosEsperados').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.resultadosEsperados && <span className="text-white-gray text-sm ml-3 mt-2">{errors.resultadosEsperados.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('datasImportantes')}
                                placeholder="Datas que a empresa considera importante"
                                type="text"
                                id="inputDatasImportantes"
                                name="datasImportantes"
                                register={register}
                                onChange={(e: any) => { register('datasImportantes').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.datasImportantes && <span className="text-white-gray text-sm ml-3 mt-2">{errors.datasImportantes.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('estiloCriativos')}
                                placeholder="Estilo de imagens preferidas"
                                type="text"
                                id="inputEstiloCriativos"
                                name="estiloCriativos"
                                register={register}
                                onChange={(e: any) => { register('estiloCriativos').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.estiloCriativos && <span className="text-white-gray text-sm ml-3 mt-2">{errors.estiloCriativos.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('referenciasVisuais')}
                                placeholder="Referências visuais da empresa"
                                type="text"
                                id="inputReferenciasVisuais"
                                name="referenciasVisuais"
                                register={register}
                                onChange={(e: any) => { register('referenciasVisuais').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.referenciasVisuais && <span className="text-white-gray text-sm ml-3 mt-2">{errors.referenciasVisuais.message}</span>}
                        </div>

                        <div className="flex flex-col mt-5">
                            <Input.Modal
                                value={watch('observacoesGerais')}
                                placeholder="Observações gerais"
                                type="text"
                                id="inputObservacoesGerais"
                                name="observacoesGerais"
                                register={register}
                                onChange={(e: any) => { register('observacoesGerais').onChange(e), !isFormChanged && setFormChanged(true) }}
                                disabled={isLoading ? true : false}
                            />
                            {errors.observacoesGerais && <span className="text-white-gray text-sm ml-3 mt-2">{errors.observacoesGerais.message}</span>}
                        </div>
                    </div>

                    <div className="flex items-end justify-end w-full">
                        <Button.Purple type="submit" width="w-44" disabled={(isFormChanged && !isLoading) ? false : true}>
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