import InputForm from "../UI/input/InputForm";
import SectionCurrencies from "../sectionCurrencies/SectionCurrencies";
import cl from "./Converter.module.scss";
import { observer } from "mobx-react-lite";
import Modal from "../UI/modal/Modal";
import useCurrencies from "../../hooks/Currencies";
import seLocalCurrencyConverter from "../../hooks/LocalCurrencyConverter";
import useCurrencyModalStore from "../../hooks/CurrencyModalStore";
import useConverterStore from "../../hooks/ConverterStore";

const Converter = observer(({ id }: { id: string }) => {
    const modalStore = useCurrencyModalStore(id);
    const { valuteArray, defaultValute } = useCurrencies();
    const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        fromSelectedCur,
        toSelectedCur,
        upDateSelected,
        handleClickExchange,
    } = seLocalCurrencyConverter({ id });
    const converterStore = useConverterStore(fromCurrency, toCurrency);

    return (
        <section className={cl.converter}>
            <div className={cl.converter__container}>
                <div className={cl.converter__item}>
                    <SectionCurrencies
                        visibleModal={modalStore.visibleModal}
                        defaultValute={defaultValute}
                        selectedCurrencyFromModal={fromSelectedCur}
                        selectedCurrency={fromCurrency}
                        setSelectedCurrency={setFromCurrency}
                        watcher={modalStore.watcher}
                        showMore={modalStore.handlerClickFor}
                        type="from"
                    />
                    <InputForm
                        value={converterStore?.fromAmount.toString()}
                        rate={converterStore?.rateFrom}
                        onChange={(e) => {
                            const value =
                                e.target.value === ""
                                    ? 0
                                    : Number(e.target.value);
                            if (!isNaN(value) && value >= 0) {
                                converterStore?.setFromAmount(value);
                            }
                        }}
                    />
                </div>
                <div className={cl.converter__exchange}>
                    <button onClick={handleClickExchange}>
                        <img
                            src={require("../../svg/exchange.svg").default}
                            alt="exchange"
                        />
                    </button>
                </div>
                <div className={cl.converter__item}>
                    <SectionCurrencies
                        visibleModal={modalStore.visibleModal}
                        defaultValute={defaultValute}
                        selectedCurrencyFromModal={toSelectedCur}
                        selectedCurrency={toCurrency}
                        setSelectedCurrency={setToCurrency}
                        watcher={modalStore.watcher}
                        showMore={modalStore.handlerClickTo}
                        type="to"
                    />
                    <InputForm
                        value={converterStore?.toAmount.toString()}
                        rate={converterStore?.rateTo}
                        onChange={(e) => {
                            const value =
                                e.target.value === ""
                                    ? 0
                                    : Number(e.target.value);
                            if (!isNaN(value) && value >= 0) {
                                converterStore?.setToAmount(value);
                            }
                        }}
                    />
                </div>
                {modalStore.visibleModal && (
                    <Modal
                        currencies={valuteArray}
                        handlerClick={upDateSelected}
                        watcher={modalStore.watcher}
                    />
                )}
            </div>
        </section>
    );
});
export default Converter;
