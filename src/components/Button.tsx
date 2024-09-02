import { Link } from "react-router-dom";

interface Button {
    uri?: string
    value: string,
    bgColor?: string,
    hoverColor?: string
}

function NavigateButton({ uri = "", value, bgColor, hoverColor }: Button) {
    return (
        <Link to={uri} className={`h-12 px-8 text-nowrap bg-${bgColor ? bgColor : "transparent"} text-lg border-solid border-2 border-purple flex items-center justify-center text-white rounded-md hover:bg-${hoverColor ? hoverColor : "purple"} transition-all`}>
            {value}
        </Link>
    )
}

function InputButton({ value, bgColor, hoverColor }: Button) {
    return (
        <input value={value} type="submit" className={`h-9 px-4 text-nowrap bg-${bgColor ? bgColor : "purple"} text-lg flex items-center justify-center text-white rounded-md hover:bg-${hoverColor ? hoverColor : "purple-dark"} transition-all cursor-pointer`} />
    )
}

export const Button = {
    Navigate: NavigateButton,
    Input: InputButton
}