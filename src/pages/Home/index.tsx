import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLastPage } from '../../hooks/useLastPage';
import 'aos/dist/aos.css'
import AOS from 'aos';

export default function Home() {
    useLastPage();

    const [wasScrolled, setWasScrolled] = useState<Boolean>(false);
    const [navBackgroundColor, setNavBackgroundColor] = useState<String>("transparent");

    useEffect(() => {
        window.addEventListener("scroll", () => window.scrollY > 0 ? setWasScrolled(true) : setWasScrolled(false));
        AOS.init();
    }, []);

    useEffect(() => wasScrolled ? setNavBackgroundColor("bg-gray/85") : setNavBackgroundColor("transparent"), [wasScrolled]);

    return (
        <div className='h-screen bg-black'>
            <header id="header" className="bg-black">
                <div className={"absolute w-full flex justify-center items-center h-20 top-0"}>
                    <div className='w-1/4'></div>
                    <div className="w-1/2 mx-12"></div>
                    <div className="w-1/4 flex">
                        <div className='w-[1000px] h-[650px] overflow-hidden'>
                            <img src="src/assets/waves.svg" className="scale-[1.7] mt-[320px] ml-[70px] select-none pointer-events-none" />
                        </div>
                    </div>
                </div>

                <nav className={"fixed z-10 w-full flex justify-center items-center h-20 top-0 transition-all duration-300 " + navBackgroundColor}>
                    <div className='w-1/4 flex justify-end'>
                        <img className="h-[4.5rem] pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                    </div>

                    <ul className="text-white-gray flex justify-center select-none w-1/2 mx-12">
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="">Features</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="">Planos</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="">Documentação</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="">Sobre nós</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="">Contato</a></li>
                    </ul>

                    <div className="w-1/4 flex items-center">
                        <div className='relative flex w-[172px]'>
                            <Link to="/login" className="h-8 mr-4 text-white-gray hover:text-purple transition-all flex items-center">Entrar</Link>
                            <Link to="/signup" className="h-8 px-3 text-nowrap bg-purple flex items-center text-white rounded-sm hover:bg-purple-dark transition-all">Inscrever-se</Link>
                        </div>
                    </div>
                </nav>

                <div className="flex flex-col justify-center items-center pt-20 text-white-gray">
                    <h1 className="text-4xl font-bold mt-20">Seu agente de marketing.</h1>
                    <p className="mt-4 text-md">Impulsione suas vendas com IA: personalize campanhas, <br /> segmente públicos com precisão e automatize interações.</p>
                    <div className="bg-white h-[450px] w-[75%] mt-20 rounded-sm"></div>
                </div>
            </header>
        </div>
    )
}