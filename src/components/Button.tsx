import { Link } from "react-router-dom";

interface Button {
    uri?: string
    value: string,
}

function NavigateButton({ uri = "", value }: Button) {
    return (
        <Link to={uri} className="h-12 px-8 text-nowrap bg-transparent text-lg border-solid border-2 border-purple flex items-center justify-center text-white rounded-md hover:bg-purple transition-all">
            {value}
        </Link>
    )
}

function InputButton({ value }: Button) {
    return (
        <input value={value} type="submit" className="h-12 w-full px-4 text-nowrap bg-purple text-lg flex items-center justify-center text-white rounded-md hover:bg-purple-dark transition-all cursor-pointer" />
    )
}

export const Button = {
    Navigate: NavigateButton,
    Input: InputButton
}