import { Link } from 'react-router-dom';

interface Drawer {
    isMenuOpened: Boolean,
    setMenuOpened: () => void
}

export function Drawer({ isMenuOpened, setMenuOpened }: Drawer) {
    return (
        <div className={`bg-black/95 backdrop-blur-sm z-20 fixed h-full w-full hidden mobile:flex flex-col items-center justify-center ease-in-out duration-500 ${isMenuOpened ? "translate-x-[0]" : "translate-x-[100%]"}`}>
            <ul className="text-white-gray text-xl flex flex-col justify-center items-center select-none w-1/2 mx-12">
                <li className="mx-4 flex items-center my-5"><a className="hover:text-purple transition-all" href="#home" onClick={setMenuOpened}>Home</a></li>
                <li className="mx-4 flex items-center my-5"><a className="hover:text-purple transition-all" href="#galeria" onClick={setMenuOpened}>Galeria</a></li>
                <li className="mx-4 flex items-center my-5"><a className="hover:text-purple transition-all" href="#planos" onClick={setMenuOpened}>Planos</a></li>
                <li className="mx-4 flex items-center text-nowrap my-5"><a className="hover:text-purple transition-all" href="#perguntas" onClick={setMenuOpened}>Perguntas Frequentes</a></li>
            </ul>

            <div className="flex items-center justify-center w-[246px] mt-16">
                <Link to="/login" className="h-8 mr-8 text-white-gray text-xl hover:text-purple transition-all flex items-center">Entrar</Link>
                <Link to="/signup" className="h-12 px-4 text-nowrap text-xl bg-purple flex items-center text-white rounded-md hover:bg-purple-dark transition-all">Inscrever-se</Link>
            </div>
        </div>
    )
}