import { InputBox } from "../components/InputBox";
import { Header } from "../components/Header";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../images/redBackground.jpg";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (!username || !password) {
            setErrorMessage("Please fill in all the details");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/user/signin", {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            if (error.response)
                console.error("Error response", error.response.data);
            else if (error.request)
                console.error("Error request", error.request);
            else
                console.error("Error message", error.message);
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <img src={Background} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
            <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-black bg-opacity-30">
                <div className="absolute bg-zinc-900 w-1/3 h-2/3 px-7">
                    <Header label={"sign in"} />
                    <InputBox onChange={(e) => 
                        setUsername(e.target.value)
                    } label={"username"} />
                    <InputBox onChange={(e) => 
                        setPassword(e.target.value)
                    } label={"password"} />
                    {errorMessage && <div className="text-red-700 text-center mb-2">{errorMessage}</div>}
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
