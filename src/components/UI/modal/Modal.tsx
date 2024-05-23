import React from "react";
import cl from "./Modal.module.scss";
import { InfoCurrency } from "../../../interfaces/interfaces";

interface IPropsModal {
    currencies: InfoCurrency[];
    handlerClick: (valute: InfoCurrency, watcher: string) => void;
    watcher: string;
}

const Modal = ({ currencies, handlerClick, watcher }: IPropsModal) => {
    return (
        <article className={cl.modal}>
            <div className={cl.modal__wrapper}>
                <ul>
                    {currencies.map((item) => (
                        <li
                            key={item.ID}
                            onClick={() => handlerClick(item, watcher)}
                        >
                            {item.Name}
                            <span> {item.CharCode}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};
export default Modal;
