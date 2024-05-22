import React from "react";
import cl from "./SectionCurrencies.module.scss";
import { InfoCurrency } from "../../interfaces/interfaces";

interface IPropsSectionCurrencies {
    visibleModal: boolean;
    defaultValute: InfoCurrency[];
    selectedCurrencyFromModal: InfoCurrency | null;
    selectedCurrency: InfoCurrency;
    setSelectedCurrency: (currency: InfoCurrency) => void;
}

const SectionCurrencies = ({
    visibleModal,
    defaultValute,
    selectedCurrencyFromModal,
    selectedCurrency,
    setSelectedCurrency,
}: IPropsSectionCurrencies) => {
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
                        className={`${cl.currencyButton} ${
                            selectedCurrency.CharCode ===
                            selectedCurrencyFromModal?.CharCode
                                ? "active"
                                : "inactive"
                        }`}
                        onClick={(e) =>
                            setSelectedCurrency(selectedCurrencyFromModal)
                        }
                    >
                        {selectedCurrencyFromModal?.CharCode}
                    </button>
                )}
                <button>
                    {visibleModal ? (
                        <img
                            src={
                                require("../../svg/angle-small-up.svg").default
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
};
export default SectionCurrencies;
