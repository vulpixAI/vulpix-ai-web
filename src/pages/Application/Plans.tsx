import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { LoadingScreen } from "../../components/LoadingScreen";
import CheckIcon from '@mui/icons-material/Check';
import useLastPage from "../../hooks/useLastPage";

export default function Plans() {
    useLastPage();

    const [step, setStep] = useState<number>(1);
    const [showLoadingScreen, setLoadingScreen] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoadingScreen(false), 3000);
    }, []);

    function setNextStep() {
        step < 2 && setStep(step => step + 1);
    }

    return (
        <>
            {showLoadingScreen
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

                            <h1 className="text-4xl mt-8">Escolha seu plano.</h1>

                            <ul className="my-10">
                                <li className="flex items-center"> <CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> Sem compromisso, cancele quando quiser.</li>
                                <li className="flex items-center my-4"> <CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> Marketing digital eficiente, por um preço acessível.</li>
                                <li className="flex items-start"> <CheckIcon sx={{ fontSize: 20, color: "#5d5aff", marginRight: 1 }} /> Aproveite as vantagens do vulpix.AI em todas as <br /> suas plataformas de venda.</li>
                            </ul>

                            <Button.Input value="Próximo" type="button" width="w-52" onClick={setNextStep} />
                        </div>
                    }

                    {
                        step == 2 &&

                        <div className="h-screen overflow-hidden flex flex-col justify-center items-center text-white-gray select-none">
                            <div className="flex flex-col items-center w-[1000px]">
                                <h1 className="text-4xl self-start">Escolha o melhor plano para você</h1>

                                <div className="flex mt-8">
                                    <div className="w-72 h-[360px] flex flex-col items-center border-solid border-purple border-2 rounded-[1.6rem]">
                                        <div className="h-1/4 flex flex-col items-center justify-center text-white-gray">
                                            <h3 className="text-white-gray text-2xl font-semibold tracking-wide">Mensal</h3>
                                        </div>

                                        <div className="h-1/2 px-10 flex flex-col items-center text-white-gray">
                                            <span>1x</span>
                                            <span className="text-3xl font-semibold "><span className="mr-1">R$</span>106,00</span>
                                            <span className="mt-1 text-sm">valor à vista</span>
                                        </div>

                                        <div className="h-1/4 flex items-start">
                                            <Button.Transparent value="Inscrever-se" type="button" width="w-44" />
                                        </div>
                                    </div>

                                    <div className="w-72 h-[360px] flex flex-col items-center border-solid border-purple border-2 rounded-[1.6rem] mx-16 mobile:mx-0 mobile:my-14">
                                        <div className="h-1/4 flex flex-col items-center justify-center text-white-gray">
                                            <h3 className=" text-2xl font-semibold tracking-wide">Trimestral</h3>
                                        </div>

                                        <div className="h-1/2 px-10 flex flex-col items-center text-white-gray">
                                            <span>3x</span>
                                            <span className="text-3xl font-semibold"><span className="mr-1">R$</span>95,40</span>
                                            <span className="mt-1 text-sm">à vista por R$286,20</span>
                                        </div>

                                        <div className="h-1/4 flex items-start">
                                            <Button.Transparent value="Inscrever-se" type="button" width="w-44" />
                                        </div>
                                    </div>

                                    <div className="w-72 h-[360px] flex flex-col items-center border-solid border-purple border-2 rounded-[1.6rem]">
                                        <div className="h-1/4 flex flex-col items-center justify-center text-white-gray">
                                            <h3 className="text-white-gray text-2xl font-semibold tracking-wide">Anual</h3>
                                        </div>

                                        <div className="h-1/2 px-10 flex flex-col items-center text-white-gray">
                                            <span>12x</span>
                                            <span className="text-3xl font-semibold"><span className="mr-1">R$</span>84,83</span>
                                            <span className="mt-1 text-sm">à vista por R$1018,20</span>
                                        </div>

                                        <div className="h-1/4 flex items-start">
                                            <Button.Transparent value="Inscrever-se" type="button" width="w-44" />
                                        </div>
                                    </div>
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
            }
        </>
    )
}