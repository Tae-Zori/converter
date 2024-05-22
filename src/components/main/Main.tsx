import React from "react";
import cl from "./Main.module.scss";
import Converter from "../converter/ConverterCurrency";

const Main = () => {
    return (
        <main className={cl.main}>
            <div className={cl.main__wrapper}>
                <Converter id="defaultConverter" />
            </div>
        </main>
    );
};
export default Main;
