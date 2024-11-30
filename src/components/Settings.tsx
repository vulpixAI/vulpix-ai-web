import { useState } from "react";
import { Modal } from "./Modal";
import { Account } from "./SettingsSections/Account";
import { Connections } from "./SettingsSections/Connections";
import { Form } from "./SettingsSections/Form";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface Settings {
    isOpen: boolean,
    onClose: () => void
}

interface MenuState {
    account: boolean,
    connection: boolean,
    form: boolean
}

export function Settings({ isOpen, onClose }: Settings) {
    const [menuState, setMenuState] = useState<MenuState>({ account: true, connection: false, form: false });
    const handleOptionChange = (option: string) => setMenuState({ account: false, connection: false, form: false, [option]: true });

    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const openSuccessModal = () => setSuccessModalOpen(true);
    const closeSuccessModal = () => { setSuccessModalOpen(false) }
    const [message, setMessage] = useState<string>("");
    const [isErrorModalOpen, setErrorModalOpen] = useState<boolean>(false);
    const openErrorModal = () => setErrorModalOpen(true);
    const closeErrorModal = () => setErrorModalOpen(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    const resetSettingsModal = () => setTimeout(() => setMenuState({ account: true, connection: false, form: false }), 400);

    return (
        <>
            <Modal.Modal width={800} height={600} title="Configurações" isOpen={isOpen} onClose={() => { !isLoading && (resetSettingsModal(), onClose()) }}>
                <div className="flex h-full w-full">
                    <div className="h-full w-1/4 flex flex-col">
                        <button disabled={isLoading ? true : false} onClick={() => handleOptionChange("account")} className={`flex items-center py-4 pl-2 mb-1 rounded-md transition-all select-none hover:bg-zinc-700 ${menuState.account && "text-purple"}`}><PersonIcon /> <span className="ml-2 mt-[2px]">Conta</span></button>
                        <button disabled={isLoading ? true : false} onClick={() => handleOptionChange("connection")} className={`flex items-center py-4 pl-2 mb-1 rounded-md transition-all select-none hover:bg-zinc-700 ${menuState.connection && "text-purple"}`}><PublicIcon /> <span className="ml-2">Conexões</span></button>
                        <button disabled={isLoading ? true : false} onClick={() => handleOptionChange("form")} className={`flex items-center py-4 pl-2 rounded-md transition-all select-none hover:bg-zinc-700 ${menuState.form && "text-purple"}`}><AssignmentIcon /> <span className="ml-2">Formulário</span></button>
                    </div>

                    <div className="h-full w-3/4 flex flex-col px-4">
                        {menuState.account &&
                            <Account
                                isLoading={isLoading}
                                setLoading={setLoading}
                                setMessage={setMessage}
                                openSuccessModal={openSuccessModal}
                                openErrorModal={openErrorModal}
                            />
                        }

                        {menuState.connection &&
                            <Connections
                                isLoading={isLoading}
                                setLoading={setLoading}
                                setMessage={setMessage}
                                openSuccessModal={openSuccessModal}
                                openErrorModal={openErrorModal}
                            />
                        }

                        {menuState.form &&
                            <Form
                                isLoading={isLoading}
                                setLoading={setLoading}
                                setMessage={setMessage}
                                openSuccessModal={openSuccessModal}
                                openErrorModal={openErrorModal}
                            />
                        }
                    </div>
                </div>
            </Modal.Modal>

            <Modal.Info children={message} onConfirm={closeSuccessModal} isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
            <Modal.Error children={message} onConfirm={closeErrorModal} isOpen={isErrorModalOpen} onClose={closeErrorModal} />
        </>
    )
}