import { makeAutoObservable } from "mobx";
import { InfoCurrency } from "../interfaces/interfaces";
import { defaultRub } from "../data/DefaultCurrency";

class ConverterStore {
    fromCurrency: InfoCurrency = defaultRub;
    toCurrency: InfoCurrency = defaultRub;
    selectedFromCurrency: InfoCurrency | null = null;
    selectedToCurrency: InfoCurrency | null = null;
    rateFromCurrency: number = 1;
    rateToCurrency: number = 1;
    fromAmount: number = 0;
    toAmount: number = 0;
    rateFromTo: string = "";
    rateToFrom: string = "";
    id: string;

    constructor(id: string) {
        makeAutoObservable(this);
        this.id = id;
        this.loadFromLocalStorage();
    }

    setFromCurrency(currency: InfoCurrency) {
        this.fromCurrency = currency;
        this.saveToLocalStorage("fromCurrency", currency);
        this.calculateRates();
    }

    setToCurrency(currency: InfoCurrency) {
        this.toCurrency = currency;
        this.saveToLocalStorage("toCurrency", currency);
        this.calculateRates();
    }

    setSelectedFromCurrency(currency: InfoCurrency) {
        this.selectedFromCurrency = currency;
        this.saveToLocalStorage("selectedFromCurrency", currency);
    }

    setSelectedToCurrency(currency: InfoCurrency) {
        this.selectedToCurrency = currency;
        this.saveToLocalStorage("selectedToCurrency", currency);
    }

    setFromAmount(amount: number) {
        this.fromAmount = amount;
        this.saveToLocalStorage("fromAmount", amount);
        this.calculateToAmount();
    }

    setToAmount(amount: number) {
        this.toAmount = amount;
        this.saveToLocalStorage("toAmount", amount);
        this.calculateFromAmount();
    }

    saveToLocalStorage(key: string, value: any) {
        try {
            localStorage.setItem(`${this.id}-${key}`, JSON.stringify(value));
        } catch (error) {
            console.error("Failed to save data to LocalStorage:", error);
        }
    }

    loadFromLocalStorage() {
        try {
            const fromCurrency = localStorage.getItem(
                `${this.id}-fromCurrency`
            );
            const toCurrency = localStorage.getItem(`${this.id}-toCurrency`);
            const fromAmount = localStorage.getItem(`${this.id}-fromAmount`);
            const toAmount = localStorage.getItem(`${this.id}-toAmount`);

            if (fromCurrency) this.fromCurrency = JSON.parse(fromCurrency);
            if (toCurrency) this.toCurrency = JSON.parse(toCurrency);
            if (fromAmount) this.fromAmount = Number(fromAmount);
            if (toAmount) this.toAmount = Number(toAmount);

            this.calculateRates();
        } catch (error) {
            console.error("Failed to load data from LocalStorage:", error);
        }
    }

    calculateRates() {
        if (this.fromCurrency && this.toCurrency) {
            const rateFromToValue =
                this.fromCurrency.Value /
                this.fromCurrency.Nominal /
                (this.toCurrency.Value / this.toCurrency.Nominal);
            const rateToFromValue =
                this.toCurrency.Value /
                this.toCurrency.Nominal /
                (this.fromCurrency.Value / this.fromCurrency.Nominal);

            this.rateFromCurrency = rateFromToValue;
            this.rateToCurrency = rateToFromValue;

            this.rateFromTo = `1 ${
                this.fromCurrency.CharCode
            } = ${rateFromToValue.toFixed(4)} ${this.toCurrency.CharCode}`;
            this.rateToFrom = `1 ${
                this.toCurrency.CharCode
            } = ${rateToFromValue.toFixed(4)} ${this.fromCurrency.CharCode}`;
        } else {
            this.rateFromCurrency = 1;
            this.rateToCurrency = 1;
            this.rateFromTo = "";
            this.rateToFrom = "";
        }
    }

    calculateToAmount() {
        if (this.fromCurrency && this.toCurrency) {
            this.toAmount = this.fromAmount * this.rateFromCurrency;
        }
    }

    calculateFromAmount() {
        if (this.fromCurrency && this.toCurrency) {
            this.fromAmount = this.toAmount * this.rateToCurrency;
        }
    }
}

export default ConverterStore;
