import { useEffect } from "react";
import DataStore from "../store/DataStore";
import { toJS } from "mobx";
import { defaultRub } from "../data/DefaultCurrency";

const useCurrencies = () => {
    const { getData, data } = DataStore;

    useEffect(() => {
        getData();
    }, [getData]);

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

    return { valuteArray, defaultValute };
};

export default useCurrencies;
