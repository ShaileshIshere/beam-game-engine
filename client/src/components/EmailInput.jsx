import {React, memo } from "react";
import { useSetRecoilState } from "recoil";
import { searchEmail } from "../atom";
import { InputBox } from "./InputBox";

export const EmailInput = memo(() => {
    const setEmail = useSetRecoilState(searchEmail);

    return <InputBox onChange={(e) => setEmail(e.target.value)} label={"e-mail"} />;
});