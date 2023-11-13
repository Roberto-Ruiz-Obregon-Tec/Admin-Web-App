import styles from "./PopUp.module.css"
import Card from "../../../../components/ShadowCard/ShadowCard";
import Icons from "../../../../icons/index";
import { useEffect } from "react";

export default function PopUp({
    children,

    isOpen,
    setIsOpen,

    classNameCard = "",
    classNameBody = "",
}) {

    const manageScroll = (takeOut) => {
        const body = document.querySelector("body");
        if (body === null) return;

        if (takeOut) {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
        }
    };

    useEffect(() => {
        manageScroll(isOpen);
    }, [isOpen])

    return (
        <div className={`${styles.modal} ${isOpen && styles.open}`}>
            <Card className={`${styles.card} ${classNameCard}`}>
                <button title="Cerrar" onClick={() => {
                    setIsOpen(false);
                }} className={styles.xmark}>
                    {Icons.xmark()}
                </button>
                <div className={`${styles.body} ${classNameBody}`}>
                    {children}
                </div>
            </Card>
        </div>
    )
}