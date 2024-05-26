import cl from "./InputForm.module.scss";
interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rate: string | undefined;
}

const InputForm = ({
    value = "",
    onChange,
    rate,
    ...restProps
}: IPropsInput) => {
    return (
        <div className={cl.inputForm}>
            {rate && <p>{rate}</p>}
            <input
                value={value}
                onChange={onChange}
                className={cl.input}
                {...restProps}
                type="text"
                inputMode="numeric"
                id="number-input"
                pattern="[0-9]*"
            />
        </div>
    );
};

export default InputForm;
