import { useState } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker as TimePickerComponent } from '@mui/x-date-pickers/TimePicker';
import { ThemeProvider } from '@mui/material/styles';
import { datePickerTheme, timePickerTheme } from "../styles/themes";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/pt-br';

interface GenericInput<T extends FieldValues> {
    value: string | null,
    placeholder: string,
    type: string,
    maxLength?: number,
    id?: string,
    name?: Path<T>,
    register?: UseFormRegister<T>,
    onBlur?: any,
    onChange?: React.ChangeEventHandler
}

interface DateTimePicker {
    value: Dayjs | null,
    onChange: any,
    minDate?: Dayjs,
    maxDate?: Dayjs
}

interface DateRangePicker {
    valueStart: Dayjs | null,
    maxDateStart: Dayjs,
    onChangeStart: any,
    valueEnd: Dayjs | null,
    minDateEnd: Dayjs,
    onChangeEnd: any
}

function GenericInput<T extends FieldValues>({ value, placeholder, type, maxLength, id, name, register, onBlur, onChange }: GenericInput<T>) {
    const [isOnFocus, setOnFocus] = useState<boolean>(false);

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

function ModalInput<T extends FieldValues>({ value, placeholder, type, maxLength, id, name, register, onBlur, onChange }: GenericInput<T>) {
    const [isOnFocus, setOnFocus] = useState<boolean>(false);

    return (
        <div className="relative">
            {value
                ?
                <label
                    className={`${isOnFocus ? "text-purple" : "text-slate-400"} text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10`}
                    htmlFor={id}
                >
                    {placeholder}
                </label>
                :
                <label
                    className={isOnFocus ? "text-purple text-sm px-1 bg-dark-gray absolute left-4 -top-[9px] transition-all select-none z-10" : "text-slate-400 bg-dark-gray absolute left-4 top-3 transition-all cursor-text select-none"}
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

function DatePicker({ onChange, value, minDate, maxDate }: DateTimePicker) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <ThemeProvider theme={datePickerTheme}>
                <DesktopDatePicker
                    {...(onChange ? { onChange: onChange } : {})}
                    value={value}
                    minDate={minDate}
                    maxDate={maxDate}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: '#c3d1dc'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5d5aff'
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5d5aff'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5d5aff'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': {
                            boxShadow: 'none'
                        },
                        '& .MuiInputBase-input': {
                            paddingTop: '16px',
                            paddingBottom: '16px',
                            paddingLeft: '24px'
                        },
                        '& .MuiIconButton-root': {
                            color: '#5d5aff',
                            '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        },
                        width: "166px",
                        marginRight: "8px"
                    }} />
            </ThemeProvider>
        </LocalizationProvider>
    )
}

function TimePicker({ onChange, value }: DateTimePicker) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <ThemeProvider theme={timePickerTheme}>
                <TimePickerComponent
                    {...(onChange ? { onChange: onChange } : {})}
                    value={value}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: '#c3d1dc'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5d5aff'
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5d5aff'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5d5aff'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': {
                            boxShadow: 'none'
                        },
                        '& .MuiInputBase-input': {
                            paddingTop: '16px',
                            paddingBottom: '16px',
                            paddingLeft: '24px'
                        },
                        '& .MuiIconButton-root': {
                            color: '#5d5aff !important',
                            '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        },
                        width: "166px",
                        marginLeft: "8px"
                    }} />
            </ThemeProvider>
        </LocalizationProvider>
    )
}

function DateRangePicker({ valueStart, maxDateStart, onChangeStart, valueEnd, minDateEnd, onChangeEnd }: DateRangePicker) {
    return (
        <>
            <div className="flex flex-col">
                <label className="ml-2 mb-1">Início</label>
                <Input.DatePicker maxDate={maxDateStart} value={valueStart} onChange={onChangeStart} />
            </div>
            <span className="text-white-gray text-xl mr-2 mt-6 select-none">–</span>
            <div className="flex flex-col">
                <label className="ml-2 mb-1">Fim</label>
                <Input.DatePicker minDate={minDateEnd} maxDate={dayjs()} value={valueEnd} onChange={onChangeEnd} />
            </div>
        </>
    )
}

export const Input = {
    Input: GenericInput,
    Modal: ModalInput,
    DatePicker: DatePicker,
    TimePicker: TimePicker,
    DateRangePicker: DateRangePicker
}