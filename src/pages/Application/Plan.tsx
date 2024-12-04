import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { LoadingScreen } from "../../components/LoadingScreen";
import { Modal } from "../../components/Modal";
import CheckIcon from '@mui/icons-material/Check';
import UseAuth from "../../hooks/useAuth";
import NotFound from "../NotFound";
import axios from "axios";
import useWebSocket from "react-use-websocket";

export default function Plan() {
    const navigate = useNavigate();
    const { userData, setUserData }: any = UseAuth();
    // const { lastMessage, readyState } = useWebSocket("");

    const [step, setStep] = useState<number>(1);
    const [isCorrectStatus, setCorrectStatus] = useState<boolean>(false);
    const [showLoadingScreen, setLoadingScreen] = useState<boolean>(true);
    const [isPlanAccessed, setPlanAccessed] = useState<boolean>(false);

    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const openSuccessModal = () => setSuccessModalOpen(true);
    const closeSuccessModal = () => { setSuccessModalOpen(false), navigate("/form") }

    useEffect(() => {
        userData.status == "AGUARDANDO_PAGAMENTO" && setCorrectStatus(true);
        setTimeout(() => setLoadingScreen(false), 3000);
    }, []);

    useEffect(() => {
        userData.status == "AGUARDANDO_FORMULARIO" && openSuccessModal();
    }, [userData]);

    useEffect(() => {
        if (!isPlanAccessed) return;

        async function getUserData() {
            await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
                }
            }).then(response => {
                sessionStorage.setItem("userData", JSON.stringify(response.data));
                setUserData(response.data);
            });
        }

        const intervalId = setInterval(getUserData, 5000);
        getUserData();
        return () => clearInterval(intervalId);
    }, [isPlanAccessed]);

    function setNextStep() {
        step < 2 && setStep(step => step + 1);
    }

    return (
        <>
            {isCorrectStatus
                ?
                showLoadingScreen
                    ?
                    <LoadingScreen />
                    :
                    <>
                        <div className="flex items-center absolute top-2 left-2 select-none">
                            <img className="h-[4.5rem] pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                            <h4 className="text-2xl text-white ml-[-8px] font-bold">vulpix.<span className="text-purple">AI</span></h4>
                        </div>

                        {
                            step == 1 &&

                            <div className="h-screen overflow-hidden flex flex-col justify-center items-center text-white-gray">

                                <div className="flex justify-center items-center text-purple border-solid border-2 border-purple rounded-full p-3"><CheckIcon /></div>

                                <h1 className="text-4xl mt-8">Escolha seu plano</h1>

                                <ul className="my-10">
                                    <li className="flex items-center"> <CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> Sem compromisso, cancele quando quiser.</li>
                                    <li className="flex items-center my-4"> <CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> Marketing digital eficiente, por um preço acessível.</li>
                                    <li className="flex items-start"> <CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> Aproveite as vantagens do vulpix.AI em todas as <br /> suas plataformas de venda.</li>
                                </ul>

                                <Button.Purple type="button" width="w-52" onClick={setNextStep}>Próximo</Button.Purple>
                            </div>
                        }

                        {
                            step == 2 &&

                            <div className="h-screen overflow-hidden flex flex-col justify-center items-center text-white-gray select-none">
                                <div className="flex flex-col items-center w-[1000px]">
                                    <h1 className="text-4xl self-start">Escolha o melhor plano para você</h1>

                                    <div className="flex mt-8">
                                        <a onClick={() => setPlanAccessed(true)} href="https://buy.stripe.com/test_8wMfZS8Tu9eQ3PW8wz" target="_blank" className="hover:scale-[1.02] transition-transform cursor-pointer">
                                            <div className="w-[300px] h-[360px] flex flex-col items-center justify-between border-solid border-white border-2 rounded-[1.6rem]">
                                                <div className="h-1/5 flex flex-col items-start justify-end text-white-gray w-full px-8">
                                                    <h4 className="text-white-gray text-lg font-semibold tracking-wide">Standard</h4>
                                                    <p className="text-xs">Essencial para Começar</p>
                                                </div>

                                                <div className="self-center w-4/5 h-[2px] bg-purple my-4"></div>

                                                <div className="h-[64%] px-8 flex flex-col items-start text-white-gray w-full">
                                                    <h3 className="flex"><span className="text-xs mt-2 mr-[2px]">$</span><span className="text-xl font-bold">15,00</span><span className="text-xs mt-2 ml-1">por mês</span></h3>
                                                    <ul className="mt-4">
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Geração de Criativos com IA</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Dashboard com Métricas</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Suporte Básico</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </a>

                                        <a onClick={() => setPlanAccessed(true)} href="https://buy.stripe.com/test_fZe3d6edOfDe5Y49AE" target="_blank" className="hover:scale-[1.02] transition-transform cursor-pointer">
                                            <div className="w-[300px] h-[360px] flex flex-col items-center justify-between border-solid border-white border-2 rounded-[1.6rem] mx-12">
                                                <div className="h-1/5 flex flex-col items-start justify-end text-white-gray w-full px-8">
                                                    <h4 className="text-white-gray text-lg font-semibold tracking-wide">Premium</h4>
                                                    <p className="text-xs">Ideal para Expansão</p>
                                                </div>

                                                <div className="self-center w-4/5 h-[2px] bg-purple my-4"></div>

                                                <div className="h-[64%] px-8 flex flex-col items-start text-white-gray w-full">
                                                    <h3 className="flex"><span className="text-xs mt-2 mr-[2px]">$</span><span className="text-xl font-bold">20,00</span><span className="text-xs mt-2 ml-1">por mês</span></h3>
                                                    <ul className="mt-4">
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Tudo do plano mais Standard:</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Integração com Redes Sociais</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Acesso ao App</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Suporte Prioritário</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </a>

                                        <a onClick={() => setPlanAccessed(true)} href="https://buy.stripe.com/test_4gwcNG9XygHi3PW4gl" target="_blank" className="hover:scale-[1.02] transition-transform cursor-pointer">
                                            <div className="w-[300px] h-[360px] flex flex-col items-center justify-between border-solid border-white border-2 rounded-[1.6rem]">
                                                <div className="h-1/5 flex flex-col items-start justify-end text-white-gray w-full px-8">
                                                    <h4 className="text-white-gray text-lg font-semibold tracking-wide">Business</h4>
                                                    <p className="text-xs">Completo e Personalizado</p>
                                                </div>

                                                <div className="self-center w-4/5 h-[2px] bg-purple my-4"></div>

                                                <div className="h-[64%] px-8 flex flex-col items-start text-white-gray w-full">
                                                    <h3 className="flex"><span className="text-xs mt-2 mr-[2px]">$</span><span className="text-xl font-bold">25,00</span><span className="text-xs mt-2 ml-1">por mês</span></h3>
                                                    <ul className="mt-4">
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Tudo do plano mais Premium:</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Agendamento de Postagens</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Exportação de Dados CSV</span></li>
                                                        <li className="my-1"><CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> <span className="text-sm">Suporte Dedicado</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="text-sm mt-8 ">
                                        <p>Descubra nossos planos mensais e escolha a melhor opção para seu negócio. Com a vulpix.AI, você pode cancelar a qualquer momento, sem compromisso.</p>
                                        <p className="my-4">Aproveite a flexibilidade de gerenciar seu marketing digital com uma solução que se adapta às necessidades do seu e-commerce. Conheça mais sobre como nossos serviços podem ajudar seu negócio a crescer, conferindo nossos <span className="text-purple cursor-pointer">Termos de Uso</span>.</p>
                                        <p>Adicione colaboradores conforme necessário para maximizar seu alcance e eficiência.</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                :
                <NotFound />
            }

            <Modal.Info children="Pagamento realizado com sucesso!" onConfirm={closeSuccessModal} isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
        </>
    )
}