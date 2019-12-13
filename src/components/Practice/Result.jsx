import React from 'react';
import styles from './Practice.module.css';




export const Result = (props) => {
  const accuracy = Math.round(100 * (1 - Math.min(props.mistakes / props.text.length, 1)));
  return (
    <div className={styles['result']}>
      <table>
        <thead>
          <tr className={styles['result__name']}>
            <th>Accuracy</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles['result__score']}>
            <td>{accuracy}<span className={styles['result__units']}>%</span></td>
            <td><span>{props.speed < 0 ? 'Cheater!' : props.speed}</span> <span className={styles['result__units']}>wpm</span></td>
          </tr>
        </tbody>
      </table>
    </div>)
};