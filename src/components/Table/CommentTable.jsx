import React from 'react';
import styles from './Table.module.css';

const APROBADO = "Aprobado"
const RECHAZADO = "Rechazado"
function Table({
  matrixData,
  arrayHeaders,

  percentages = null,
  clickOnApprove = null,
  clickOnReject = null,

}) {
  const getPercentage = (i = null) => {
    if (percentages === null || i === null)
      return 100 / arrayHeaders.length;

    return percentages[i];
  };

  const AprobarComentario = (id = null, status = null) => {
    if (clickOnApprove === null) return;

    clickOnApprove(id, status);
  };

  const RechazarComentario = (id = null, status = null) => {
    if (clickOnReject === null) return;

    clickOnReject(id, status);
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
                if (element != "comment")
                  return  (
                    <div
                      style={{
                        width: `${getPercentage(j)}%`,
                      }}
                      className={styles.element}
                      key={`${i}-${j}`}
                    >
                    {row[element]}
                    </div>
                  );
                
                else
                  return  (
                    <div
                      style={{
                        width: `${getPercentage(j)}%`,
                      }}
                      className={styles.element}
                      key={`${i}-${j}`}
                    >
                    {row[element].comment}
                    </div>
                  ); 
                      
            })}
              

                

            
            <div style={{ width: '6%' }} className={styles.col}>
              <button
                style={{ width: '80%' }}
                className={styles.whitebutton}
                onClick={() => AprobarComentario(row.comment.id, APROBADO)}
              >
                Aceptar
              </button>
              <button
                style={{ width: '80%' }}
                className={styles.redbutton}
                onClick={() => RechazarComentario(row.comment.id, RECHAZADO)}
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
