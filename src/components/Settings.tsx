import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import UseAuth from "../hooks/useAuth";

interface Settings {
    isOpen: boolean,
    onClose: any
}

interface MenuState {
    account: boolean,
    connection: boolean
}

interface ConnectionData {
    media: string,
    accessToken: string,
    clientId: string,
    clientSecret: string,
    igUserId: string
}

export function Settings({ isOpen, onClose }: Settings) {
    const { setMediaConnected }: any = UseAuth();

    const [menuState, setMenuState] = useState<MenuState>({ account: true, connection: false });
    const handleOptionChange = (option: string) => setMenuState({ account: false, connection: false, [option]: true });

    const [connectionData, setConnectionData] = useState<Partial<ConnectionData>>({});
    const [isConnectionFormCompleted, setConnectionFormCompleted] = useState<boolean>(false);

    useEffect(() => {
        if (connectionData.media && connectionData.accessToken && connectionData.clientId && connectionData.clientSecret && connectionData.igUserId) {
            setConnectionFormCompleted(true);
        } else {
            setConnectionFormCompleted(false);
        }
    }, [connectionData]);

    const resetSettingsModal = () => setTimeout(() => { setConnectionData({}), setMenuState({ account: true, connection: false }) }, 200);

    const [isLoading, setLoading] = useState<boolean>(false);

    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const openSuccessModal = () => setSuccessModalOpen(true);
    const closeSuccessModal = () => { setSuccessModalOpen(false) }
    const [message, setMessage] = useState<string>("");
    const [isErrorModalOpen, setErrorModalOpen] = useState<boolean>(false);
    const openErrorModal = () => setErrorModalOpen(true);
    const closeErrorModal = () => setErrorModalOpen(false);

    async function sendConnectionForm() {
        const postPayload = {
            tipo: connectionData.media
        }

        const patchPayload = {
            accessToken: connectionData.accessToken,
            clientId: connectionData.clientId,
            clientSecret: connectionData.clientSecret,
            igUserId: connectionData.igUserId
        }

        setLoading(true);

        await axios.post(`${import.meta.env.VITE_API_URL}/integracoes`, postPayload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(() => {
            axios.patch(`${import.meta.env.VITE_API_URL}/integracoes`, patchPayload, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
                }
            }).then(() => {
                sessionStorage.setItem("mediaConnected", "true");
                setMediaConnected(true);
                setMessage("Conexão realizada com sucesso! 🚀");
                openSuccessModal();
            }).catch(() => {
                setMessage("Houve um problema ao realizar a conexão.");
                openErrorModal();
            });
        }).catch(() => {
            setMessage("Houve um problema ao realizar a conexão.");
            openErrorModal();
        });

        setLoading(false);
    }

    return (
        <>
            <Modal.Modal width={800} height={600} title="Configurações" isOpen={isOpen} onClose={() => { !isLoading && (resetSettingsModal(), onClose()) }}>
                <div className="flex h-full w-full">
                    <div className="h-full w-1/4 flex flex-col">
                        <button disabled={isLoading ? true : false} onClick={() => handleOptionChange("account")} className={`flex items-center py-4 pl-2 mb-1 rounded-md transition-all select-none hover:bg-zinc-700 ${menuState.account && "text-purple"}`}><PersonIcon /> <span className="ml-2 mt-[2px]">Conta</span></button>
                        <button disabled={isLoading ? true : false} onClick={() => handleOptionChange("connection")} className={`flex items-center py-4 pl-2 rounded-md transition-all select-none hover:bg-zinc-700 ${menuState.connection && "text-purple"}`}><PublicIcon /> <span className="ml-2">Conexões</span></button>
                    </div>

                    <div className="h-full w-3/4 flex flex-col px-4">
                        {menuState.account &&
                            <></>
                        }

                        {menuState.connection &&
                            <div className="w-full h-full flex flex-col items-center justify-between">
                                <h2 className="text-center">Escolha uma rede, preencha os campos e, ao se conectar, você poderá fazer publicações através da nossa plataforma! 🚀</h2>

                                <div className="flex mt-[8px] select-none">
                                    <button
                                        onClick={() => setConnectionData((prevData: any) => ({ ...prevData, media: "INSTAGRAM" }))}
                                        className={`flex items-center py-2 px-3 mr-2 rounded-md border-solid border-2 transition-all ${connectionData.media == "INSTAGRAM" ? "text-purple border-purple" : "border-white-gray"}`}
                                        disabled={isLoading ? true : false}
                                    >
                                        <InstagramIcon />
                                        <span className="ml-2">Instagram</span>
                                    </button>

                                    <button
                                        onClick={() => setConnectionData((prevData: any) => ({ ...prevData, media: "FACEBOOK" }))}
                                        className={`flex items-center py-2 px-3 ml-2 rounded-md border-solid border-2 transition-all ${connectionData.media == "FACEBOOK" ? "text-purple border-purple" : "border-white-gray"}`}
                                        disabled={isLoading ? true : false}
                                    >
                                        <FacebookIcon />
                                        <span className="ml-2">Facebook</span>
                                    </button>
                                </div>

                                <div className="w-full mt-4">
                                    <Input.Modal
                                        value={connectionData.accessToken || null}
                                        placeholder="Token de acesso*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, accessToken: e.target.value }))}
                                    />
                                </div>

                                <div className="w-full mt-4">
                                    <Input.Modal
                                        value={connectionData.clientId || null}
                                        placeholder="Id do cliente*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, clientId: e.target.value }))}
                                    />
                                </div>

                                <div className="w-full mt-4">
                                    <Input.Modal
                                        value={connectionData.clientSecret || null}
                                        placeholder="Secret do cliente*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, clientSecret: e.target.value }))}
                                    />
                                </div>

                                <div className="w-full my-4">
                                    <Input.Modal
                                        value={connectionData.igUserId || null}
                                        placeholder="Id de usuário*"
                                        type="text"
                                        onChange={(e: any) => setConnectionData((prevData: any) => ({ ...prevData, igUserId: e.target.value }))}
                                    />
                                </div>

                                <div className="flex items-end justify-end w-full">
                                    <Button.Purple onClick={sendConnectionForm} type="button" width="w-44" disabled={(isConnectionFormCompleted && !isLoading) ? false : true}>
                                        {isLoading
                                            ? <CircularProgress size="24px" sx={{ color: "#ffffff", marginLeft: "1px" }} />
                                            : "Salvar Alterações"
                                        }
                                    </Button.Purple>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Modal.Modal>

            <Modal.Info children={message} onConfirm={closeSuccessModal} isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
            <Modal.Error children={message} onConfirm={closeErrorModal} isOpen={isErrorModalOpen} onClose={closeErrorModal} />
        </>
    )
}