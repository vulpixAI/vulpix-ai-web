import { useState } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Input<T extends FieldValues> {
    value: string | null,
    placeholder: string,
    type: string,
    maxLength?: number,
    id: string,
    name?: Path<T> | any,
    register?: UseFormRegister<T>,
    onBlur?: any,
    onChange?: any
}

export function Input<T extends FieldValues>({ value, placeholder, type, maxLength, id, name, register, onBlur, onChange }: Input<T>) {
    const [isOnFocus, setOnFocus] = useState<Boolean>(false);

    return (
        <div className="relative">
            {value
                ?
                <label
                    className={`${isOnFocus ? "text-purple" : "text-slate-400"} text-sm px-1 bg-black absolute left-4 -top-[9px] transition-all select-none z-10`}
                    htmlFor={id}
                >
                    {placeholder}
                </label>
                :
                <label
                    className={isOnFocus ? "text-purple text-sm px-1 bg-black absolute left-4 -top-[9px] transition-all select-none z-10" : "text-slate-400 bg-black absolute left-4 top-3 transition-all cursor-text select-none"}
                    htmlFor={id}
                >
                    {placeholder}
                </label>
            }

            <input
                className={`relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 ${isOnFocus ? "border-purple" : "border-zinc-600"} placeholder:blue-gray p-2 pl-4 text-blue-gray ${name == "password" || name == "confirmPassword" ? "pr-11" : ""}`}
                value={value || ""}
                type={type}
                maxLength={maxLength}
                id={id}
                {...(register && name ? register(name) : {})}
                onFocus={() => setOnFocus(true)}
                onBlur={() => { setOnFocus(false); onBlur && onBlur(value) }}
                {...(onChange ? { onChange: onChange } : {})}
            />
        </div>
    )
}