interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: string;
    id: string;
}

export function Input({placeholder, type, id}: Input){
    return (
        <input type={type} placeholder={placeholder} id={id} className="outline-none w-full h-12 rounded-lg bg-zinc-700 placeholder:blue-gray p-2 pl-4 text-blue-gray"/>
    )
}