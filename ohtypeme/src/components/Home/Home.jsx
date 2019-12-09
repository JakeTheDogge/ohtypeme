import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';



export const Home = () => {
  return (
    <div className={styles.buttons}>
      <Link to='race/:raceId' replace className={styles.button}>Play with Friends</Link>
      <Link to='/practice' replace className={styles.button}>Practice</Link>
    </div>
  )
};