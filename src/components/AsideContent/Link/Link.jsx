import { Link, useLocation } from "react-router-dom";
import styles from "./Link.module.css";

export default function _Link({
    href,
    text,
    children
}) {
    const location = useLocation();

    const isOnOurLink = () => {
        return location.pathname === href;
    };

    return (
        <Link to={href} className={`${styles.link} ${isOnOurLink() && styles.is_in_link}`}>
            <span>
                {children}
            </span>
            <span>
                {text}
            </span>
        </Link>
    )
}