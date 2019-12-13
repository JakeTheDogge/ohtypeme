import React from 'react';
import RaceItem from './RaceItem';
import styles from './Race.module.css';

const RaceState = (props) => {
  return (
    <div className={styles.raceState}>
      <RaceItem  percent={props.percent} />
    </div>
  )
};

export default RaceState;