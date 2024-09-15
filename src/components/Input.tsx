import { useState } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface Input<T extends FieldValues> {
    value: string | null,
    placeholder: string,
    type: string,
    id: string,
    name?: Path<T> | any,
    register?: UseFormRegister<T>,
    onBlurFunc?: any,
    isDisabled?: boolean,
    mask?: any
}

function InputComponent<T extends FieldValues>({ value, placeholder, type, id, name, register, onBlurFunc, isDisabled }: Input<T>) {
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
                value={value ? value : ""}
                type={type}
                id={id}
                {...(register && name ? register(name) : {})}
                onFocus={() => setOnFocus(true)}
                onBlur={() => { setOnFocus(false); onBlurFunc && onBlurFunc(value) }}
                disabled={isDisabled}
            />
        </div>
    )
}

function InputMaskComponent<T extends FieldValues>({ value, placeholder, type, id, name, register, onBlurFunc, isDisabled, mask }: Input<T>) {
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

            <InputMask
                className={`relative outline-none w-full h-12 rounded-lg bg-transparent disabled:cursor-no-drop border-2 ${isOnFocus ? "border-purple" : "border-zinc-600"} placeholder:blue-gray p-2 pl-4 text-blue-gray ${name == "password" || name == "confirmPassword" ? "pr-11" : ""}`}
                value={value ? value : ""}
                type={type}
                id={id}
                {...(register && name ? register(name) : {})}
                onFocus={() => setOnFocus(true)}
                onBlur={() => { setOnFocus(false); onBlurFunc && onBlurFunc(value) }}
                disabled={isDisabled}
                mask={mask}
            />
        </div>
    )
}

export const Input = {
    Input: InputComponent,
    Mask: InputMaskComponent
}