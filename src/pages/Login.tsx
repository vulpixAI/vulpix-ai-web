import { useLastPage } from "../hooks/useLastPage";
import { Input } from "../components/Input";

export default function Login() {
    useLastPage();

    return (
        <div className='h-screen bg-black overflow-hidden flex'>
            <div className="h-full w-1/2">

            </div>
            <div className="h-full w-1/2 flex flex-col items-center justify-center">
                <form className="h-96 ">
                    <div className="flex flex-col">
                        <label className="text-purple mb-2 ml-3" htmlFor="inputEmail">E-mail</label>
                        <Input placeholder='Insira seu e-mail.' type='text' id="inputEmail" />
                    </div>
                </form>
            </div>
        </div>
    )
}