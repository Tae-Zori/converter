import { useState, useEffect } from "react";
import { InfoCurrency } from "../interfaces/interfaces";
import { defaultRub } from "../data/DefaultCurrency";

const useConverter = () => {
    const [fromCurrency, setFromCurrency] = useState<InfoCurrency>(defaultRub);
    const [toCurrency, setToCurrency] = useState<InfoCurrency>(defaultRub);
    const [fromAmount, setFromAmount] = useState<number>(0);
    const [toAmount, setToAmount] = useState<number>(0);
    const [rateFromTo, setRateFromTo] = useState<string>("");
    const [rateToFrom, setRateToFrom] = useState<string>("");
    const [fromSelectedCur, setFromSelectedCur] = useState<InfoCurrency | null>(
        null
    );
    const [toSelectedCur, setToSelectedCur] = useState<InfoCurrency | null>(
        null
    );

    const saveToLocalStorage = (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Failed to save data to LocalStorage:", error);
        }
    };

    const upDateSelected = (valute: InfoCurrency, watcher: string) => {
        try {
            if (watcher === "from") {
                saveToLocalStorage("fromCurrency", valute);
                const fromValute = localStorage.getItem("fromCurrency");
                if (fromValute) setFromCurrency(JSON.parse(fromValute));
                saveToLocalStorage("fromSelectedCurrency", valute);
                const selectedFromValute = localStorage.getItem(
                    "fromSelectedCurrency"
                );
                if (selectedFromValute)
                    setFromSelectedCur(JSON.parse(selectedFromValute));
            } else if (watcher === "to") {
                saveToLocalStorage("toCurrency", valute);
                const toValute = localStorage.getItem("toCurrency");
                if (toValute) setToCurrency(JSON.parse(toValute));
                saveToLocalStorage("toSelectedCurrency", valute);
                const selectedToValute =
                    localStorage.getItem("toSelectedCurrency");
                if (selectedToValute)
                    setToSelectedCur(JSON.parse(selectedToValute));
            }
        } catch (error) {
            console.error("Failed to load data from LocalStorage:", error);
        }
    };

    const upDateFromCurrency = (valute: InfoCurrency) => {
        try {
            saveToLocalStorage("fromCurrency", valute);
            const fromValute = localStorage.getItem("fromCurrency");
            if (fromValute) setFromCurrency(JSON.parse(fromValute));
        } catch (error) {
            console.error("Failed to load data from LocalStorage:", error);
        }
    };
    const upDateToCurrency = (valute: InfoCurrency) => {
        try {
            saveToLocalStorage("toCurrency", valute);
            const toValute = localStorage.getItem("toCurrency");
            if (toValute) setToCurrency(JSON.parse(toValute));
        } catch (error) {
            console.error("Failed to load data from LocalStorage:", error);
        }
    };

    const calculateRates = () => {
        if (fromCurrency && toCurrency) {
            const rateFromToValue = (
                fromCurrency.Value /
                fromCurrency.Nominal /
                (toCurrency.Value / toCurrency.Nominal)
            ).toFixed(2);
            const rateToFromValue = (
                toCurrency.Value /
                toCurrency.Nominal /
                (fromCurrency.Value / fromCurrency.Nominal)
            ).toFixed(2);

            setRateFromTo(
                `1 ${fromCurrency.CharCode} = ${rateFromToValue} ${toCurrency.CharCode}`
            );
            setRateToFrom(
                `1 ${toCurrency.CharCode} = ${rateToFromValue} ${fromCurrency.CharCode}`
            );

            const newToAmount = fromAmount * Number(rateFromToValue);
            setToAmount(newToAmount);
        }
    };

    useEffect(() => {
        const fromCurrency = localStorage.getItem("fromCurrency");
        const toCurrency = localStorage.getItem("toCurrency");
        if (fromCurrency) setFromCurrency(JSON.parse(fromCurrency));
        if (toCurrency) setToCurrency(JSON.parse(toCurrency));
        const selectedFromValute = localStorage.getItem("fromSelectedCurrency");
        if (selectedFromValute)
            setFromSelectedCur(JSON.parse(selectedFromValute));
        const selectedToValute = localStorage.getItem("toSelectedCurrency");
        if (selectedToValute) setToSelectedCur(JSON.parse(selectedToValute));
    }, []);

    useEffect(() => {
        calculateRates();
    }, [fromCurrency, toCurrency, fromAmount, toAmount]);

    return {
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
    };
};

export default useConverter;
