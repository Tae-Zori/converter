import { useEffect, useRef, useState } from "react";
import { InfoCurrency } from "../interfaces/interfaces";
import ConverterStore from "../store/ConverterStore";

const useConverterStore = (
    fromCurrency: InfoCurrency,
    toCurrency: InfoCurrency
) => {
    const [converterStore, setConverterStore] = useState<ConverterStore | null>(
        null
    );

    useEffect(() => {
        const newConverterStore = new ConverterStore(fromCurrency, toCurrency);
        setConverterStore(newConverterStore);
        newConverterStore.setFromCurrency(fromCurrency);
        newConverterStore.setToCurrency(toCurrency);
    }, [fromCurrency, toCurrency]);

    return converterStore;
};

export default useConverterStore;
