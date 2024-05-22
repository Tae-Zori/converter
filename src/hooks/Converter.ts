import { useState, useEffect } from "react";
import { InfoCurrency } from "../interfaces/interfaces";
import { defaultRub } from "../data/DefaultCurrency";
import DataStore from "../store/DataStore";
import { toJS } from "mobx";

const useConverter = () => {
    const [fromCurrency, setFromCurrency] = useState<InfoCurrency>(defaultRub);
    const [toCurrency, setToCurrency] = useState<InfoCurrency>(defaultRub);
    const [fromAmount, setFromAmount] = useState<number>(1);
    const [toAmount, setToAmount] = useState<number>(1);
    const [rateFromTo, setRateFromTo] = useState<string>("");
    const [rateToFrom, setRateToFrom] = useState<string>("");

    const saveToLocalStorage = (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Failed to save data to LocalStorage:", error);
        }
    };

    const loadFromLocalStorage = () => {
        try {
            const fromCurrency = localStorage.getItem("fromCurrency");
            const toCurrency = localStorage.getItem("toCurrency");

            if (fromCurrency) setFromCurrency(JSON.parse(fromCurrency));
            if (toCurrency) setToCurrency(JSON.parse(toCurrency));
        } catch (error) {
            console.error("Failed to load data from LocalStorage:", error);
        }
    };

    const calculateRates = () => {
        if (fromCurrency && toCurrency) {
            const rateFromToValue =
                fromCurrency.Value /
                fromCurrency.Nominal /
                (toCurrency.Value / toCurrency.Nominal);
            const rateToFromValue =
                toCurrency.Value /
                toCurrency.Nominal /
                (fromCurrency.Value / fromCurrency.Nominal);

            setRateFromTo(
                `1 ${fromCurrency.CharCode} = ${rateFromToValue.toFixed(4)} ${
                    toCurrency.CharCode
                }`
            );
            setRateToFrom(
                `1 ${toCurrency.CharCode} = ${rateToFromValue.toFixed(4)} ${
                    fromCurrency.CharCode
                }`
            );

            const newToAmount = fromAmount * rateFromToValue;
            setToAmount(newToAmount);
        }
    };

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    useEffect(() => {
        calculateRates();
        saveToLocalStorage("fromCurrency", fromCurrency);
        saveToLocalStorage("toCurrency", toCurrency);
        saveToLocalStorage("fromAmount", fromAmount);
        saveToLocalStorage("toAmount", toAmount);
    }, [fromCurrency, toCurrency, fromAmount, toAmount]);

    const { getData, data } = DataStore;
    useEffect(() => {
        getData();
    }, []);

    const valuteArray = data
        ? Object.values(toJS(data)).filter(
              (item) => item.CharCode !== "USD" && item.CharCode !== "EUR"
          )
        : [];

    const defaultValute = [
        defaultRub,
        ...Object.values(toJS(data)).filter(
            (item) =>
                item.CharCode === "RUB" ||
                item.CharCode === "USD" ||
                item.CharCode === "EUR"
        ),
    ];

    return {
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
    };
};

export default useConverter;
