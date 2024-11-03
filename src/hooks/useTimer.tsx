import { useState, useEffect } from 'react';

export default function useTimer() {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [isRunning, setRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: any = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((seg) => {
                    if (seg == 59) {
                        setMinutes((min: number) => min + 1);
                        return 0;
                    } else {
                        return seg + 1;
                    }
                });
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const startTimer = () => setRunning(true);
    const resetTimer = () => {
        setRunning(false);
        setSeconds(0);
        setMinutes(0);
    };

    return { seconds, minutes, startTimer, resetTimer };
}