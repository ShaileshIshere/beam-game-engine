import { React, memo } from "react";
import { useSetRecoilState } from "recoil";
import { searchUsername } from "../atom";
import { InputBox } from "./InputBox";

export const UsernameInput = memo(() => {
    const setUsername = useSetRecoilState(searchUsername);

    return <InputBox onChange={(e) => setUsername(e.target.value)} label={"username"} />;
});