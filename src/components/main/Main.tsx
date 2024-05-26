import React, { useEffect, useState } from "react";
import cl from "./Main.module.scss";
import Converter from "../converter/ConverterCurrency";
import useConverterManager from "../../hooks/ConverterManager";
import Loader from "../UI/loader/Loader";

const Main = () => {
    const { converters, addConverter, removeConverter, loading } =
        useConverterManager();

    return (
        <main className={cl.main}>
            {loading ? (
                <Loader />
            ) : (
                <div className={cl.main__wrapper}>
                    <Converter id="defaultConverter" />
                    {converters.length > 0 &&
                        converters.map((id: string) => (
                            <div key={id} className={cl.main__addedConverners}>
                                <div className={cl.main__remove}>
                                    <button onClick={() => removeConverter(id)}>
                                        X
                                    </button>
                                </div>
                                <Converter id={id} />
                            </div>
                        ))}
                    <button
                        className={cl.main__addConverter}
                        onClick={addConverter}
                    >
                        Добавить конвертер
                    </button>
                </div>
            )}
        </main>
    );
};

export default Main;
