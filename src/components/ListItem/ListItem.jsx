import styles from "./ListItem.module.css";

function ListItem({
	icon,
	content,
	isLink = false,
	href = "",
	name,
	onChangeCallback,
	submitUpdate
}) {
	return (
		<form onSubmit={(e) => {
			e.preventDefault();
			submitUpdate();
		}}>
			{isLink && (
				<a href={href} target="_blank">
					{icon}
				</a>
			)}
			{!isLink && (
				<>
					{icon}
				</>
			)}
			<input type="text" onChange={(e) => {
				onChangeCallback(name, e.target.value);
			}} value={content} className={styles.input} />
		</form>
	)
}
export default ListItem;