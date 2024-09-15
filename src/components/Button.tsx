import { Link } from "react-router-dom";

interface Button extends React.InputHTMLAttributes<InnerHTML> {
    uri?: string;
    value: string;
    type?: string;
    width?: string;
}

function NavigateButton({ uri = "", value }: Button) {
    return (
        <Link to={uri} className="h-12 px-8 text-nowrap bg-transparent text-lg border-solid border-2 border-purple flex items-center justify-center text-white rounded-md hover:bg-purple transition-all">
            {value}
        </Link>
    )
}

function InputButton({ value, type, width = "w-full", ...props }: Button) {
    return (
        <input value={value} type={type} className={`h-12 ${width} px-4 text-nowrap bg-purple text-lg flex items-center justify-center text-white rounded-md hover:bg-purple-dark transition-all cursor-pointer`} {...props} />
    )
}

function TransparentInputButton({ value, type, width = "w-full", ...props }: Button) {
    return (
        <input value={value} type={type} className={`h-12 ${width} px-4 text-nowrap bg-transparent border-solid border-purple border-2 text-lg flex items-center justify-center text-white rounded-md hover:bg-purple transition-all cursor-pointer`} {...props} />
    )
}

export const Button = {
    Navigate: NavigateButton,
    Input: InputButton,
    Transparent: TransparentInputButton
}