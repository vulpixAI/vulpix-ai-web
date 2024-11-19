import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { Input } from "../../components/Input";
import dayjs, { Dayjs } from "dayjs";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
    const { userData }: any = useAuth();

    const [greetingMessage, setGreetingMessage] = useState<string>("");
    const [startDate, setStartDate] = useState<Dayjs | any>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs | any>(dayjs());

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

    return (
        <Menu>
            <div className="flex flex-col h-screen w-full">
                <div className="h-1/5 pt-16 flex justify-between items-center mr-8">
                    <h2 className="text-white-gray text-2xl select-none pl-12">{greetingMessage}, <span className="text-purple">{userData.nome}</span></h2>
                    <div className="flex items-center">
                        <Input.DatePicker maxDate={endDate} value={startDate} onChange={(date: Dayjs | any) => setStartDate(date)} />
                        <span className="text-white-gray text-2xl font-bold mr-2">-</span>
                        <Input.DatePicker minDate={startDate} maxDate={dayjs()} value={endDate} onChange={(date: Dayjs | any) => setEndDate(date)} />
                    </div>
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
        </Menu>
    )
}