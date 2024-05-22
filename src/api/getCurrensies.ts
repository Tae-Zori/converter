import axios from "axios";
import { CurrencyData } from "../interfaces/interfaces";

export const getCurrensies = async () => {
    const res = (
        await axios.get<CurrencyData>(
            "https://www.cbr-xml-daily.ru/daily_json.js"
        )
    ).data;

    return res;
};
