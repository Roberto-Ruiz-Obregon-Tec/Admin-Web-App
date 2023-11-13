import styles from "./Return.module.css";
import Icons from "../../../icons/index";

function ReturnLink({
    href
}) {
    return (
        <a href={href} title="Regresar" className={styles.container_page_wrapper_link_return}>
            {Icons.chevronLeft()}
            regresar
        </a>
    )
}
export default ReturnLink;
