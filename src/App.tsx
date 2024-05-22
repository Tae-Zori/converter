import React from "react";
import "./style/App.scss";
import Main from "./components/main/Main";
import Header from "./components/header/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <Main />
        </div>
    );
}

export default App;
