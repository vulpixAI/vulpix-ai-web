import { useLastPage } from "../hooks/useLastPage";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Login() {
    useLastPage();

    return (
        <div className='h-screen bg-black overflow-hidden flex'>
            <div className="h-full w-1/2">

            </div>
            <div className="h-full w-1/2 flex flex-col items-center justify-center">
            <div className="h-52 flex items-center justify-center flex-col">
                <h1 className=" text-4xl font-semibold text-white-gray">Bem-vindo de volta!</h1>
                <p className="text-white-gray mt-3">Conecte-se para prosseguir.</p>
            </div>
                <form className="h-96 w-80">
                    <div className="flex flex-col">
                        <label className="text-white-gray mb-2 ml-3" htmlFor="inputEmail">E-mail</label>
                        <Input placeholder='Insira seu e-mail.' type='text' id="inputEmail" />
                    </div>
                    <div className="flex flex-col mt-4 mb-8">
                        <label className="text-white-gray mb-2 ml-3" htmlFor="inputEmail">Senha</label>
                        <Input placeholder='Insira sua senha.' type='password' id="inputEmail" />
                    </div>
                    <div>
                        <a href="#esqueci-senha" className="text-purple text-">Esqueci minha senha</a>             
                    </div>
                    <Button.Input value='Entrar' bgColor='purple' hoverColor='purple-dark' />
                </form>
            </div>
        </div>
    )
}