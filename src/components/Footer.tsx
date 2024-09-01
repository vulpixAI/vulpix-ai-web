interface Footer {
    properties?: String
}

export function Footer({ properties = "" }: Footer) {
    return (
        <footer className={`w-full flex mobile:flex-col justify-center py-10 ${properties}`}>
            <div className="flex flex-col mobile:flex-row justify-start mobile:justify-center items-end mobile:items-center w-1/4 mobile:w-full">
                <div className="flex flex-col items-center mobile:-ml-8">
                    <div className="flex items-center select-none">
                        <img className="h-[4.5rem] pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                        <h4 className="text-2xl text-white ml-[-8px] font-bold">vulpix.<span className="text-purple">AI</span></h4>
                    </div>
                    <h4 className="text-white-gray ml-8 -mt-3 select-none">© 2024</h4>
                </div>
            </div>

            <div className="w-1/2 mobile:w-full flex justify-center items-start mobile:text-center mobile:my-8">
                <div className="flex flex-col justify-center mobile:items-center">
                    <h5 className="text-purple font-bold text-lg mb-1 select-none">Lorem Ipsum</h5>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                </div>

                <div className="flex flex-col justify-center mx-16 mobile:mx-5">
                    <h5 className="text-purple font-bold text-lg mb-1 select-none">Lorem Ipsum</h5>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                </div>

                <div className="flex flex-col justify-center">
                    <h5 className="text-purple font-bold text-lg mb-1 select-none">Lorem Ipsum</h5>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                    <a href="" className="text-white-gray my-1 hover:text-purple transition-all">Lorem</a>
                </div>
            </div>

            <div className="w-1/4 mobile:w-full flex flex-col justify-start mobile:items-center mobile:text-center">
                <div className="mobile:mb-2">
                    <h4 className="text-white-gray font-bold text-lg mb-1">Mídias Sociais</h4>
                    <div className="flex">
                        <a href="" target="_blank" className="hover:scale-[1.08] transition-all duration-500">
                            <img src="/linkedin.svg" alt="LinkedIn" className="h-8 pointer-events-none select-none" />
                        </a>

                        <a href="" target="_blank" className="hover:scale-[1.08] transition-all duration-500 mx-6">
                            <img src="/instagram.svg" alt="Instagram" className="h-8 pointer-events-none select-none" />
                        </a>

                        <a href="https://github.com/vulpixAI" target="_blank" className="hover:scale-[1.08] transition-all duration-500">
                            <img src="/github.svg" alt="GitHub" className="h-8 pointer-events-none select-none" />
                        </a>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="text-white-gray font-bold text-lg mb-1">Contato</h4>
                    <a href="mailto:contato@vulpixai.com" className="text-white-gray hover:text-purple transition-all cursor-pointer">contato@vulpixai.com</a>
                </div>
            </div>
        </footer>
    )
}