import { useLastPage } from "../hooks/useLastPage";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
    useLastPage();

    return (
        <div className='h-screen bg-black overflow-hidden flex'>
            <div className="h-full w-[60%] bg-login bg-cover bg-no-repeat">
            </div>
            <div className="h-full w-[40%] flex flex-col items-center justify-center">
            <div className="h-40 flex items-center justify-start flex-col mb-10">
                <h1 className=" text-5xl font-semibold text-white-gray">Bem-vindo de volta!</h1>
                <p className="text-white-gray mt-3 text-lg">Conecte-se para prosseguir.</p>
            </div>
                <form className="h-96 w-80">
                    <div className="flex flex-col">
                        <label className="text-white-gray mb-2 ml-3" htmlFor="inputEmail">E-mail</label>
                        <Input placeholder='Insira seu e-mail.' type='text' id="inputEmail"/>
                    </div>
                    <div className="flex flex-col mt-4 mb-8 relative">
                        <label className="text-white-gray mb-2 ml-3" htmlFor="inputPassword">Senha</label>
                        <Input placeholder='Insira sua senha.' type='password' id="inputPassword"/>
                        <Visibility className="absolute right-3 top-11 text-white-gray cursor-pointer"/>
                       <VisibilityOff className="absolute right-3 top-11 text-white-gray cursor-pointer"/> 
                    </div>
                    <div className="mb-5 flex justify-end">
                        <a href="#esqueci-senha" className="text-purple text- text-sm">Esqueci minha senha</a>             
                    </div>
                    <Button.Input value='Entrar'/>
                    <div className="flex justify-center items-start">
                        <p className="text-white-gray mt-8 whitespace-nowrap select-none">Ainda não possui uma conta? <a href="/signup" className="text-purple">Inscreva-se</a>.</p>
                    </div>
                </form>
            </div>
        </div>
    )
}