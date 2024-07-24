import { React, memo } from "react";
import { useSetRecoilState } from "recoil";
import { searchPassword } from "../atom";
import { InputBox } from "./InputBox";

export const PasswordInput = memo(() => {
    const setPassword = useSetRecoilState(searchPassword);

    return <InputBox onChange={(e) => setPassword(e.target.value)} label={"password"} />;
});