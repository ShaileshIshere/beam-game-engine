import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchUsername, searchPassword, searchEmail, searchError } from "./atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";

export const useSignup = () => {
    const username = useRecoilValue(searchUsername);
    const password = useRecoilValue(searchPassword);
    const Email = useRecoilValue(searchEmail);
    const setErrorMessage = useSetRecoilState(searchError);
    const navigate = useNavigate();

    const handleSignup = useCallback (async () => {
        if (!Email || !username || !password) {
            setErrorMessage("Please fill in all the details");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:3000/api/user/signup", {
                Email,
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
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    }, [Email, username, password, navigate, setErrorMessage]);

    return { handleSignup }
}