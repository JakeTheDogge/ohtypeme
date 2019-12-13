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

        <div className={styles.raceState}>
          <RaceItem name={id.userName} percent={p}/>
        </div>
      </div>
    )
  };

  return (
    <>
      {competitors.map(progressBar)}

      <div key={myId.getId()} className={styles.raceState}>
        <RaceItem  name={myId.userName} percent={myPercent}/>
      </div>
    </>
  )
};

export default RaceState;