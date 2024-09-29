import { ReactNode, useEffect, useState } from "react";
import { useLastPage } from "../hooks/useLastPage";
import { Link } from "react-router-dom";
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

interface Menu {
    children: ReactNode
}

export function Menu({ children }: Menu) {
    useLastPage();

    useEffect(() => setCurrentPage(window.location.pathname.replace("/", "")), []);
    const [currentPage, setCurrentPage] = useState<string>("");

    return (
        <div className="flex h-full">
            <div className="h-full w-28 rounded-r-2xl bg-dark-gray fixed z-10">
                <div className="flex items-center justify-center h-1/5">
                    <img className="w-[70px] select-none pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                </div>

                <div className="flex flex-col items-center justify-center h-3/5">
                    <Link to={"/dashboard"} className={`${currentPage == "dashboard" ? "text-purple" : "text-white-gray"} hover:scale-110 ease-in-out duration-300`}>
                        <ShowChartOutlinedIcon />
                    </Link>

                    <Link to={"/posts"} className={`${currentPage == "posts" ? "text-purple" : "text-white-gray"} my-14 hover:scale-110 ease-in-out duration-300`}>
                        <DescriptionOutlinedIcon />
                    </Link>

                    <Link to={"/ai"} className={`${currentPage == "ai" ? "text-purple" : "text-white-gray"} hover:scale-110 ease-in-out duration-300`}>
                        <AutoAwesomeOutlinedIcon />
                    </Link>
                </div>

                <div className="flex items-center justify-center h-1/5">
                    <button className="text-white-gray hover:scale-110 ease-in-out duration-300">
                        <LogoutOutlinedIcon />
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col items-center ml-28">
                <nav className="h-16 pr-8 flex justify-end items-center fixed w-full bg-black">
                    <div className="flex items-center mr-28">
                        <div className="flex">
                            <button className="text-white-gray hover:scale-110 ease-in-out duration-300">
                                <SettingsOutlinedIcon />
                            </button>

                            <button className="text-white-gray ml-4 hover:scale-110 ease-in-out duration-300">
                                <PersonOutlineOutlinedIcon />
                            </button>
                        </div>
                        <div className="h-10 w-[1px] bg-white-gray/40 mx-8"></div>
                        <h4 className="text-purple cursor-pointer select-none">Nome da Empresa</h4>
                    </div>
                </nav>
                <div className="w-[90%] h-[1px] bg-white-gray/40 mt-16 fixed"></div>

                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}