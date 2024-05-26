import { makeAutoObservable } from "mobx";
import { InfoCurrency } from "../interfaces/interfaces";

class ConverterStore {
    fromCurrency: InfoCurrency;
    toCurrency: InfoCurrency;
    fromAmount: number = 0;
    toAmount: number = 0;
    rateFrom: string = "";
    rateTo: string = "";
    rateToFromValue: number = 0;
    rateFromToValue: number = 0;

    constructor(fromCurrency: InfoCurrency, toCurrency: InfoCurrency) {
        makeAutoObservable(this);
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
    }

    setFromCurrency(currency: InfoCurrency) {
        this.fromCurrency = currency;
        this.calculateRates();
    }

    setToCurrency(currency: InfoCurrency) {
        this.toCurrency = currency;
        this.calculateRates();
    }

    setFromAmount(amount: number) {
        this.fromAmount = amount;
        this.calculateToAmount();
    }

    setToAmount(amount: number) {
        this.toAmount = amount;
        this.calculateFromAmount();
    }

    calculateRates() {
        if (this.fromCurrency && this.toCurrency) {
            this.rateFromToValue =
                this.fromCurrency.Value /
                this.fromCurrency.Nominal /
                (this.toCurrency.Value / this.toCurrency.Nominal);

            this.rateToFromValue =
                this.toCurrency.Value /
                this.toCurrency.Nominal /
                (this.fromCurrency.Value / this.fromCurrency.Nominal);

            this.rateFrom = `1 ${
                this.fromCurrency.CharCode
            } = ${this.rateFromToValue.toFixed(2)} ${this.toCurrency.CharCode}`;
            this.rateTo = `1 ${
                this.toCurrency.CharCode
            } = ${this.rateToFromValue.toFixed(2)} ${
                this.fromCurrency.CharCode
            }`;

            this.calculateToAmount();
        }
    }

    calculateToAmount() {
        this.toAmount = Number(
            (this.fromAmount * this.rateFromToValue).toFixed(2)
        );
    }
    calculateFromAmount() {
        this.fromAmount = Number(
            (this.toAmount * this.rateToFromValue).toFixed(2)
        );
    }
}

export default ConverterStore;
