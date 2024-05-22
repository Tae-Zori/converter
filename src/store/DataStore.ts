import { makeAutoObservable, runInAction } from "mobx";
import { getCurrensies } from "../api/getCurrensies";
import { Currency } from "../interfaces/interfaces";

class DataStore {
    data: Currency = {};
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    getData = async () => {
        this.isLoading = true;
        try {
            const response = await getCurrensies();
            runInAction(() => {
                this.data = response.Valute;
                this.isLoading = false;
                this.saveToLocalStorage();
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            console.error("Failed to fetch currencies:", error);
        }
    };

    saveToLocalStorage() {
        try {
            localStorage.setItem("currencyData", JSON.stringify(this.data));
        } catch (error) {
            console.error("Failed to save data to LocalStorage:", error);
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem("currencyData");
            if (data) {
                this.data = JSON.parse(data);
            }
        } catch (error) {
            console.error("Failed to load data from LocalStorage:", error);
        }
    }
}

export default new DataStore();
