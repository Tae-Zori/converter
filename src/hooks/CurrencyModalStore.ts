import { useRef } from "react";
import CurrencyModalStore from "../store/CurrencyModalStore";

const useCurrencyModalStore = (id: string) => {
    const storeRef = useRef<CurrencyModalStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = new CurrencyModalStore(id);
    }

    return storeRef.current;
};

export default useCurrencyModalStore;
