import React from 'react';
import styles from './Race.module.css';
import snitch from '../logos/golden-snitch.svg';

const RaceItem = (props) => {

  return (
    <div className={styles.raceItem}>
      <img className={styles.broom} src={snitch} style={{ marginLeft: `${57 * props.procent}vw`, width: `${Math.min(60 * props.procent, 3)}vw` }} alt='type!' />
    </div>
  )
}

export default RaceItem;