'use client'

import { store } from "@/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import Notes from "./notes/page";

export default function App({Component, pageProps}: AppProps){
return(
    <Provider store={store}>
        <Notes/>
    </Provider>
)
}