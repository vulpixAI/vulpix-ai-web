import { ReactNode } from 'react';
import { Modal as ModalComponent, Box, Fade } from '@mui/material';
import { Button } from './Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

interface Modal {
    title?: string,
    children: string | ReactNode,
    onConfirm?: () => void,
    isOpen: boolean,
    onClose?: () => void,
    width?: number,
    height?: number
}

function GenericModal({ title, children, isOpen, onClose, width = 500, height }: Modal) {
    return (
        <ModalComponent
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen} timeout={500}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: width,
                        height: height,
                        bgcolor: '#222222',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        outline: 'none'
                    }}
                >
                    <div className="w-full h-[6%] flex items-center justify-between">
                        <h3 className="text-xl text-white-gray">{title}</h3>
                        <button onClick={onClose} className="p-2 rounded-full transition-all hover:bg-zinc-700"><CloseIcon sx={{ color: "#c3d1dc" }} /></button>
                    </div>

                    <div className="w-full h-[94%] flex flex-col items-center text-white-gray pt-8">
                        {typeof children === 'string'
                            ? <p>{children}</p>
                            : children
                        }
                    </div>
                </Box>
            </Fade>
        </ModalComponent>
    )
}

function DialogModal({ title, children, onConfirm, isOpen, onClose, width = 500 }: Modal) {
    return (
        <ModalComponent
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen} timeout={500}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: width,
                        bgcolor: '#222222',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        outline: 'none'
                    }}
                >
                    <div className="w-full h-1/4 flex items-center">
                        <h3 className="text-xl text-white-gray">{title}</h3>
                    </div>

                    <div className="w-full h-1/2 flex items-center text-white-gray my-10">
                        {typeof children === 'string'
                            ? <p>{children}</p>
                            : children
                        }
                    </div>

                    <div className="w-full h-1/4 flex justify-around">
                        <Button.Transparent type="button" width='w-[204px]' onClick={onClose}>Cancelar</Button.Transparent>
                        <Button.Purple type="button" width='w-[204px]' onClick={onConfirm}>Confirmar</Button.Purple>
                    </div>
                </Box>
            </Fade>
        </ModalComponent>
    )
}

function InfoModal({ children, onConfirm, isOpen, onClose, width = 430 }: Modal) {
    return (
        <ModalComponent
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen} timeout={500}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: width,
                        bgcolor: '#222222',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        outline: 'none'
                    }}
                >
                    <div className="w-full h-1/4 flex flex-col justify-center items-center">
                        <h3 className="text-xl text-white-gray">Show! Tudo finalizado!</h3>

                        <div className="p-3 mt-6 border-solid border-purple border-2 rounded-full">
                            <CheckIcon sx={{
                                "color": "#5d5aff"
                            }} />
                        </div>
                    </div>

                    <div className="w-full h-1/2 flex justify-center items-center text-white-gray my-6">
                        <p className="text-center">{children}</p>
                    </div>

                    <div className="w-full h-1/4 flex justify-center">
                        <Button.Purple type="button" width='w-[204px]' onClick={onConfirm}>Ótimo!</Button.Purple>
                    </div>
                </Box>
            </Fade>
        </ModalComponent>
    )
}

function ErrorModal({ children, onConfirm, isOpen, onClose, width = 430 }: Modal) {
    return (
        <ModalComponent
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen} timeout={500}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: width,
                        bgcolor: '#222222',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        outline: 'none'
                    }}
                >
                    <div className="w-full h-1/4 flex flex-col justify-center items-center">
                        <h3 className="text-xl text-white-gray">Ooops! Algo deu errado!</h3>

                        <div className="p-3 mt-6 border-solid border-purple border-2 rounded-full">
                            <CloseIcon sx={{
                                "color": "#5d5aff"
                            }} />
                        </div>
                    </div>

                    <div className="w-full h-1/2 flex justify-center items-center text-white-gray my-6">
                        <p className="text-center">{children}</p>
                    </div>

                    <div className="w-full h-1/4 flex justify-center">
                        <Button.Purple type="button" width='w-[204px]' onClick={onConfirm}>Tentar Novamente</Button.Purple>
                    </div>
                </Box>
            </Fade>
        </ModalComponent>
    )
}

function LoadingModal({ children, isOpen, onClose, width = 430 }: Modal) {
    return (
        <ModalComponent
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen} timeout={500}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: width,
                        bgcolor: '#222222',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        outline: 'none'
                    }}
                >
                    <div className="w-full h-1/4 flex flex-col justify-center items-center">
                        <div className="mt-6">
                            <CircularProgress size="50px" sx={{ color: "#5d5aff" }} />
                        </div>
                    </div>

                    <div className="w-full h-1/2 flex justify-center items-center text-white-gray my-6">
                        <p className="text-center">{children}</p>
                    </div>
                </Box>
            </Fade>
        </ModalComponent>
    )
}

export const Modal = {
    Modal: GenericModal,
    Dialog: DialogModal,
    Info: InfoModal,
    Error: ErrorModal,
    Loading: LoadingModal
}