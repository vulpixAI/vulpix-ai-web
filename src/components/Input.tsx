import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Input<T extends FieldValues> {
    placeholder: string;
    type: string;
    id: string;
    name: Path<T>;
    register: UseFormRegister<T>;
}

export function Input<T extends FieldValues>({ placeholder, type, id, name, register }: Input<T>) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            id={id}
            className={`outline-none w-full h-12 rounded-lg bg-zinc-700 placeholder:blue-gray p-2 pl-4 text-blue-gray ${name == "password" || name == "confirmPassword" ? "pr-11" : ""}`}
            {...register(name)}
        />
    )
}