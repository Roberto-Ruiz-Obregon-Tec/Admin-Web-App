import styles from "./ListItem.module.css";

function ListItem({
    icon, content
}) {
    return (        
        <div>
          {icon}
          <p className={styles.p} >
            {content}
          </p>          
        </div>
    )
}
export default ListItem;