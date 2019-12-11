import React from 'react';
import styles from './Race.module.css';
import snitch from '../logos/golden-snitch.svg';

const RaceItem = (props) => {

  return (
    <div className={styles.raceItem}>
      <img className={styles.snitch} src={snitch} style={{ marginLeft: `${Math.min(57 * props.procent, 57)}vw`, width: `${Math.min(60 * props.procent, 3)}vw` }} alt='type!' />
    </div>
  )
}

export default RaceItem;