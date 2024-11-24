import { useState, useEffect, FormEvent } from "react";
import { Skeleton, TextareaAutosize, Tooltip } from "@mui/material";
import { Menu } from "../../components/Menu";
import { TypeAnimation } from 'react-type-animation';
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { padZero } from "../../utils/stringUtils";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { Input } from "../../components/Input";
import useTimer from "../../hooks/useTimer";
import UseAuth from "../../hooks/useAuth";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

interface CreativeResponse {
    image1: string,
    image2: string,
    image3: string,
    image4: string
}

export default function Creative() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { minutes, seconds, startTimer, resetTimer } = useTimer();
    const { isMediaConnected }: any = UseAuth();

    const interactiveMessages = ["O que sua imaginação está pedindo agora?", "Pronto para criar algo incrível?", "O que vamos criar juntos hoje?", "Ideia na cabeça? Vamos transformar em imagem!", "Qual é o projeto da vez?", "Digite sua ideia... Vamos criar!"];
    const validInputRegex = /^(?!\s*$)(?!\s).+/;

    const [step, setStep] = useState<number>(1);

    const [creatives, setCreatives] = useState<Partial<CreativeResponse>>({});
    const [prompt, setPrompt] = useState<string>("");
    const [userRequest, setUserRequest] = useState<string>("");
    const [isSubmit, setSubmit] = useState<boolean>(false);
    const [isGenerating, setGenerating] = useState<boolean>(false);
    const [selectedCreative, setSelectedCreative] = useState<string>("");

    const [caption, setCaption] = useState<string>("");
    const [isRequestingCaptionApi, setRequestingCaptionApi] = useState<boolean>(false);
    const [isGeneratingCaption, setGeneratingCaption] = useState<boolean>(false);

    const [isPublishing, setPublishing] = useState<boolean>(false);

    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const openSuccessModal = () => setSuccessModalOpen(true);
    const closeSuccessModal = () => { navigate("/post"), setSuccessModalOpen(false) }

    const [isErrorModalOpen, setErrorModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const openErrorModal = () => setErrorModalOpen(true);
    const closeErrorModal = () => setErrorModalOpen(false);

    const [isSchedulingModalOpen, setSchedulingModalOpen] = useState<boolean>(false);
    const openSchedulingModal = () => setSchedulingModalOpen(true);
    const closeSchedulingModal = () => setSchedulingModalOpen(false);
    const [scheduledDate, setScheduledDate] = useState<Dayjs | any>(null);
    const [scheduledTime, setScheduledTime] = useState<Dayjs | any>(null);
    const [formattedDateTime, setFormattedDateTime] = useState<string | null>(null);

    const [isCreativeFromCreativeList, setCreativeFromCreativeList] = useState<boolean>(false);
    useEffect(() => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (id) {
            if (uuidRegex.test(id)) {
                axios.get(`${import.meta.env.VITE_API_URL}/criativos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
                    }
                }).then(response => {
                    setStep(2);
                    setCreativeFromCreativeList(true);
                    setSelectedCreative(response.data.imageUrl);
                    setUserRequest(JSON.parse(response.data.prompt).userRequest);
                    generateCaption(JSON.parse(response.data.prompt).userRequest);
                });
            }
        }
    }, []);

    function schedulePublishing() {
        if (!scheduledDate || !scheduledTime) return;

        let day = new Date(scheduledDate).getDate();
        let month = new Date(scheduledDate).getMonth() + 1;
        let year = new Date(scheduledDate).getFullYear();
        let hour = new Date(scheduledTime).getHours();
        let minute = new Date(scheduledTime).getMinutes();

        setFormattedDateTime(`${year}-${padZero(month)}-${padZero(day)}T${padZero(hour)}:${padZero(minute)}:00-03:00`);
        setSchedulingModalOpen(false);
    }

    function deleteScheduling() {
        setFormattedDateTime(null);
        setScheduledDate(null);
        setScheduledTime(null);
    }

    function formatCaption(caption: string) {
        let formattedCaption = caption;
        if (formattedCaption.substring(0, 3) == "## ") formattedCaption = caption.substring(3);
        return formattedCaption.replace("*", "");
    }

    async function generateCreative(event: FormEvent) {
        event.preventDefault();

        if (!validInputRegex.test(prompt)) return;

        startTimer();
        setPrompt("");
        setSubmit(true);
        setGenerating(true);

        const payload = {
            userRequest: prompt
        }

        await axios.post(`${import.meta.env.VITE_API_URL}/posts/gerar-post`, payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        })
            .then(response => {
                setCreatives({
                    image1: response.data.imagem1,
                    image2: response.data.imagem2,
                    image3: response.data.imagem3,
                    image4: response.data.imagem4
                });
                setCaption(formatCaption(response.data.legenda));
                setGenerating(false);
            })
            .catch(() => {
                setSubmit(false);
                setGenerating(false);
                setUserRequest("");
                setErrorMessage("Houve um problema ao gerar os criativos.");
                openErrorModal();
            });

        resetTimer();
    }

    async function generateCaption(prompt?: string) {
        setCaption("");
        setRequestingCaptionApi(true);
        setGeneratingCaption(true);

        const payload = {
            userRequest: prompt ? prompt : userRequest
        }

        await axios.post(`${import.meta.env.VITE_API_URL}/posts/gerar-legenda`, payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        })
            .then(response => {
                setCaption(formatCaption(response.data.legenda));
                setRequestingCaptionApi(false);
            })
            .catch(() => {
                setRequestingCaptionApi(false);
                setGeneratingCaption(false);
                setErrorMessage("Houve um problema ao gerar a legenda.");
                openErrorModal();
            });
    }

    async function publish() {
        setPublishing(true);

        const payload = {
            image_url: selectedCreative,
            caption: caption,
            data_agendamento: formattedDateTime
        }

        await axios.post(`${import.meta.env.VITE_API_URL}/posts`, payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(() => {
            setPublishing(false);
            openSuccessModal();
        }).catch(() => {
            setPublishing(false);
            setErrorMessage("Houve um problema ao realizar a publicação.");
            openErrorModal();
        });
    }

    const setPreviousStep = () => step > 1 && setStep(step => step - 1);
    const setNextStep = () => step < 3 && setStep(step => step + 1);

    return (
        <Menu>
            <div className="flex items-center flex-col h-screen">
                <div className={`fixed top-[50%] -translate-y-[50%] pt-16 ${isSubmit && "-mt-48"} ${step == 1 ? "translate-x-0 opacity-100 ease-in-out duration-700" : "translate-x-60 opacity-0 pointer-events-none"}`}>
                    <h1 className={`text-white-gray text-3xl font-medium mb-6 ${isSubmit && "hidden"} text-center`}>
                        <TypeAnimation
                            sequence={[interactiveMessages[Math.floor(Math.random() * interactiveMessages.length)]]}
                            speed={70}
                            repeat={1}
                            cursor={false}
                        />
                    </h1>

                    <form onSubmit={generateCreative} className="relative flex items-center w-[1220px] mb-8 py-2 bg-dark-gray rounded-2xl">
                        <TextareaAutosize
                            className="outline-none w-[95%] rounded-xl bg-dark-gray p-2 pl-4 text-blue-gray placeholder:text-zinc-500 resize-none placeholder:select-none"
                            maxRows={3} placeholder="Digite aqui seu prompt..."
                            onChange={(e) => { setPrompt(e.target.value), setUserRequest(e.target.value) }}
                            value={prompt}
                            disabled={isGenerating ? true : false}
                            onKeyDown={(e: any) => {
                                if (e.key === 'Enter') {
                                    if (e.shiftKey) {
                                        return;
                                    } else {
                                        e.preventDefault();
                                        e.target.form.requestSubmit();
                                    }
                                }
                            }}
                            autoFocus
                        />
                        <div className="absolute right-3 bottom-2">
                            {validInputRegex.test(prompt)
                                ? <button type="submit" className="flex items-center justify-center w-10 h-10 text-white-gray bg-purple rounded-xl hover:bg-purple-dark transition-all disabled:hover:bg-purple" disabled={isGenerating ? true : false}>
                                    {isGenerating
                                        ? <CircularProgress size="18px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                        : <AutoAwesomeOutlinedIcon />
                                    }
                                </button>
                                : <Tooltip title="Seu prompt está vazio" placement="top">
                                    <span>
                                        <button type="button" className="flex items-center justify-center w-10 h-10 text-white-gray bg-purple rounded-xl disabled:opacity-70" disabled>
                                            <AutoAwesomeOutlinedIcon />
                                        </button>
                                    </span>
                                </Tooltip>
                            }
                        </div>
                    </form>
                </div>

                <div className={`absolute flex flex-col pt-16 ${isSubmit ? "opacity-100 top-[50%] -translate-y-[50%] ease-in-out duration-700 delay-150" : "opacity-0 pointer-events-none"} ${step >= 2 && "translate-x-60 !opacity-0 transition-none"}`}>
                    {isGenerating
                        ?
                        <>
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
                            <div className="absolute -bottom-24 w-full flex items-center justify-between px-6 text-white-gray">
                                <h3 className="text-xl font-medium text-left">Isso pode demorar um pouco, pegue um café enquanto isso... ☕</h3>
                                <span className="text-xl pr-2 flex items-center justify-center select-none">
                                    <AccessTimeIcon sx={{ marginRight: "4px", color: "#5d5aff" }} />
                                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                                </span>
                            </div>
                        </>
                        :
                        <div>
                            <div className="flex">
                                <button className="mx-4" onClick={(e: any) => setSelectedCreative(e.target.src)} disabled={isMediaConnected ? false : true}>
                                    <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${creatives.image1 == selectedCreative ? "border-purple" : "border-transparent"}`} src={creatives.image1} />
                                </button>

                                <button className="mx-4" onClick={(e: any) => setSelectedCreative(e.target.src)} disabled={isMediaConnected ? false : true}>
                                    <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${creatives.image2 == selectedCreative ? "border-purple" : "border-transparent"}`} src={creatives.image2} />
                                </button>

                                <button className="mx-4" onClick={(e: any) => setSelectedCreative(e.target.src)} disabled={isMediaConnected ? false : true}>
                                    <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${creatives.image3 == selectedCreative ? "border-purple" : "border-transparent"}`} src={creatives.image3} />
                                </button>

                                <button className="mx-4" onClick={(e: any) => setSelectedCreative(e.target.src)} disabled={isMediaConnected ? false : true}>
                                    <img className={`w-[280px] h-[240px] rounded-2xl border-4 border-solid ${creatives.image4 == selectedCreative ? "border-purple" : "border-transparent"}`} src={creatives.image4} />
                                </button>
                            </div>

                            <div className={`absolute -bottom-24 w-full flex items-center px-6 ${isMediaConnected ? "justify-between" : "justify-center"}`}>
                                {isMediaConnected
                                    ?
                                    <>
                                        <h3 className="text-white-gray text-xl font-medium text-center">Escolha o criativo que você mais gostou! 👀</h3>
                                        <Button.Purple onClick={() => selectedCreative && setNextStep()} width="w-52">Confirmar</Button.Purple>
                                    </>
                                    :
                                    <h3 className="text-white-gray text-xl font-medium text-center w-[80%]">Criativos gerados com sucesso! Mas parece que você ainda não se conectou em nenhuma rede social. Sem estresse! Vá em <b>Configurações {'>'} Conexões</b>, faça a conexão, e pronto, é só continuar. 😉</h3>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Step 2 Screen */}

            <div className={`flex items-center justify-center flex-col fixed top-[50%] -translate-y-[50%] h-full w-full pt-16 pb-6 ${step == 2 ? "translate-x-0 opacity-100 ease-in-out duration-700" : "translate-x-60 opacity-0 pointer-events-none"}`}>
                <h3 className="text-white-gray text-2xl font-medium text-center">Agora, confirme a legenda para prosseguir com a publicação! ✅</h3>

                {isRequestingCaptionApi
                    ?
                    <Skeleton
                        sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "32px 0" }}
                        variant="rectangular"
                        width={750}
                        height={288}
                    />
                    :
                    caption && isGeneratingCaption
                        ?
                        <div className="w-[750px] h-72 flex items-center justify-center rounded-2xl my-8 p-12 bg-dark-gray text-white-gray">
                            <TypeAnimation
                                key={step}
                                sequence={[caption, () => setGeneratingCaption(false)]}
                                speed={90}
                                repeat={1}
                                cursor={false}
                            />
                        </div>
                        :
                        <div className="w-[750px] h-72 flex items-center justify-center rounded-2xl my-8 p-12 bg-dark-gray text-white-gray">
                            <p>{caption}</p>
                        </div>
                }

                <div className="flex">
                    <span className="mr-3"><Button.Transparent onClick={() => { isCreativeFromCreativeList ? navigate("/creative-list") : setPreviousStep() }} width="w-52" disabled={isGeneratingCaption ? true : false}>Voltar</Button.Transparent></span>
                    <Button.Purple onClick={() => setNextStep()} width="w-52" disabled={isGeneratingCaption || !caption ? true : false}>Confirmar</Button.Purple>
                </div>

                <div className="flex items-center justify-center mt-8">
                    <p className="text-white-gray h-6 w-[664px] text-lg font-medium">Caso não tenha gostado dessa legenda, clique no botão ao lado para gerar outra:</p>

                    <button onClick={() => generateCaption()} type="button" className="flex items-center justify-center w-10 h-10 text-white-gray bg-purple rounded-xl hover:bg-purple-dark transition-all disabled:hover:bg-purple" disabled={isGeneratingCaption ? true : false}>
                        {isGeneratingCaption
                            ? <CircularProgress size="18px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                            : <AutoAwesomeOutlinedIcon />
                        }
                    </button>
                </div>
            </div>

            {/* Step 3 Screen */}

            <div className={`flex items-center justify-center flex-col fixed top-[50%] -translate-y-[50%] h-full w-full pt-16 pb-6 ${step == 3 ? "translate-x-0 opacity-100 ease-in-out duration-700" : "translate-x-60 opacity-0 pointer-events-none"}`}>
                <h3 className="text-white-gray text-2xl font-medium text-center">✨ Está quase lá! Antes de publicar, veja como sua publicação vai ficar! ✨</h3>

                <div className={`flex items-center justify-center bg-dark-gray rounded-2xl pr-6 ${formattedDateTime != null ? "mt-12" : "my-12"}`}>
                    <img className="w-[340px] h-[300px] rounded-2xl" src={selectedCreative} />
                    <p className="ml-8 text-white-gray w-[460px]">{caption}</p>
                </div>

                <h6 className={`my-8 text-white-gray ${formattedDateTime != null ? "block" : "hidden"}`}>
                    📆 Sua publicação será agendada para a data {scheduledDate && padZero(new Date(scheduledDate).getDate())}/{scheduledDate && padZero(new Date(scheduledDate).getMonth() + 1)}/{scheduledDate && new Date(scheduledDate).getFullYear()} às {scheduledTime && padZero(new Date(scheduledTime).getHours())}h{scheduledTime && padZero(new Date(scheduledTime).getMinutes())}.
                </h6>

                <div className="flex">
                    <span className="mr-3"><Button.Transparent onClick={() => setPreviousStep()} width="w-52" disabled={isPublishing ? true : false}>Voltar</Button.Transparent></span>
                    <Button.Purple onClick={publish} width="w-52" disabled={isPublishing ? true : false}>
                        {isPublishing
                            ? <CircularProgress size="24px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                            : "Publicar"
                        }
                    </Button.Purple>
                    <span className="ml-3">
                        <Button.Transparent width="w-52" onClick={() => formattedDateTime != null ? deleteScheduling() : openSchedulingModal()}>
                            {formattedDateTime != null ? "Excluir Agendamento" : "Agendar Publicação"}
                        </Button.Transparent>
                    </span>
                </div>
            </div>

            <h6 className="fixed bottom-2 text-white-gray text-xs">A vulpix.AI pode cometer erros. É sempre aconselhável revisar informações essenciais.</h6>

            <Modal.Info children="Publicação realizada com sucesso! 🚀" onConfirm={closeSuccessModal} isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
            <Modal.Error children={errorMessage} onConfirm={closeErrorModal} isOpen={isErrorModalOpen} onClose={closeErrorModal} />

            {/* Publishing Scheduling Modal */}

            <Modal.Dialog title="Agendar Publicação" onConfirm={schedulePublishing} isOpen={isSchedulingModalOpen} onClose={closeSchedulingModal} width={520}>
                <div className="flex flex-col justify-center items-center w-full">
                    <h4 className="mb-8">📆 Quer agendar sua publicação? Escolha o dia e a hora! 🚀</h4>
                    <div className="flex">
                        <Input.DatePicker minDate={dayjs()} value={scheduledDate} onChange={(date: Dayjs | any) => setScheduledDate(date)} />
                        <Input.TimePicker value={scheduledTime} onChange={(time: Dayjs | any) => setScheduledTime(time)} />
                    </div>
                </div>
            </Modal.Dialog>
        </Menu>
    )
}