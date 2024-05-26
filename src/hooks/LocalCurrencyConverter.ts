import { useState } from "react";
import { InfoCurrency } from "../interfaces/interfaces";
import { defaultRub } from "../data/DefaultCurrency";

const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Failed to load data from LocalStorage:", error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setStoredValue(value);
        } catch (error) {
            console.error("Failed to save data to LocalStorage:", error);
        }
    };

    return [storedValue, setValue];
};

const useLocalCurrencyConverter = ({ id }: { id: string }) => {
    const [fromCurrency, setFromCurrency] = useLocalStorage(
        `${id}_fromCurrency`,
        defaultRub
    );
    const [toCurrency, setToCurrency] = useLocalStorage(
        `${id}_toCurrency`,
        defaultRub
    );
    const [fromSelectedCur, setFromSelectedCur] = useLocalStorage(
        `${id}_fromSelectedCurrency`,
        null
    );
    const [toSelectedCur, setToSelectedCur] = useLocalStorage(
        `${id}_toSelectedCurrency`,
        null
    );

    const upDateSelected = (valute: InfoCurrency, watcher: string) => {
        if (watcher === "from") {
            setFromCurrency(valute);
            setFromSelectedCur(valute);
        } else if (watcher === "to") {
            setToCurrency(valute);
            setToSelectedCur(valute);
        }
    };

    const handleClickExchange = () => {
        const exchangeFrom = toCurrency;
        const exchangeTo = fromCurrency;
        if (
            exchangeTo.CharCode !== "RUB" &&
            exchangeTo.CharCode !== "EUR" &&
            exchangeTo.CharCode !== "USD" &&
            exchangeTo.CharCode !== toSelectedCur?.CharCode
        ) {
            setToSelectedCur(exchangeTo);
        }
        if (
            exchangeFrom.CharCode !== "RUB" &&
            exchangeFrom.CharCode !== "EUR" &&
            exchangeFrom.CharCode !== "USD" &&
            exchangeFrom.CharCode !== fromSelectedCur?.CharCode
        ) {
            setFromSelectedCur(exchangeFrom);
        }
        setFromCurrency(exchangeFrom);
        setToCurrency(exchangeTo);
    };

    return {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        fromSelectedCur,
        toSelectedCur,
        upDateSelected,
        handleClickExchange,
    };
};

export default useLocalCurrencyConverter;
