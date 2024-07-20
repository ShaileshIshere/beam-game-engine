import { InputBox } from "../components/InputBox";
import { Header } from "../components/Header";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../images/redBackground.jpg";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try{
            const response = await axios.post("http://localhost:3000/api/user/signup", {
                Email,
                username,
                password
            })
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error("Error response", error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error("Error request", error.request);
            } else {
                // Something else happened while setting up the request
                console.error("Error message", error.message);
            }
        }
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <img src={Background} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
            <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-black bg-opacity-30">
                <div className="absolute bg-zinc-900 w-1/3 h-2/3 px-7">
                    <Header label={"sign up"} />
                    <InputBox onChange={(e) => {
                        setEmail(e.target.value);
                    }} label={"e-mail"} />
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value);
                    }} label={"username"} />
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value);
                    }} label={"password"} />
                    <Button onClick={handleSignup}/>
                    <BottomWarning linkText={"already have an account?"} to={"/signin"}/>
                </div>
            </div>
        </div>
    );
}