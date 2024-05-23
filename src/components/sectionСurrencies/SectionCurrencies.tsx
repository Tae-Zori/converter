import React from "react";
import cl from "./SectionCurrencies.module.scss";
import { InfoCurrency } from "../../interfaces/interfaces";
import { observer } from "mobx-react-lite";
interface IPropsSectionCurrencies {
    visibleModal: boolean;
    defaultValute: InfoCurrency[];
    selectedCurrencyFromModal: InfoCurrency | null;
    selectedCurrency: InfoCurrency;
    setSelectedCurrency: (currency: InfoCurrency) => void;
    watcher: string;
    showMore: () => void;
    type: string;
}

const SectionCurrencies = observer(
    ({
        visibleModal,
        defaultValute,
        selectedCurrencyFromModal,
        selectedCurrency,
        setSelectedCurrency,
        watcher,
        showMore,
        type,
    }: IPropsSectionCurrencies) => {
        const isVisible = visibleModal && watcher === type;

        return (
            <div className={cl.currencies}>
                <div className={cl.currencies__wrapper}>
                    {defaultValute.map((item) => (
                        <button
                            key={item.ID}
                            className={`${cl.currencies__button} ${
                                selectedCurrency.CharCode === item.CharCode
                                    ? cl.active
                                    : cl.inactive
                            }`}
                            onClick={(e) => {
                                setSelectedCurrency(item);
                            }}
                        >
                            {item.CharCode}
                        </button>
                    ))}
                    {selectedCurrencyFromModal && (
                        <button
                            className={`${cl.currencies__button} ${
                                selectedCurrency.CharCode ===
                                selectedCurrencyFromModal.CharCode
                                    ? cl.active
                                    : cl.inactive
                            }`}
                            onClick={(e) =>
                                setSelectedCurrency(selectedCurrencyFromModal)
                            }
                        >
                            {selectedCurrencyFromModal?.CharCode}
                        </button>
                    )}
                    <button onClick={showMore}>
                        {isVisible ? (
                            <img
                                src={
                                    require("../../svg/angle-small-up.svg")
                                        .default
                                }
                                alt="close modal"
                            />
                        ) : (
                            <img
                                src={
                                    require("../../svg/angle-small-down.svg")
                                        .default
                                }
                                alt="open modal"
                            />
                        )}
                    </button>
                </div>
            </div>
        );
    }
);
export default SectionCurrencies;
