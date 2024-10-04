import CheckIcon from '@mui/icons-material/Check';

interface SignUpProgressBar {
    step: number
}

export function SignUpProgressBar({ step }: SignUpProgressBar) {
    return (
        <div className="flex justify-center items-center my-5 select-none">
            <span className={`w-1 h-1 rounded-full p-[10px] border-[1px] flex justify-center items-center text-white-gray text-xs ${step == 1 && "border-purple"} ${step >= 2 && "border-purple bg-purple"}`}>
                {step == 1 ? "1" : <CheckIcon sx={{ fontSize: 14, color: "#c3d1dc" }} />}
            </span>

            <div className={`h-[1px] w-8 mx-1 ${step >= 2 ? "bg-purple" : "bg-white-gray"}`}></div>

            <span className={` w-2 h-2 rounded-full p-[10px] border-[1px] flex justify-center items-center text-white-gray text-xs ${step == 2 && "border-purple"} ${step >= 3 && "border-purple bg-purple"}`}>
                {step >= 3 ? <CheckIcon sx={{ fontSize: 14, color: "#c3d1dc" }} /> : "2"}
            </span>

            <div className={`h-[1px] w-8 mx-1 ${step == 3 ? "bg-purple" : "bg-white-gray"}`}></div>

            <span className={`w-2 h-2 rounded-full p-[10px] border-[1px] flex justify-center items-center text-white-gray text-xs ${step == 3 && "border-purple"} ${step == 4 && "border-purple bg-purple"}`}>
                {step == 4 ? <CheckIcon sx={{ fontSize: 14, color: "#c3d1dc" }} /> : "3"}
            </span>
        </div>
    )
}