import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import { LoadingScreen } from "./LoadingScreen";
import { Settings } from "./Settings";
import UseAuth from "../hooks/useAuth";
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Tooltip from '@mui/material/Tooltip';
import NotFound from "../pages/NotFound";

interface Menu {
    children: ReactNode
}

export function Menu({ children }: Menu) {
    const navigate = useNavigate();
    const { userData, signOut }: any = UseAuth();

    const [isCorrectStatus, setCorrectStatus] = useState<boolean>(false);
    const [showLoadingScreen, setLoadingScreen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<string>("");

    useEffect(() => {
        userData.status == "CADASTRO_FINALIZADO" && setCorrectStatus(true);
        setCurrentPage(window.location.pathname.replace("/", ""));

        if (!sessionStorage.getItem("hasShownLoadingScreen")) {
            setLoadingScreen(true);
            sessionStorage.setItem("hasShownLoadingScreen", "true");
        }
        setTimeout(() => setLoadingScreen(false), 3000);

        document.documentElement.style.overflow = "hidden";
    }, []);

    const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
    const openLogoutModal = () => setLogoutModalOpen(true);
    const closeLogoutModal = () => setLogoutModalOpen(false);

    const [isSettingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
    const openSettingsModal = () => setSettingsModalOpen(true);
    const closeSettingsModal = () => setSettingsModalOpen(false);

    return (
        <>
            {isCorrectStatus
                ?
                showLoadingScreen
                    ?
                    <LoadingScreen />
                    :
                    <div className="flex h-full">
                        <div className="h-full w-28 rounded-r-2xl bg-dark-gray fixed z-50">
                            <div className="flex items-center justify-center h-1/5">
                                <img className="w-[70px] select-none pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                            </div>

                            <div className="flex flex-col items-center justify-center h-3/5">
                                <Tooltip title="Inteligência Artificial" placement="right">
                                    <Link to={"/creative"} className={`${currentPage == "creative" ? "text-purple" : "text-white-gray"} hover:text-purple ease-in-out duration-300`}>
                                        <AutoAwesomeOutlinedIcon />
                                    </Link>
                                </Tooltip>

                                <Tooltip title="Postagens" placement="right">
                                    <Link to={"/post"} className={`${currentPage == "post" ? "text-purple" : "text-white-gray"} my-14 hover:text-purple ease-in-out duration-300`}>
                                        <DescriptionOutlinedIcon />
                                    </Link>
                                </Tooltip>

                                <Tooltip title="Dashboard" placement="right">
                                    <Link to={"/dashboard"} className={`${currentPage == "dashboard" ? "text-purple" : "text-white-gray"} hover:text-purple ease-in-out duration-300`}>
                                        <ShowChartOutlinedIcon />
                                    </Link>
                                </Tooltip>
                            </div>

                            <div className="flex items-center justify-center h-1/5">
                                <Tooltip title="Logout" placement="right">
                                    <button className="text-white-gray hover:text-purple ease-in-out duration-300" onClick={openLogoutModal}>
                                        <LogoutOutlinedIcon />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-center ml-28">
                            <nav className="h-16 pr-8 flex justify-end items-center fixed z-40 w-full bg-black">
                                <div className="flex items-center mr-28">
                                    <div className="flex">
                                        <Tooltip title="Configurações" placement="bottom">
                                            <button className="text-white-gray hover:text-purple ease-in-out duration-300" onClick={openSettingsModal}>
                                                <SettingsOutlinedIcon />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className="h-10 w-[1px] bg-white-gray/40 mx-8"></div>
                                    <h4 className="text-purple select-none w-32 text-center text-nowrap">{userData.nomeFantasia}</h4>
                                </div>
                            </nav>
                            <div className="w-[90%] h-[1px] bg-white-gray/40 mt-16 fixed"></div>

                            <main className="h-full w-full flex justify-center overflow-hidden">
                                {children}
                            </main>
                        </div>

                        <Modal.Dialog title="Fazer Logout" children="Tem certeza de que deseja sair de sua conta?" onConfirm={() => { signOut(), navigate("/login") }} isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
                    </div>
                :
                <NotFound />
            }

            <Settings isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
        </>
    )
}