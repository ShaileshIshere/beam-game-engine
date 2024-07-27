import Logo from "../images/Beam-Logo.png"
import textLogo from "../images/text-logo.png";

export const AppBar = () => {
    
    return (
        <div className="relative">
            <div className="fixed top-0 left-0 bg-neutral-900 w-full flex items-center justify-center h-24 text-slate-200 px-8 py-7 z-10">
                <div className='flex items-center justify-center'>
                    <img src={ Logo } className='h-auto w-16 mx-1 cursor-pointer' />
                    <img src={ textLogo } className='h-auto w-36 cursor-pointer' />
                </div>
            </div>
        </div>
    );
}