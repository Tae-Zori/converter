import React, { useRef, useState } from "react";
import MyInput from "../UI/input/MyInput";
import SectionCurrencies from "../sectionСurrencies/SectionCurrencies";
import cl from "./Converter.module.scss";
import { observer } from "mobx-react-lite";
import Modal from "../UI/modal/Modal";
import useCurrencies from "../../hooks/Currencies";
import useConverter from "../../hooks/Converter";
import ConverterStore from "../../store/ConverterStore";

const Converter = observer(({ id }: { id: string }) => {
    const storeRef = useRef<ConverterStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = new ConverterStore(id);
    }
    const converterStore = storeRef.current;

    const { valuteArray, defaultValute } = useCurrencies();
    const {
        fromCurrency,
        upDateFromCurrency,
        toCurrency,
        upDateToCurrency,
        fromAmount,
        setFromAmount,
        toAmount,
        setToAmount,
        rateFromTo,
        rateToFrom,
        fromSelectedCur,
        toSelectedCur,
        upDateSelected,
    } = useConverter();

    return (
        <article className={cl.converter}>
            <section className={cl.converter__item}>
                <SectionCurrencies
                    visibleModal={converterStore.visibleModal}
                    defaultValute={defaultValute}
                    selectedCurrencyFromModal={fromSelectedCur}
                    selectedCurrency={fromCurrency}
                    setSelectedCurrency={upDateFromCurrency}
                    watcher={converterStore.watcher}
                    showMore={converterStore.handlerClickFor}
                    type="from"
                />
                <MyInput
                    value={fromAmount}
                    onChange={(e) => setFromAmount(Number(e.target.value))}
                />
                <p>{rateFromTo}</p>
            </section>
            <button>
                <img
                    src={require("../../svg/exchange.svg").default}
                    alt="exchange"
                />
            </button>
            <section className={cl.converter__item}>
                <SectionCurrencies
                    visibleModal={converterStore.visibleModal}
                    defaultValute={defaultValute}
                    selectedCurrencyFromModal={toSelectedCur}
                    selectedCurrency={toCurrency}
                    setSelectedCurrency={upDateToCurrency}
                    watcher={converterStore.watcher}
                    showMore={converterStore.handlerClickTo}
                    type="to"
                />
                <MyInput
                    value={toAmount}
                    onChange={(e) => setToAmount(Number(e.target.value))}
                />
                <p>{rateToFrom}</p>
            </section>
            {converterStore.visibleModal && (
                <Modal
                    currencies={valuteArray}
                    handlerClick={upDateSelected}
                    watcher={converterStore.watcher}
                />
            )}
        </article>
    );
});
export default Converter;
