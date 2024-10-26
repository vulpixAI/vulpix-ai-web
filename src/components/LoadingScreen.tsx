export function LoadingScreen() {
    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center flex-col fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50">
            <div className="flex flex-col items-center justify-center -mt-60">
                <div className="flex items-center select-none">
                    <img className="h-[6.5rem] pointer-events-none" src="/vulpixai-logo.jpeg" alt="Logo vulpix.AI" />
                    <h4 className="text-3xl text-white ml-[-16px] font-bold">vulpix.<span className="text-purple">AI</span></h4>
                </div>
                <div className="bg-slate-800 rounded-full h-[0.2rem] relative w-48 overflow-hidden ml-10 mt-4">
                    <div className="bg-purple rounded-full absolute bottom-0 top-0 w-1/2 animate-indeterminateProgressBar"></div>
                </div>
            </div>
        </div>
    )
}