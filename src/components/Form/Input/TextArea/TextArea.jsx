import styles from "./TextArea.module.css";

export default function InputTextArea({
    id,
    text,
    value,
    setValue,
    type = "text",
    className = ""
}) {
    return (
        <div className={`${styles.container} ${className}`}>
            <label htmlFor={id}>
                {text}
            </label>
            <textarea
                type={type}
                id={id}
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
