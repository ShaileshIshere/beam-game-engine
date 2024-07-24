import { Header } from "../components/Header";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import Background from "../images/redBackground.jpg";
import { EmailInput } from "../components/EmailInput";
import { UsernameInput } from "../components/UsernameInput";
import { PasswordInput } from "../components/PasswordInput";
import { useSignup } from "../useSignup";
import { ErrorMessage } from "../components/ErrorMessage";
import { memo } from "react";

export const Signup = memo (() => {
    const { handleSignup } = useSignup();

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <img src={Background} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
            <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-black bg-opacity-30">
                <div className="absolute bg-zinc-900 w-1/3 h-2/3 px-7">
                    <Header label={"sign up"} />
                    <EmailInput />
                    <UsernameInput />
                    <PasswordInput />
                    <ErrorMessage />
                    <Button onClick={handleSignup} />
                    <BottomWarning linkText={"already have an account?"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
});
