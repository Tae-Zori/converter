import cl from "./MyInput.module.scss";
interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const MyInput = ({ ...props }: IPropsInput) => {
    return (
        <>
            <input className={cl.input} type="number" {...props} />
        </>
    );
};

export default MyInput;
