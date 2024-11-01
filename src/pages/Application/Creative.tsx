import { useState, useEffect, FormEvent } from "react";
import { Skeleton } from "@mui/material";
import { Menu } from "../../components/Menu";
import { TypeAnimation } from 'react-type-animation';
import { Button } from "../../components/Button";
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

    const [images, setImages] = useState<Partial<ImageResponse>>({});

    const [prompt, setPrompt] = useState<string>("");
    const [isSubmit, setSubmit] = useState<boolean>(false);
    const [isGenerating, setGenerating] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        setTimeout(() => setGenerating(false), 5000);
    }, [isGenerating]);

    async function generateImage(event: FormEvent) {
        event.preventDefault();

        const validInputRegex = /^(?!\s*$)(?!\s).+/;
        if (!validInputRegex.test(prompt)) return;

        setPrompt("");
        setSubmit(true);
        setGenerating(true);
    }

    return (
        <div className="h-screen">
            <Menu>
                <div className="flex items-center flex-col h-full relative">
                    <div className={`absolute z-20 ${isSubmit ? "top-20" : "top-[50%] -translate-y-[50%]"} ease-in-out duration-700`}>
                        <h1 className={`text-white-gray text-3xl font-medium mb-6 ${isSubmit && "hidden"} text-center`}>
                            <TypeAnimation
                                sequence={['O que deseja criar hoje?']}
                                speed={70}
                                repeat={1}
                                cursor={false}
                            />
                        </h1>

                        <form onSubmit={generateImage} className="relative w-[1220px] mb-8">
                            <input type="text" className="outline-none w-full h-14 rounded-xl bg-dark-gray p-2 pl-4 pr-16 text-blue-gray placeholder:text-zinc-500" placeholder="Digite aqui seu prompt..." onChange={(e: any) => setPrompt(e.target.value)} value={prompt} />
                            <button type="submit" className="absolute right-3 top-2 flex items-center justify-center w-10 h-10 text-white-gray bg-purple rounded-xl hover:bg-purple-dark transition-all" disabled={isGenerating ? true : false}>
                                {isGenerating
                                    ?
                                    <CircularProgress size="18px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                    :
                                    <AutoAwesomeOutlinedIcon />
                                }
                            </button>
                        </form>
                    </div>

                    <div className={`absolute flex flex-col ease-in-out duration-700 delay-150 ${isSubmit ? "opacity-100 top-[50%] -translate-y-[50%]" : "opacity-0"}`}>
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
                                    <h3 className="text-white-gray text-xl font-medium text-center">
                                        <TypeAnimation
                                            sequence={['Por favor, selecione a imagem que mais lhe agradou e confirme sua escolha.']}
                                            speed={70}
                                            repeat={1}
                                            cursor={false}
                                        />
                                    </h3>
                                    <Button.Purple width="w-52">Confirmar</Button.Purple>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Menu>
        </div>
    )
}