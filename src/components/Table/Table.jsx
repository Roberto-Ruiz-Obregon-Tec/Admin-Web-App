import styles from "./Table.module.css";

function Table({
    matrixData,
    arrayHeaders,

    percentages = null
}) {

    const getPercentage = (i = null) => {
        if (percentages === null || i === null) return 100 / arrayHeaders.length;

        return percentages[i];
    }

    return (
        <div className={styles.table}>
            <div className={styles.row}>
                {arrayHeaders.map((header, i) => {
                    return (
                        <div style={{
                            width: `${getPercentage(i)}%`
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
                                    width: `${getPercentage(j)}%`
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