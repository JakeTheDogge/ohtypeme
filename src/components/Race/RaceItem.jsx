import React from 'react';
import styles from './Race.module.css';
import snitch from '../logos/golden-snitch.svg';
import goldenSnitch  from '../logos/g-snitch.svg'

const RaceItem = (props) => {

  return (
    <div className={styles.raceItem}>
      <img className={styles.snitch} src={goldenSnitch} style={{ marginLeft: `${Math.min(57 * props.percent, 57)}vw`, width: `${Math.min(60 * props.percent, 3)}vw` }} alt='type!' />
    </div>
  )
}

export default RaceItem;