import React from 'react';
import styles from './Practice.module.css';




export const Result = (props) => {
  const accuracy = Math.round(100*(1-Math.min(props.mistakes/props.text.length, 1)));
  return (
  <div class={styles['result']}>
    <table>
      <tr class={styles['result__name']}>
        <th>Accuracy</th>
        <th>Speed</th>
      </tr>
      <tr class={styles['result__score']}>
        <td>{accuracy}<span class={styles['result__units']}>%</span></td>
        <td><span>19</span> <span class={styles['result__units']}>wpm</span></td>
      </tr>
    </table>
  </div>)
};