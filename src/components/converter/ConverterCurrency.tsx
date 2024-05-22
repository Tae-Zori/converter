import React, { useState } from "react";
import MyInput from "../UI/input/MyInput";
import SectionCurrencies from "../sectionСurrencies/SectionCurrencies";
import cl from "./Converter.module.scss";
import { observer } from "mobx-react-lite";
import Modal from "../UI/modal/Modal";
import useCurrencies from "../../hooks/Currencies";
import ConverterStore from "../../store/ConverterStore";
import useConverter from "../../hooks/Converter";

const Converter = observer(({ id }: any) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    // const { valuteArray, defaultValute } = useCurrencies();
    // const store = React.useMemo(() => new ConverterStore(id), [id]);
    const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        fromAmount,
        setFromAmount,
        toAmount,
        setToAmount,
        rateFromTo,
        rateToFrom,
        valuteArray,
        defaultValute,
    } = useConverter();

    return (
        <article className={cl.converter}>
            <section className={cl.converter__item}>
                <SectionCurrencies
                    visibleModal={visibleModal}
                    defaultValute={defaultValute}
                    selectedCurrencyFromModal={fromCurrency}
                    selectedCurrency={fromCurrency}
                    setSelectedCurrency={setFromCurrency}
                />
                <MyInput
                    value={fromAmount}
                    onChange={(e) => setFromAmount(Number(e.target.value))}
                />
            </section>
            <button>
                <img
                    src={require("../../svg/exchange.svg").default}
                    alt="exchange"
                />
            </button>
            <section className={cl.converter__item}>
                <SectionCurrencies
                    visibleModal={visibleModal}
                    defaultValute={defaultValute}
                    selectedCurrencyFromModal={toCurrency}
                    selectedCurrency={toCurrency}
                    setSelectedCurrency={setToCurrency}
                />
                <MyInput
                    value={toAmount}
                    onChange={(e) => setToAmount(Number(e.target.value))}
                />
            </section>
            {visibleModal && <Modal currencies={valuteArray} />}
        </article>
    );
});
export default Converter;
