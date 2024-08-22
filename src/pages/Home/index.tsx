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
            <header id="home" className="bg-black h-full relative">
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
                    <div className='w-1/4 flex items-center justify-end'>
                        <a href="#home" className="flex items-center">
                            <img className="h-[4.5rem] pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                            <h4 className="text-2xl text-white ml-[-8px] font-bold">vulpix.<span className="text-purple">AI</span></h4>
                        </a>
                    </div>

                    <ul className="text-white-gray flex justify-center select-none w-1/2 mx-12">
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#home">Home</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#servicos">Serviços</a></li>
                        <li className="mx-4"><a className="hover:text-purple transition-all" href="#sobre">Sobre nós</a></li>
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
                        <h1 className="text-6xl font-bold mt-20 animate-slideDown">Seu Agente de <span className="text-purple select-none">Marketing</span>.</h1>
                        <TypeAnimation
                            sequence={[1200, 'Impulsione seu negócio com IA: Desenvolva campanhas únicas e impactantes em poucos minutos, \nutilizando o poder da Inteligência Artificial.']}
                            speed={50}
                            repeat={1}
                            style={{ whiteSpace: 'pre-line', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '2rem', textAlign: 'center', height: '3.5rem' }}
                        />
                        <a href="#servicos" className="h-14 px-5 text-nowrap text-xl bg-purple flex items-center text-white rounded-sm hover:px-7 duration-500 ease-in-out">Conheça nossos serviços</a>
                    </div>
                </div>

                <a href="#servicos" className="animate-fadeIn delay-700 opacity-0 absolute bottom-2 left-8 scale-[0.6] cursor-pointer w-[50px] h-[90px] rounded-[60px] border-solid border-[3px] border-white before:content-[''] before:w-[12px] before:h-[12px] before:absolute before:top-[10px] before:left-[50%] before:translate-x-[-50%] before:bg-white before:rounded-full before:opacity-100 before:animate-wheelDown before:delay-700"></a>
            </header>

            <section id="servicos">

            </section>

            <section id="sobre">

            </section>

            <section id="contato">

            </section>
        </div>
    )
}