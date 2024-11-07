import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import useAuth from "../../hooks/useAuth";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function Dashboard() {
    const { userData }: any = useAuth();

    const [greetingMessage, setGreetingMessage] = useState<string>("");

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
                <div className="h-1/5 pt-16 flex justify-between items-center">
                    <h2 className="text-white-gray text-2xl select-none pl-12">{greetingMessage}, <span className="text-purple">{userData.nome}</span></h2>
                    <button className="text-white-gray bg-dark-gray flex items-center justify-center py-2 px-4 mr-12 rounded-2xl select-none"><CalendarTodayIcon sx={{ marginRight: "8px" }} /> Sep 16, 2024 - Nov 04, 2024</button>
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