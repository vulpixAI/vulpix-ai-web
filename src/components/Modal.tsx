import { ReactNode } from 'react';
import { Modal as ModalComponent, Box, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from './Button';

interface Modal {
    title: string,
    content: string | ReactNode,
    onConfirm: () => void,
    isOpen: boolean,
    onClose: () => void,
    width?: number,
    height?: number
}

export function Modal({ title, content, onConfirm, isOpen, onClose, width = 500, height = 250 }: Modal) {
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
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4
                    }}
                >
                    <button onClick={onClose} className="absolute right-3 top-3"><CloseIcon /></button>

                    <div className="w-full h-1/6">
                        <h3 className="text-xl">{title}</h3>
                    </div>

                    <div className="w-full h-2/3 flex items-center">
                        {typeof content === 'string'
                            ? <p>{content}</p>
                            : content
                        }
                    </div>

                    <div className="w-full h-1/6 flex justify-around">
                        <Button.Cancel type="button" value="Cancelar" width='w-52' onClick={onClose} />
                        <Button.Input type="button" value="Confirmar" width='w-52' onClick={onConfirm} />
                    </div>
                </Box>
            </Fade>
        </ModalComponent>
    )
}