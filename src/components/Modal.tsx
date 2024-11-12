import { ReactNode } from 'react';
import { Modal as ModalComponent, Box, Fade } from '@mui/material';
import { Button } from './Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Modal {
    title?: string,
    children: string | ReactNode,
    onConfirm: () => void,
    isOpen: boolean,
    onClose: () => void,
    width?: number
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
                        <h3 className="text-xl text-white">{title}</h3>
                    </div>

                    <div className="w-full h-1/2 flex items-center text-white my-10">
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
                        <h3 className="text-xl text-white">Show! Tudo finalizado!</h3>

                        <div className="p-3 mt-6 border-solid border-purple border-2 rounded-full">
                            <CheckIcon sx={{
                                "color": "#5d5aff"
                            }} />
                        </div>
                    </div>

                    <div className="w-full h-1/2 flex justify-center items-center text-white my-6">
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
                        <h3 className="text-xl text-white">Ooops! Algo deu errado!</h3>

                        <div className="p-3 mt-6 border-solid border-purple border-2 rounded-full">
                            <CloseIcon sx={{
                                "color": "#5d5aff"
                            }} />
                        </div>
                    </div>

                    <div className="w-full h-1/2 flex justify-center items-center text-white my-6">
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

export const Modal = {
    Dialog: DialogModal,
    Info: InfoModal,
    Error: ErrorModal
}