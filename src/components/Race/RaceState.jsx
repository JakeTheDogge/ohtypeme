import React from 'react';
import RaceItem from './RaceItem';
import styles from './Race.module.css';

const RaceState = (props) => {
  return (
    <div className={styles.raceState}>
      <RaceItem procent={props.procent} />
    </div>
  )
};

export default RaceState;