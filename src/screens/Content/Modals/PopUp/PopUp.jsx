import styles from "./PopUp.module.css"
import Card from "../../../../components/ShadowCard/ShadowCard";
import Icons from "../../../../icons/index";


export default function PopUp({
    children,

    isOpen,
    setIsOpen
}) {
    return (
        <div className={`${styles.modal} ${isOpen && styles.open}`}>
            <Card className={styles.card}>
                <button onClick={() => {
                    setIsOpen(false);
                }} className={styles.xmark}>
                    {Icons.xmark()}
                </button>
                <div className={styles.body}>
                    {children}
                </div>
            </Card>
        </div>
    )
}