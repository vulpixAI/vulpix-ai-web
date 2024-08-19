import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    const [lastPage, setLastPage] = useState<String | null>();

    useEffect(() => {
        setLastPage(sessionStorage.getItem("lastPage"));
    }, []);

    return (
        <div className='h-screen bg-black overflow-hidden flex justify-center items-center'>
            <img className="h-[404px] mr-20 pointer-events-none select-none" src="/monster-404.svg" alt="Monster 404" />

            <div className="flex flex-col items-start ml-20">
                <h1 className="text-white-gray text-3xl font-medium">Ooops!</h1>
                <h2 className="text-white-gray text-2xl font-medium w-80 my-8 text-start">Parece que o monstrinho devorou a página que você estava procurando...</h2>
                {
                    lastPage
                        ?
                        <Link to={"" + lastPage} className="h-10 px-4 bg-purple flex items-center text-white text-xl rounded-sm hover:bg-purple-dark transition-all">Voltar</Link>
                        :
                        <Link to="/" className="h-10 px-4 bg-purple flex items-center text-white text-xl rounded-sm hover:bg-purple-dark transition-all">Ir para a Home</Link>
                }
            </div>
        </div>
    )
}