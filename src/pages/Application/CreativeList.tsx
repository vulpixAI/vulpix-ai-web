import { useEffect, useRef, useState } from "react";
import { Menu } from "../../components/Menu";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { formatMonth, formatDate } from "../../utils/dateUtils";
import { padZero } from "../../utils/stringUtils";
import { Skeleton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Share from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import EventIcon from '@mui/icons-material/Event';
import UseAuth from "../../hooks/useAuth";
import axios from "axios";

interface CreativeResponse {
    prompt: string,
    images: {
        id: string;
        image_url: string;
    }[]
}

interface SelectedCreative {
    id: string,
    image_url: string
}

export default function CreativeList() {
    const navigate = useNavigate();
    const { isMediaConnected }: any = UseAuth();

    const creativesContainer: any = useRef(null);
    const isLastPage = useRef(false);
    const isPaginationLoading = useRef(false);

    const [creatives, setCreatives] = useState<CreativeResponse[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [hasCreative, setHasCreative] = useState<boolean>(true);
    const [selectedCreative, setSelectedCreative] = useState<Partial<SelectedCreative>>({});
    const [creativeId, setCreativeId] = useState<string | null>(null);

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [selectedStartDate, setSelectedStartDate] = useState<any>(dayjs().subtract(1, "month"));
    const [selectedEndDate, setSelectedEndDate] = useState<any>(dayjs());
    const [isDateRangeChanged, setDateRangeChanged] = useState<boolean>(false);

    const [isDateRangePickerModalOpen, setDateRangePickerModalOpen] = useState<boolean>(false);
    const openDateRangePickerModal = () => { setStartDate(selectedStartDate), setEndDate(selectedEndDate), setDateRangePickerModalOpen(true) };
    const closeDateRangePickerModal = () => setDateRangePickerModalOpen(false);

    const [page, setPage] = useState<number>(0);

    function handleScroll() {
        if (isLastPage.current) return;
        if (isPaginationLoading.current) return;

        if (creativesContainer.current.clientHeight + creativesContainer.current.scrollTop + 1 >= creativesContainer.current.scrollHeight) {
            isPaginationLoading.current = true;
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        setTimeout(() => creativesContainer.current.addEventListener("scroll", handleScroll), 200);
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/criativos?page=${page}&size=4&dataInicio=${formatDate(selectedStartDate)}&dataFim=${formatDate(selectedEndDate)}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            if (response.data.content.length == 0) {
                setDateRangeChanged(false);
                setTimeout(() => { setLoading(false), setHasCreative(false) }, 3000);
                return;
            }

            if (isDateRangeChanged) {
                setCreatives(response.data.content);
                setDateRangeChanged(false);
            } else {
                page > 0 ? setCreatives(prev => [...prev, ...response.data.content]) : setCreatives(response.data.content);
            }
            setLoading(false);

            isPaginationLoading.current = false;
            isLastPage.current = response.data.last;
        });
    }, [page, isDateRangeChanged]);

    const [isSelectCreativeModalOpen, setSelectCreativeModalOpen] = useState<boolean>(false);
    const openSelectCreativeModal = () => setSelectCreativeModalOpen(true);
    const closeSelectCreativeModal = () => setSelectCreativeModalOpen(false);

    function selectCreative(id: string, image_url: string) {
        setSelectedCreative((prevData: object) => ({ ...prevData, id: id }));
        setSelectedCreative((prevData: object) => ({ ...prevData, image_url: image_url }));
        openSelectCreativeModal();
    }

    function filterDate() {
        creativesContainer.current.scrollTop = 0;
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        setPage(0);
        setHasCreative(true);
        setLoading(true);
        setDateRangeChanged(true);
        closeDateRangePickerModal();
    }

    async function downloadCreative(e: any, imageUrl: string) {
        e.preventDefault();

        await axios.get(imageUrl, { responseType: "blob" })
            .then(response => {
                const blob = new Blob([response.data], { type: response.headers["content-type"] });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = 'creative.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);
            });
    }

    return (
        <Menu>
            <div className="flex flex-col items-center h-screen w-full overflow-hidden">
                <div className="h-1/5 pt-16 w-full flex justify-end items-center mr-16">
                    <Tooltip title="Filtrar Criativos" placement="left">
                        <button onClick={openDateRangePickerModal} className="text-white-gray bg-dark-gray flex items-center justify-center py-2 px-4 mr-12 rounded-2xl select-none transition-all hover:text-purple"><EventIcon sx={{ marginRight: "8px" }} />
                            {formatMonth(new Date(selectedStartDate).getMonth())} {padZero(new Date(selectedStartDate).getDate())}, {new Date(selectedStartDate).getFullYear()}
                            <span className="mx-2">–</span>
                            {formatMonth(new Date(selectedEndDate).getMonth())} {padZero(new Date(selectedEndDate).getDate())}, {new Date(selectedEndDate).getFullYear()}
                        </button>
                    </Tooltip>
                </div>
                <div ref={creativesContainer} className={`${!isLoading && "overflow-x-hidden"} ${hasCreative ? "grid grid-cols-1" : "flex justify-center"} px-2 h-4/5`}>
                    {isLoading
                        ?
                        <>
                            <div className="flex items-center justify-between">
                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />

                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />

                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />

                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-12">
                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />

                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />

                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />

                                <Skeleton
                                    sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 24px" }}
                                    variant="rectangular"
                                    width={280}
                                    height={240}
                                />
                            </div>
                        </>
                        :
                        hasCreative
                            ?
                            <>
                                {creatives.map((e: CreativeResponse, index: number) =>
                                    <div key={index} className={`flex items-center justify-between ${index != 0 && "mt-12"}`}>
                                        {e.images.map((image: SelectedCreative, index: number) =>
                                            <div key={index} onMouseOver={() => setCreativeId(image.id)} onMouseOut={() => setCreativeId(null)} className="mx-6 relative">
                                                <img className={`w-[280px] h-[240px] rounded-2xl transition-all pointer-events-none ${image.id == creativeId && "brightness-75"}`} src={image.image_url} />

                                                <Tooltip title="Compartilhar" placement="bottom">
                                                    <button className={`absolute bg-dark-gray p-2 rounded-xl bottom-1 right-12 flex justify-center items-center transition-all text-white-gray hover:text-purple disabled:hover:text-white-gray disabled:cursor-no-drop ${image.id == creativeId ? "opacity-100" : "opacity-0"}`} onClick={() => selectCreative(image.id, image.image_url)} disabled={isMediaConnected ? false : true}>
                                                        <Share fontSize="small" />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip title="Download" placement="bottom">
                                                    <button className={`absolute bg-dark-gray p-2 rounded-xl bottom-1 right-1 flex justify-center items-center transition-all text-white-gray hover:text-purple ${image.id == creativeId ? "opacity-100" : "opacity-0"}`} onClick={(e: any) => downloadCreative(e, image.image_url)}>
                                                        <DownloadIcon fontSize="small" />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        )}
                                    </div>
                                )
                                }
                                <div className="flex justify-center w-full my-8">
                                    {isPaginationLoading.current && <CircularProgress size="50px" sx={{ color: "#5d5aff" }} />}
                                </div>
                            </>
                            : <h1 className="text-white-gray text-xl mt-4">Hmm... 🔍 Nada foi encontrado por aqui.</h1>
                    }
                </div>
            </div>

            <Modal.Dialog title="Compartilhar Publicação" onConfirm={() => navigate(`/creative/${selectedCreative.id}`)} isOpen={isSelectCreativeModalOpen} onClose={closeSelectCreativeModal}>
                <div className="flex flex-col items-center justify-center">
                    <img className="w-[280px] h-[240px] rounded-2xl pointer-events-none" src={selectedCreative.image_url} />
                    <h3 className="mt-4 text-center">Parece que você gostou desse criativo! 👀 Bora criar a legenda e postar na sua rede? 🚀</h3>
                </div>
            </Modal.Dialog>

            <Modal.Dialog title="Filtrar por Data" onConfirm={filterDate} isOpen={isDateRangePickerModalOpen} onClose={closeDateRangePickerModal}>
                <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-center">Bora escolher a data pra dar aquele filtro nos <br /> seus criativos? 📅</h3>
                    <div className="flex justify-center items-center mt-6">
                        <Input.DateRangePicker
                            valueStart={startDate}
                            maxDateStart={endDate}
                            onChangeStart={(date: Dayjs) => setStartDate(date)}
                            valueEnd={endDate}
                            minDateEnd={startDate}
                            onChangeEnd={(date: Dayjs) => setEndDate(date)}
                        />
                    </div>
                </div>
            </Modal.Dialog>
        </Menu>
    )
}