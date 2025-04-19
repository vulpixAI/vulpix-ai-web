import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { formatDate, formatMonth } from "../../utils/dateUtils";
import { padZero } from "../../utils/stringUtils";
import { Skeleton } from "@mui/material";
import { Chart } from "../../components/Chart";
import dayjs, { Dayjs } from "dayjs";
import Tooltip from '@mui/material/Tooltip';
import EventIcon from '@mui/icons-material/Event';
import useAuth from "../../hooks/useAuth";
import axios from "axios";

interface KpisData {
    taxaCompartilhamento: number,
    taxaSaves: number,
    visualizacoesTotais: number,
    alcanceUltimoPost: number
}

export default function Dashboard() {
    const { userData }: any = useAuth();

    const [isLoading, setLoading] = useState<boolean>(true);
    const [greetingMessage, setGreetingMessage] = useState<string>("");

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [selectedStartDate, setSelectedStartDate] = useState<any>(dayjs().subtract(1, "month"));
    const [selectedEndDate, setSelectedEndDate] = useState<any>(dayjs());
    const [isDateRangeChanged, setDateRangeChanged] = useState<boolean>(false);

    const [isDateRangePickerModalOpen, setDateRangePickerModalOpen] = useState<boolean>(false);
    const openDateRangePickerModal = () => { setStartDate(selectedStartDate), setEndDate(selectedEndDate), setDateRangePickerModalOpen(true) };
    const closeDateRangePickerModal = () => setDateRangePickerModalOpen(false);

    const [kpisData, setKpisData] = useState<Partial<KpisData>>({});
    const [lineChartData, setLineChartData] = useState<object>({});

    function filterDate() {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        setDateRangeChanged(true);
        closeDateRangePickerModal();
    }

    function capitalizeKeys(obj: any) {
        const result: any = {};
        Object.keys(obj).forEach((key) => {
            if (key == "name") {
                result[key] = obj[key];
            } else {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                result[capitalizedKey] = obj[key];
            }
        });
        return result;
    }

    async function getKpisData() {
        await axios.get(`${import.meta.env.VITE_API_URL}/dash/kpis`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            setKpisData(response.data);
        });
    }

    async function getLineChartData() {
        await axios.get(`${import.meta.env.VITE_API_URL}/dash/grafico-metricas-por-dia?data_inicio=${formatDate(selectedStartDate)}&data_fim=${formatDate(selectedEndDate)}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            setLineChartData(response.data.map(capitalizeKeys));
            setLoading(false);
            setDateRangeChanged(false);
        });
    }

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            setGreetingMessage("Bom dia");
        } else if (hour >= 12 && hour < 18) {
            setGreetingMessage("Boa tarde");
        } else {
            setGreetingMessage("Boa noite");
        }

        getKpisData();
        getLineChartData();
    }, []);

    useEffect(() => {
        isDateRangeChanged && getLineChartData();
    }, [isDateRangeChanged]);

    // const lineChartDataMock = [
    //     {
    //         "name": "Ter",
    //         "Likes": 35,
    //         "Views": 15,
    //         "Shares": 22,
    //         "Saves": 18,
    //         "Comments": 48
    //     },
    //     {
    //         "name": "Qua",
    //         "Likes": 50,
    //         "Views": 25,
    //         "Shares": 18,
    //         "Saves": 20,
    //         "Comments": 60
    //     },
    //     {
    //         "name": "Qui",
    //         "Likes": 28,
    //         "Views": 12,
    //         "Shares": 30,
    //         "Saves": 14,
    //         "Comments": 70
    //     },
    //     {
    //         "name": "Sex",
    //         "Likes": 45,
    //         "Views": 20,
    //         "Shares": 25,
    //         "Saves": 22,
    //         "Comments": 65
    //     },
    //     {
    //         "name": "Sab",
    //         "Likes": 38,
    //         "Views": 18,
    //         "Shares": 28,
    //         "Saves": 19,
    //         "Comments": 55
    //     }
    // ];

    const barChartDataMock = [
        {
            "name": "Jul",
            "Seguidores": 20
        },
        {
            "name": "Ago",
            "Seguidores": 30
        },
        {
            "name": "Set",
            "Seguidores": 22
        },
        {
            "name": "Out",
            "Seguidores": 10
        },
        {
            "name": "Nov",
            "Seguidores": 60
        },
        {
            "name": "Dez",
            "Seguidores": 52
        }
    ];

    return (
        <Menu>
            <div className="flex flex-col h-screen w-full">
                <div className="h-1/5 pt-16 flex justify-between items-center mr-8">
                    <h2 className="text-white-gray text-2xl select-none pl-12">{greetingMessage}, <span className="text-purple">{userData.nome}</span></h2>
                    <Tooltip title="Filtrar Estatísticas" placement="left">
                        <button onClick={openDateRangePickerModal} className="text-white-gray bg-dark-gray flex items-center justify-center py-2 px-4 mr-12 rounded-2xl select-none transition-all hover:text-purple"><EventIcon sx={{ marginRight: "8px" }} />
                            {formatMonth(new Date(selectedStartDate).getMonth())} {padZero(new Date(selectedStartDate).getDate())}, {new Date(selectedStartDate).getFullYear()}
                            <span className="mx-2">–</span>
                            {formatMonth(new Date(selectedEndDate).getMonth())} {padZero(new Date(selectedEndDate).getDate())}, {new Date(selectedEndDate).getFullYear()}
                        </button>
                    </Tooltip>
                </div>
                {isLoading
                    ?
                    <div className="h-4/5">
                        <div className="flex items-center justify-center h-[30%]">
                            <Skeleton
                                sx={{ bgcolor: "#222222", borderRadius: "1rem", margin: "0 24px" }}
                                variant="rectangular"
                                width={256}
                                height={128}
                            />

                            <Skeleton
                                sx={{ bgcolor: "#222222", borderRadius: "1rem", margin: "0 24px" }}
                                variant="rectangular"
                                width={256}
                                height={128}
                            />

                            <Skeleton
                                sx={{ bgcolor: "#222222", borderRadius: "1rem", margin: "0 24px" }}
                                variant="rectangular"
                                width={256}
                                height={128}
                            />

                            <Skeleton
                                sx={{ bgcolor: "#222222", borderRadius: "1rem", margin: "0 24px" }}
                                variant="rectangular"
                                width={256}
                                height={128}
                            />
                        </div>
                        <div className="flex items-center justify-center h-[70%]">
                            <Skeleton
                                sx={{ bgcolor: "#222222", borderRadius: "1rem", margin: "0 24px", paddingBottom: "12px" }}
                                variant="rectangular"
                                width={544}
                                height={320}
                            />

                            <Skeleton
                                sx={{ bgcolor: "#222222", borderRadius: "1rem", margin: "0 24px", paddingBottom: "12px" }}
                                variant="rectangular"
                                width={544}
                                height={320}
                            />
                        </div>
                    </div>
                    :
                    <div className="h-4/5">
                        <div className="flex items-center justify-center h-[30%] text-white-gray">
                            <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6 flex flex-col">
                                <div className="h-1/5 flex justify-center items-center"><h4 className="mt-3 text-xs text-center">Taxa de Compartilhamento dos Posts</h4></div>
                                <div className="h-4/5 flex items-center justify-center">
                                    <h1 className="text-4xl">{kpisData.taxaCompartilhamento}%</h1>
                                </div>
                            </div>

                            <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6 flex flex-col">
                                <div className="h-1/5 flex justify-center items-center"><h4 className="mt-3 text-xs text-center">Taxa de Salvamento dos Posts</h4></div>
                                <div className="h-4/5 flex items-center justify-center">
                                    <h1 className="text-4xl">{kpisData.taxaSaves}%</h1>
                                </div>
                            </div>

                            <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6 flex flex-col">
                                <div className="h-1/5 flex justify-center items-center"><h4 className="mt-3 text-xs text-center">Visualizações Totais do Perfil</h4></div>
                                <div className="h-4/5 flex items-center justify-center">
                                    <h1 className="text-4xl">{kpisData.visualizacoesTotais}</h1>
                                </div>
                            </div>

                            <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6 flex flex-col">
                                <div className="h-1/5 flex justify-center items-center"><h4 className="mt-3 text-xs text-center">Alcance da Última Postagem</h4></div>
                                <div className="h-4/5 flex items-center justify-center">
                                    <h1 className="text-4xl">{kpisData.alcanceUltimoPost}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center h-[70%] text-white-gray">
                            <div className="h-[20rem] w-[34rem] bg-dark-gray rounded-2xl mx-6 pb-3 flex flex-col">
                                <div className="h-1/5 flex justify-center items-center"><h4>Métricas de Engajamento</h4></div>
                                <div className="h-4/5 flex items-center justify-center">
                                    <Chart.Line data={lineChartData} />
                                </div>
                            </div>

                            <div className="h-[20rem] w-[34rem] bg-dark-gray rounded-2xl mx-6 pb-3 flex flex-col">
                                <div className="h-1/5 flex justify-center items-center"><h4>Crescimento Mensal de Seguidores</h4></div>
                                <div className="h-4/5 flex items-center justify-center">
                                    <Chart.Bar data={barChartDataMock} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Modal.Dialog title="Filtrar por Data" onConfirm={filterDate} isOpen={isDateRangePickerModalOpen} onClose={closeDateRangePickerModal}>
                <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-center">Bora escolher a data pra filtrar as suas estatísticas? 📅</h3>
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