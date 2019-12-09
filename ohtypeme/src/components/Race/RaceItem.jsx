import React from 'react';
import styles from './Race.module.css';
import snitch from '../logos/golden-snitch.svg';

const RaceItem = (props) => {
  return (
    <div className={styles.raceItem}>
      <img className={styles.broom} src={snitch} style={{width: `${55.5 * props.procent}vw`}} alt='type!' />
    </div>
  )
}

export default RaceItem;