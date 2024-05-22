import React from "react";
import cl from "./Modal.module.scss";
import { InfoCurrency } from "../../../interfaces/interfaces";

interface IPropsModal {
    currencies: InfoCurrency[];
}

const Modal = ({ currencies }: IPropsModal) => {
    return (
        <article className={cl.modal}>
            <div className={cl.modal__wrapper}>
                <ul>
                    {currencies.map((item) => (
                        <li key={item.ID}>
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
