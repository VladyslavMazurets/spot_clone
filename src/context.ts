import React from "react";

interface IContext {
    token: string,
    setToken: (val: string) => void
}

export const Context = React.createContext<IContext>({ token: '', setToken() { } })