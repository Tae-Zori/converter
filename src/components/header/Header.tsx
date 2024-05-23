import React from "react";
import cl from "./Header.module.scss";
import logo from "./../../images/logo.png";

const Header = () => {
    return (
        <header className={cl.header}>
            <div className={cl.header__wrapper}>
                <img src={logo} alt="logo" />

                <h1>Конвертер валют</h1>
            </div>
        </header>
    );
};
export default Header;
