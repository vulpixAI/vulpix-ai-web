interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: string;
}

export function Input({placeholder, type}: Input){
    return (
        <input type={type} placeholder={placeholder} className="outline-none w-full rounded-lg bg-zinc-700 placeholder:blue-gray p-2 pl-4 text-blue-gray"/>
    )
}