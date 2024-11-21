import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { formatMonth } from "../../utils/dateUtils";
import { padZero } from "../../utils/stringUtils";
import { Skeleton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
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

    const [creatives, setCreatives] = useState<CreativeResponse[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [hasCreative, setHasCreative] = useState<boolean>(true);
    const [selectedCreative, setSelectedCreative] = useState<Partial<SelectedCreative>>({});

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [selectedStartDate, setSelectedStartDate] = useState<any>(dayjs().subtract(1, "month"));
    const [selectedEndDate, setSelectedEndDate] = useState<any>(dayjs());

    const [isDateRangePickerModalOpen, setDateRangePickerModalOpen] = useState<boolean>(false);
    const openDateRangePickerModal = () => { setStartDate(selectedStartDate), setEndDate(selectedEndDate), setDateRangePickerModalOpen(true) };
    const closeDateRangePickerModal = () => setDateRangePickerModalOpen(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/criativos`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            if (response.data.length == 0) {
                setTimeout(() => { setLoading(false), setHasCreative(false) }, 3000);
            } else {
                setCreatives(response.data);
                setLoading(false);
            }
        });
    }, []);

    const [isSelectCreativeModalOpen, setSelectCreativeModalOpen] = useState<boolean>(false);
    const openSelectCreativeModal = () => setSelectCreativeModalOpen(true);
    const closeSelectCreativeModal = () => setSelectCreativeModalOpen(false);

    function selectCreative(id: string, image_url: string) {
        setSelectedCreative((prevData: object) => ({ ...prevData, id: id }));
        setSelectedCreative((prevData: object) => ({ ...prevData, image_url: image_url }));
        openSelectCreativeModal();
    }

    function filterDate() {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        closeDateRangePickerModal();
    }

    return (
        <Menu>
            <div className="flex flex-col items-center h-screen w-full overflow-hidden">
                <div className="h-1/5 pt-16 w-full flex justify-end items-center mr-16">
                    <button onClick={openDateRangePickerModal} className="text-white-gray bg-dark-gray flex items-center justify-center py-2 px-4 mr-12 rounded-2xl select-none"><EventIcon sx={{ marginRight: "8px" }} />
                        {formatMonth(new Date(selectedStartDate).getMonth())} {padZero(new Date(selectedStartDate).getDate())}, {new Date(selectedStartDate).getFullYear()}
                        <span className="mx-2">–</span>
                        {formatMonth(new Date(selectedEndDate).getMonth())} {padZero(new Date(selectedEndDate).getDate())}, {new Date(selectedEndDate).getFullYear()}
                    </button>
                </div>
                <div className={`${!isLoading && "overflow-x-hidden"} ${hasCreative ? "grid grid-cols-1" : "flex justify-center"} px-2 h-4/5 pb-8`}>
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
                            ? creatives.map((e: CreativeResponse, index: number) =>
                                <div key={index} className={`flex items-center justify-between ${index != 0 && "mt-12"}`}>
                                    {e.images.map((image: SelectedCreative, index: number) =>
                                        <button key={index} className="mx-6" onClick={() => selectCreative(image.id, image.image_url)} disabled={isMediaConnected ? false : true}>
                                            <img className={`w-[280px] h-[240px] rounded-2xl transition-all ${isMediaConnected && "hover:brightness-75"}`} src={image.image_url} />
                                        </button>
                                    )}
                                </div>
                            )
                            : <h1 className="text-white-gray text-xl mt-8">Ooops! Parece que ainda não tem nada por aqui. Que tal gerar novos criativos? 😄</h1>
                    }
                </div>
            </div>

            <Modal.Dialog title="Criar Nova Publicação" onConfirm={() => navigate(`/creative/${selectedCreative.id}`)} isOpen={isSelectCreativeModalOpen} onClose={closeSelectCreativeModal}>
                <div className="flex flex-col items-center justify-center">
                    <img className="w-[280px] h-[240px] rounded-2xl" src={selectedCreative.image_url} />
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