import React from "react";

interface IContext {
    token: string,
    setToken: (val: string) => void,
    
    search: string,
    setSearch: (val: string) => void,

    code: string,
    setCode:(val: string) => void,
}

export const Context = React.createContext<IContext>({
    token: '', setToken() { },  search: '', setSearch() { }, code: '',
     setCode() {}
})