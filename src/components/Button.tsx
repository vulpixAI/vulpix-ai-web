import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Button extends React.InputHTMLAttributes<any> {
    uri?: string,
    type?: "button" | "reset" | "submit",
    width?: string,
    children?: ReactNode
}

function NavigateButton({ uri = "", children }: Button) {
    return (
        <Link to={uri} className="h-12 px-8 text-nowrap bg-transparent text-lg border-solid border-2 border-purple flex items-center justify-center text-white rounded-md hover:bg-purple transition-all">
            {children}
        </Link>
    )
}

function PurpleButton({ type, width = "w-full", children, ...props }: Button) {
    return (
        <button type={type} className={`h-12 ${width} text-nowrap bg-purple border-solid border-purple border-2 text-lg flex items-center justify-center text-white rounded-md hover:bg-purple-dark hover:border-purple-dark transition-all cursor-pointer select-none disabled:cursor-no-drop`} {...props}>
            {children}
        </button>
    )
}

function TransparentButton({ type, width = "w-full", children, ...props }: Button) {
    return (
        <button type={type} className={`h-12 ${width} text-nowrap bg-transparent border-solid border-purple border-2 text-lg flex items-center justify-center text-white rounded-md hover:bg-purple transition-all cursor-pointer select-none disabled:cursor-no-drop`} {...props}>
            {children}
        </button>
    )
}

export const Button = {
    Navigate: NavigateButton,
    Purple: PurpleButton,
    Transparent: TransparentButton
}