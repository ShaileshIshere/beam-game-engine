import { atom } from "recoil";

export const searchTermState = atom({
    key: "searchTermState",
    default: ""
});

export const searchUsername = atom({
    key: "searchUsername",
    default: ""
});

export const searchPassword = atom({
    key: "searchPassword",
    default: ""
});

export const searchError = atom({
    key: "searchError",
    default: ""
});

export const searchEmail = atom({
    key: "searchEmail",
    default: ""
});