import styles from "./ListItem.module.css";

function ListItem({
    icon, content, key
}) {
    return (        
        <div id={key}>
          {icon}
          <p className={styles.p} >
            {content}
          </p>          
        </div>
    )
}
export default ListItem;