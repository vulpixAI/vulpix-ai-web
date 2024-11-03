import { useState, useEffect, FormEvent } from "react";
import { Skeleton } from "@mui/material";
import { Menu } from "../../components/Menu";
import { TypeAnimation } from 'react-type-animation';
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import useLastPage from "../../hooks/useLastPage";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import CircularProgress from '@mui/material/CircularProgress';

interface ImageResponse {
    image1: string,
    image2: string,
    image3: string,
    image4: string
}

export default function Creative() {
    useLastPage();

    const [step, setStep] = useState<number>(1);

    const [images, setImages] = useState<Partial<ImageResponse>>({});

    const [prompt, setPrompt] = useState<string>("");
    const [isSubmit, setSubmit] = useState<boolean>(false);
    const [isGenerating, setGenerating] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>("");

    const [isRequestingSubtitleApi, setRequestingSubtitleApi] = useState<boolean>(false);
    const [isGeneratingSubtitle, setGeneratingSubtitle] = useState<boolean>(false);
    const [subtitle, setSubtitle] = useState<string>("");

    const [isPublishing, setPublishing] = useState<boolean>(false);

    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const openSuccessModal = () => setSuccessModalOpen(true);
    const closeSuccessModal = () => {
        setImages({});
        setPrompt("");
        setSubmit(false);
        setSelectedImage("");
        setSubtitle("");
        setStep(1);
        setSuccessModalOpen(false);
    }

    const interactiveMessages = ["O que sua imaginação está pedindo agora?", "Pronto para criar algo incrível?", "O que vamos criar juntos hoje?", "Ideia na cabeça? Vamos transformar em imagem!", "Qual é o projeto da vez?", "Digite sua ideia... Vamos criar!"];

    useEffect(() => {
        setTimeout(() => setGenerating(false), 5000);
    }, [isGenerating]);

    useEffect(() => {
        setTimeout(() => setRequestingSubtitleApi(false), 2500);
    }, [isRequestingSubtitleApi]);

    async function generateImage(event: FormEvent) {
        event.preventDefault();

        const validInputRegex = /^(?!\s*$)(?!\s).+/;
        if (!validInputRegex.test(prompt)) return;

        setPrompt("");
        setSubmit(true);
        setGenerating(true);
    }

    async function generateSubtitle() {
        setRequestingSubtitleApi(true);
        setGeneratingSubtitle(true);

        setSubtitle("");
    }

    async function publish() {
        setPublishing(true);


        setTimeout(() => {
            openSuccessModal();
            setPublishing(false);
        }, 3000);
    }

    const setPreviousStep = () => step > 1 && setStep(step => step - 1);
    const setNextStep = () => step < 3 && setStep(step => step + 1);

    return (
        <div className="h-screen">
            <Menu>
                <div>
                    <div className="flex items-center flex-col h-full">
                        <div className={`absolute z-20 top-[50%] -translate-y-[50%] pt-16 ${isSubmit && "-mt-48"} ${step == 1 ? "translate-x-0 opacity-100 ease-in-out duration-700" : "translate-x-60 opacity-0 pointer-events-none"}`}>
                            <h1 className={`text-white-gray text-3xl font-medium mb-6 ${isSubmit && "hidden"} text-center`}>
                                <TypeAnimation
                                    sequence={[interactiveMessages[Math.floor(Math.random() * interactiveMessages.length)]]}
                                    speed={70}
                                    repeat={1}
                                    cursor={false}
                                />
                            </h1>

                            <form onSubmit={generateImage} className="relative w-[1220px] mb-8">
                                <input type="text" className="outline-none w-full h-14 rounded-xl bg-dark-gray p-2 pl-4 pr-16 text-blue-gray placeholder:text-zinc-500" placeholder="Digite aqui seu prompt..." onChange={(e: any) => setPrompt(e.target.value)} value={prompt} />
                                <button type="submit" className="absolute right-3 top-2 flex items-center justify-center w-10 h-10 text-white-gray bg-purple rounded-xl hover:bg-purple-dark transition-all" disabled={isGenerating ? true : false}>
                                    {isGenerating
                                        ? <CircularProgress size="18px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                        : <AutoAwesomeOutlinedIcon />
                                    }
                                </button>
                            </form>
                        </div>

                        <div className={`absolute flex flex-col ease-in-out duration-700 delay-150 pt-16 ${isSubmit ? "opacity-100 top-[50%] -translate-y-[50%]" : "opacity-0 pointer-events-none"} ${step >= 2 && "translate-x-60 !opacity-0 transition-none"}`}>
                            {isGenerating
                                ?
                                <div className="flex">
                                    <Skeleton
                                        sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                        variant="rectangular"
                                        width={280}
                                        height={240}
                                    />

                                    <Skeleton
                                        sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                        variant="rectangular"
                                        width={280}
                                        height={240}
                                    />

                                    <Skeleton
                                        sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                        variant="rectangular"
                                        width={280}
                                        height={240}
                                    />

                                    <Skeleton
                                        sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                        variant="rectangular"
                                        width={280}
                                        height={240}
                                    />
                                </div>
                                :
                                <div className="">
                                    <div className="flex">
                                        <button className="mx-4" onClick={(e: any) => setSelectedImage(e.target.src)}>
                                            <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${images.image1 == selectedImage ? "border-purple" : "border-transparent"}`} src={images.image1} />
                                        </button>

                                        <button className="mx-4" onClick={(e: any) => setSelectedImage(e.target.src)}>
                                            <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${images.image2 == selectedImage ? "border-purple" : "border-transparent"}`} src={images.image2} />
                                        </button>

                                        <button className="mx-4" onClick={(e: any) => setSelectedImage(e.target.src)}>
                                            <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${images.image3 == selectedImage ? "border-purple" : "border-transparent"}`} src={images.image3} />
                                        </button>

                                        <button className="mx-4" onClick={(e: any) => setSelectedImage(e.target.src)}>
                                            <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${images.image4 == selectedImage ? "border-purple" : "border-transparent"}`} src={images.image4} />
                                        </button>
                                    </div>

                                    <div className="absolute -bottom-24 w-full flex items-center justify-between px-6">
                                        <h3 className="text-white-gray text-xl font-medium text-center">Escolha a imagem que você mais gostou! 👀</h3>
                                        <Button.Purple onClick={() => selectedImage && setNextStep()} width="w-52">Confirmar</Button.Purple>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Step 2 Screen */}

                    <div className={`flex items-center justify-center flex-col fixed top-[50%] -translate-y-[50%] h-full w-full pt-16 ${step == 2 ? "translate-x-0 opacity-100 ease-in-out duration-700" : "translate-x-60 opacity-0 pointer-events-none"}`}>
                        <h3 className="text-white-gray text-2xl font-medium text-center">Agora, confirme a legenda para prosseguir com a publicação! ✅</h3>

                        {isRequestingSubtitleApi
                            ?
                            <Skeleton
                                sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "32px 0" }}
                                variant="rectangular"
                                width={750}
                                height={288}
                            />
                            :
                            subtitle && isGeneratingSubtitle
                                ?
                                <div className="w-[750px] h-72 flex items-center justify-center rounded-2xl my-8 p-12 bg-dark-gray text-white-gray">
                                    <TypeAnimation
                                        key={step}
                                        sequence={[subtitle, () => setGeneratingSubtitle(false)]}
                                        speed={90}
                                        repeat={1}
                                        cursor={false}
                                    />
                                </div>
                                :
                                <div className="w-[750px] h-72 flex items-center justify-center rounded-2xl my-8 p-12 bg-dark-gray text-white-gray">
                                    <p>{subtitle}</p>
                                </div>
                        }

                        <div className="flex">
                            <span className="mr-3"><Button.Transparent onClick={() => setPreviousStep()} width="w-52" disabled={isGeneratingSubtitle ? true : false}>Voltar</Button.Transparent></span>
                            <Button.Purple onClick={() => setNextStep()} width="w-52" disabled={isGeneratingSubtitle ? true : false}>Confirmar</Button.Purple>
                        </div>

                        <div className="flex items-center justify-center mt-8">
                            <p className="text-white-gray h-6 w-[664px] text-lg font-medium">Caso não tenha gostado dessa legenda, clique no botão ao lado para gerar outra:</p>

                            <button onClick={generateSubtitle} type="button" className="flex items-center justify-center w-10 h-10 text-white-gray bg-purple rounded-xl hover:bg-purple-dark transition-all" disabled={isGeneratingSubtitle ? true : false}>
                                {isGeneratingSubtitle
                                    ? <CircularProgress size="18px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                    : <AutoAwesomeOutlinedIcon />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Step 3 Screen */}

                    <div className={`flex items-center justify-center flex-col fixed top-[50%] -translate-y-[50%] h-full w-full pt-16 ${step == 3 ? "translate-x-0 opacity-100 ease-in-out duration-700" : "translate-x-60 opacity-0 pointer-events-none"}`}>
                        <h3 className="text-white-gray text-2xl font-medium text-center">✨ Está quase lá! Antes de publicar, veja como sua publicação vai ficar! ✨</h3>

                        <div className="flex items-center justify-center my-12 bg-dark-gray rounded-2xl pr-6">
                            <img className="w-[340px] h-[300px] rounded-2xl" src={selectedImage} />
                            <p className="ml-8 text-white-gray w-[460px]">{subtitle}</p>
                        </div>

                        <div className="flex">
                            <span className="mr-3"><Button.Transparent onClick={() => setPreviousStep()} width="w-52" disabled={isPublishing ? true : false}>Voltar</Button.Transparent></span>
                            <Button.Purple onClick={publish} width="w-52" disabled={isPublishing ? true : false}>
                                {isPublishing
                                    ? <CircularProgress size="18px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                    : "Publicar"
                                }
                            </Button.Purple>
                            <span className="ml-3"><Button.Transparent width="w-52" disabled>Agendar Publicação</Button.Transparent></span>
                        </div>
                    </div>
                </div>
            </Menu>

            <Modal.Info content="Sua publicação foi enviada com sucesso! 🚀" onConfirm={closeSuccessModal} isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
        </div>
    )
}