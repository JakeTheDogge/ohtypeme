import React from 'react';
import styles from './Profile.module.css';
import { USER_NAME} from '../../App';

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles['profile__data']}>
        You are <span className={styles['profile__data_name']}>{USER_NAME}</span> and you are doing great.

      </div>

    </div>
  )
};