import styles from "./DropDown.module.css";

export default function DropDown({
    text,

    attrBtn,
    attrDivParent,
    attrDivChild,

    isOpen,
    id,
    setIsOpen,

    children
}) {

    return (
        <div
            id={id}
            tabIndex={-1}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsOpen(false);
                }
            }}
            className={styles.parent}
            attr-css={attrDivParent}
        >
            <button onClick={() => {
                setIsOpen(prev => !prev);
            }} className={styles.btn}
                attr-css={attrBtn}
                role="button"
                type="button"
            >
                {text}
                <span className={styles.icon}>
                    {isOpen && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                        </svg>
                    )}
                    {!isOpen && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                        </svg>
                    )}
                </span>
            </button>

            {isOpen && (
                <div className={styles.child}
                    attr-css={attrDivChild}
                >
                    {children}
                </div>
            )}
        </div >
    )
}