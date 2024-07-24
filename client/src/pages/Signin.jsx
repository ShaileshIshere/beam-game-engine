import { Header } from "../components/Header";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import Background from "../images/redBackground.jpg";
import { useSignin } from "../useSignIn";
import { PasswordInput } from "../components/PasswordInput";
import { UsernameInput } from "../components/UsernameInput";
import { ErrorMessage } from "../components/ErrorMessage";

export const Signin = () => {
    const { handleSignin } = useSignin();

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <img src={Background} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
            <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-black bg-opacity-30">
                <div className="absolute bg-zinc-900 w-1/3 h-2/3 px-7">
                    <Header label={"sign in"} />
                    <UsernameInput />
                    <PasswordInput />
                    <ErrorMessage />
                    <div className="text-md text-center text-stone-600">
                        {("if you don't know your username and password, then it's time to create one").toUpperCase()}
                    </div>
                    <div className="flex flex-col items-center pb-5 pt-3">
                        <Button onClick={handleSignin} />
                        <BottomWarning linkText={"create account"} to={"/"} />
                    </div>
                </div>
            </div>
        </div>
    );
};
