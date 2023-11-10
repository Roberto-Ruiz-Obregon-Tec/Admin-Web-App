import styles from "./Table.module.css";

function Table({
    matrixData,
    arrayHeaders
}) {

    return (
        <div className={styles.table}>
            <div className={styles.row}>
                {arrayHeaders.map((header, i) => {
                    return (
                        <div style={{
                            width: `${100 / arrayHeaders.length}%`
                        }} key={i} className={styles.header}>
                            {header}
                        </div>
                    )
                })}
            </div>
            {matrixData.length === 0 && (
                <div className={styles.zero}>
                    No hay ninguna entrada
                </div>
            )}

            {matrixData.map((row, i) => {
                return (
                    <div key={i} className={styles.row} style={{
                        backgroundColor: i % 2 == 0 ? "#FFF" : "#DDD"
                    }}>
                        {row.map((element, j) => {
                            return (
                                <div style={{
                                    width: `${100 / arrayHeaders.length}%`
                                }} className={styles.element} key={`${i}-${j}`}>
                                    {element}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
export default Table;