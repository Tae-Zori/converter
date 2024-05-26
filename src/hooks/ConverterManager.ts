import { useState, useEffect } from "react";

const useConverterManager = () => {
    const [converters, setConverters] = useState<string[]>([]);
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const savedConverters = localStorage.getItem("converters");
        if (savedConverters !== null) {
            const parsedSavedConverters = JSON.parse(savedConverters);
            if (Array.isArray(parsedSavedConverters)) {
                setConverters(parsedSavedConverters);
            } else {
                setConverters([]);
            }
        } else {
            setConverters([]);
        }
        setLoading(false);
    }, []);

    const addConverter = () => {
        const id = `converter${counter}`;
        setCounter((prevCounter) => prevCounter + 1);
        const newConverters = [...converters, id];
        setConverters(newConverters);
        localStorage.setItem("converters", JSON.stringify(newConverters));
    };
    const removeLocalStorageItems = (keys: string[]) => {
        keys.forEach((key) => {
            localStorage.removeItem(key);
        });
    };

    const removeConverter = (id: string) => {
        const newConverters = converters.filter(
            (converterId) => converterId !== id
        );
        setConverters(newConverters);
        removeLocalStorageItems([
            `${id}_fromCurrency`,
            `${id}_toCurrency`,
            `${id}_fromSelectedCurrency`,
            `${id}_toSelectedCurrency`,
        ]);
        localStorage.setItem("converters", JSON.stringify(newConverters));
    };

    return { converters, addConverter, removeConverter, loading };
};

export default useConverterManager;
