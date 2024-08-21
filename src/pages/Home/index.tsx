import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLastPage } from '../../hooks/useLastPage';
import { TypeAnimation } from 'react-type-animation';
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
            <header id="home" className="bg-black h-full">
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
                        <a href="#home"><img className="h-[4.5rem] pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" /></a>
                    </div>

                    <ul className="text-white-gray flex justify-center select-none w-1/2 mx-12">
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#home">Home</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#servicos">Serviços</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#produto">Produto</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#sobre-nos">Sobre nós</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#contato">Contato</a></li>
                    </ul>

                    <div className="w-1/4 flex items-center">
                        <div className='flex w-[172px]'>
                            <Link to="/login" className="h-8 mr-4 text-white-gray hover:text-purple transition-all flex items-center">Entrar</Link>
                            <Link to="/signup" className="h-8 px-3 text-nowrap bg-purple flex items-center text-white rounded-sm hover:bg-purple-dark transition-all">Inscrever-se</Link>
                        </div>
                    </div>
                </nav>

                <div className="flex flex-col justify-center items-center text-white-gray h-full">
                    <div className="flex flex-col items-center mt-[-2rem]">
                        <h1 className="text-6xl font-bold mt-20 animate-slideDown">Seu <span className="text-purple">Agente</span> de Marketing.</h1>
                        <TypeAnimation
                            sequence={[1200, 'Impulsione suas vendas com a utilização de Inteligência Artificial: personalize campanhas, \nsegmente públicos com precisão e automatize interações.']}
                            speed={50}
                            repeat={1}
                            style={{ whiteSpace: 'pre-line', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '2rem', textAlign: 'center', height: '3.5rem' }}
                        />
                        <a href="#servico" className="h-12 px-5 text-nowrap text-xl bg-purple flex items-center text-white rounded-sm hover:bg-purple-dark hover:px-7 duration-300 ease-in-out">Conheça nossos serviços</a>
                    </div>
                </div>
            </header>
        </div>
    )
}