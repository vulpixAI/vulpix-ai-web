import { ReactNode } from 'react';
import { Modal as ModalComponent, Box, Fade } from '@mui/material';
import { Button } from './Button';
import CloseIcon from '@mui/icons-material/Close';

interface Modal {
    title: string,
    content: string | ReactNode,
    onConfirm: () => void,
    isOpen: boolean,
    onClose: () => void,
    width?: number
}

export function Modal({ title, content, onConfirm, isOpen, onClose, width = 500 }: Modal) {
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
                        borderRadius: 4
                    }}
                >
                    <button onClick={onClose} className="absolute right-4 top-4"><CloseIcon sx={{ color: "#ffffff" }} /></button>

                    <div className="w-full h-1/4 flex items-center">
                        <h3 className="text-xl text-white">{title}</h3>
                    </div>

                    <div className="w-full h-1/2 flex items-center text-white my-10">
                        {typeof content === 'string'
                            ? <p>{content}</p>
                            : content
                        }
                    </div>

                    <div className="w-full h-1/4 flex justify-around">
                        <Button.Transparent type="button" value="Cancelar" width='w-52' onClick={onClose} />
                        <Button.Input type="button" value="Confirmar" width='w-52' onClick={onConfirm} />
                    </div>
                </Box>
            </Fade>
        </ModalComponent>
    )
}