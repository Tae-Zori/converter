import { makeAutoObservable } from "mobx";

class CurrencyModalStore {
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

export default CurrencyModalStore;
