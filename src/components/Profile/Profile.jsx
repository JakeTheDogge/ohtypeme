import React from 'react';
import styles from './Profile.module.css';
import { USER_NAME} from '../../App';

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles['profile__data']}>
        <span className={styles['profile__data_name']}>{USER_NAME}</span>
        <span> Accuracy: 95%</span>
        <span>Speed: 20 wpm</span>
      </div>
      <div className={styles['profile__speedPlot']}>
        Here will be Plot
  </div>
    </div>
  )
};