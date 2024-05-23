import { makeAutoObservable } from "mobx";
import { InfoCurrency } from "../interfaces/interfaces";
import { defaultRub } from "../data/DefaultCurrency";

// class ConverterStore {
//     selectedFromCurrency: InfoCurrency | null = null;
//     selectedToCurrency: InfoCurrency | null = null;
//     visibleModal: boolean = false;
//     watcher: string = "";
//     id: string;

//     constructor(id: string) {
//         makeAutoObservable(this);
//         this.id = id;
//     }

//     saveToLocalStorage = (key: string, value: any) => {
//         try {
//             localStorage.setItem(key, JSON.stringify(value));
//         } catch (error) {
//             console.error("Failed to save data to LocalStorage:", error);
//         }
//     };
//     handlerClickFor = () => {
//         if (this.watcher !== "from" && !this.visibleModal) {
//             this.watcher = "from";
//             this.visibleModal = true;
//         }
//         if (this.watcher == "from" && this.visibleModal) {
//             this.visibleModal = false;
//             this.watcher = "";
//         }
//     };
//     handlerClickTo = () => {
//         if (this.watcher !== "to" && !this.visibleModal) {
//             this.watcher = "to";
//             this.visibleModal = true;
//         }
//         if (this.watcher == "to" && this.visibleModal) {
//             this.visibleModal = false;
//             this.watcher = "";
//         }
//     };
// }

// export default ConverterStore;

// upDateFromCurrency = (valute: InfoCurrency) => {
//     try {
//         this.saveToLocalStorage("fromCurrency", valute);
//         const fromValute = localStorage.getItem("fromCurrency");
//         if (fromValute) setFromCurrency(JSON.parse(fromValute));
//     } catch (error) {
//         console.error("Failed to load data from LocalStorage:", error);
//     }
// };

class ConverterStore {
    visibleModal: boolean = false;
    watcher: string = "";
    id: string;

    constructor(id: string) {
        makeAutoObservable(this);
        this.id = id;
    }

    handlerClickFor = () => {
        if (this.watcher === "from") {
            this.visibleModal = !this.visibleModal;
        } else {
            this.watcher = "from";
            this.visibleModal = true;
        }
    };

    handlerClickTo = () => {
        if (this.watcher === "to") {
            this.visibleModal = !this.visibleModal;
        } else {
            this.watcher = "to";
            this.visibleModal = true;
        }
    };
}

export default ConverterStore;
