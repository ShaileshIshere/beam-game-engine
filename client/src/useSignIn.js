import { useRecoilValue, useRecoilState } from "recoil";
import { searchUsername, searchPassword, searchError } from "./atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useSignin = () => {
    const username = useRecoilValue(searchUsername);
    const password = useRecoilValue(searchPassword);
    const [errorMessage, setErrorMessage] = useRecoilState(searchError);
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (!username || !password) {
            setErrorMessage("Please fill in all the details");
            return;
        }

        try {
            // const response = await axios.post("http://localhost:3000/api/user/signin", {
            const response = await axios.post("https://beam-game-engine-server.vercel.app/api/user/signin", {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                console.error("Error response", error.response.data);
            } else if (error.request) {
                console.error("Error request", error.request);
            } else {
                console.error("Error message", error.message);
            }
        }
    };

    return { handleSignin };
};
