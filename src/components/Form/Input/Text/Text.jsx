import styles from "./Text.module.css";

export default function InputText({
    id,
    text,
    value,
    setValue,
    type = "text"
}) {
    return (
        <div className={styles.container}>
            <label htmlFor={id}>
                {text}
            </label>
            <input
                type={type}
                id={id}
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
