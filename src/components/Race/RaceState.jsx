import React from 'react';
import RaceItem from './RaceItem';
import styles from './Race.module.css';

const RaceState = (props) => {
  const {myId, myPercent, participants, percents} = props;
  const competitors = participants.filter(id => id.getId() !== myId.getId());
  const progressBar = (id) => {
    const t = percents.find(([x, _]) => x.getId() === id.getId());
    let p = 0;
    if (t && t.length > 1) {
      p = t[1]
    }
    return (
      <div key={id.getId()}>
        <p>{id.userName}</p>
        <div className={styles.raceState}>
          <RaceItem procent={p}/>
        </div>
      </div>
    )
  };

  return (
    <>
      {competitors.map(progressBar)}
      <p>{myId.userName}</p>
      <div key={myId.getId()} className={styles.raceState}>
        <RaceItem procent={myPercent}/>
      </div>
    </>
  )
};

export default RaceState;