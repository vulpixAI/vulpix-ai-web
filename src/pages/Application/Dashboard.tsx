import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { formatMonth } from "../../utils/dateUtils";
import { padZero } from "../../utils/stringUtils";
import dayjs, { Dayjs } from "dayjs";
import EventIcon from '@mui/icons-material/Event';
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
    const { userData }: any = useAuth();

    const [greetingMessage, setGreetingMessage] = useState<string>("");

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [selectedStartDate, setSelectedStartDate] = useState<any>(dayjs().subtract(1, "month"));
    const [selectedEndDate, setSelectedEndDate] = useState<any>(dayjs());

    const [isDateRangePickerModalOpen, setDateRangePickerModalOpen] = useState<boolean>(false);
    const openDateRangePickerModal = () => { setStartDate(selectedStartDate), setEndDate(selectedEndDate), setDateRangePickerModalOpen(true) };
    const closeDateRangePickerModal = () => setDateRangePickerModalOpen(false);

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            setGreetingMessage("Bom dia");
        } else if (hour >= 12 && hour < 18) {
            setGreetingMessage("Boa tarde");
        } else {
            setGreetingMessage("Boa noite");
        }
    }, []);

    function filterDate() {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        closeDateRangePickerModal();
    }

    return (
        <Menu>
            <div className="flex flex-col h-screen w-full">
                <div className="h-1/5 pt-16 flex justify-between items-center mr-8">
                    <h2 className="text-white-gray text-2xl select-none pl-12">{greetingMessage}, <span className="text-purple">{userData.nome}</span></h2>
                    <button onClick={openDateRangePickerModal} className="text-white-gray bg-dark-gray flex items-center justify-center py-2 px-4 mr-12 rounded-2xl select-none"><EventIcon sx={{ marginRight: "8px" }} />
                        {formatMonth(new Date(selectedStartDate).getMonth())} {padZero(new Date(selectedStartDate).getDate())}, {new Date(selectedStartDate).getFullYear()}
                        <span className="mx-2">–</span>
                        {formatMonth(new Date(selectedEndDate).getMonth())} {padZero(new Date(selectedEndDate).getDate())}, {new Date(selectedEndDate).getFullYear()}
                    </button>
                </div>
                <div className="h-4/5">
                    <div className="flex items-center justify-center h-[30%]">
                        <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6"></div>
                        <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6"></div>
                        <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6"></div>
                        <div className="h-32 w-64 bg-dark-gray rounded-2xl mx-6"></div>
                    </div>
                    <div className="flex items-center justify-center h-[70%]">
                        <div className="h-[20rem] w-[34rem] bg-dark-gray rounded-2xl mx-6"></div>
                        <div className="h-[20rem] w-[34rem] bg-dark-gray rounded-2xl mx-6"></div>
                    </div>
                </div>
            </div>

            <Modal.Dialog title="Filtrar por Data" onConfirm={filterDate} isOpen={isDateRangePickerModalOpen} onClose={closeDateRangePickerModal}>
                <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-center">Bora escolher a data pra dar aquele filtro nas <br /> suas estatísticas? 📅</h3>
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