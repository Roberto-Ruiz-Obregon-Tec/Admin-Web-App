import React from 'react';
import styles from './Table.module.css';

function Table({
  matrixData,
  arrayHeaders,

  percentages = null,
  clickOnCell = null,

  handleEdit = null,
  handleDelete = null,
}) {
  const getPercentage = (i = null) => {
    if (percentages === null || i === null)
      return 100 / arrayHeaders.length;

    return percentages[i];
  };

  const gotAClick = (i = null) => {
    if (clickOnCell === null) return;

    clickOnCell(i);
  };

  const handleEditClick = (i = null) => {
    if (handleEdit === null) return;
    handleEdit(i);    
  };

  const handleDeleteClick = (i = null) => {
    if (handleDelete === null) return;
    handleDelete(i);
  };

  return (
    <div className={styles.table}>
      <div className={styles.row}>
        {arrayHeaders.map((header, i) => {
          return (
            <div
              style={{
                width: `${getPercentage(i)}%`,
              }}
              key={i}
              className={styles.header}
            >
              {header}
            </div>
          );
        })}
        <div style={{ width: '6%' }} className={styles.header}>
          ...
        </div>
      </div>
      {matrixData.length === 0 && (
        <div className={styles.zero}>No hay ninguna entrada</div>
      )}

{matrixData.map((row, i) => {
        return (
          <div
            key={i}
            className={styles.row}
            style={{
              backgroundColor: i % 2 === 0 ? '#FFF' : '#DDD',
            }}
          >
            {Object.keys(row).map((element, j) => {
              if (element != undefined)
              return  (
                <div
                  onClick={() => {
                    gotAClick(i);
                  }}
                  style={{
                    width: `${getPercentage(j)}%`,
                    cursor:
                      clickOnCell === null ? 'default' : 'pointer',
                  }}
                  className={styles.element}
                  key={`${i}-${j}`}
                >
                {row[element]}
                </div>
              );
            })}

            
            <div style={{ width: '6%' }} className={styles.col}>
              <button
                style={{ width: '80%' }}
                className={styles.whitebutton}
                onClick={() => handleEditClick(i)}
              >
                Aceptar
              </button>
              <button
                style={{ width: '80%' }}
                className={styles.redbutton}
                onClick={() => handleDeleteClick(i)}
              >
                Eliminar
              </button>
            </div>
            </div>
        );
      })}
    </div>
  );
}

export default Table;
