import React from 'react';
import styles from './Practice.module.css';

export const PracticeText = (props) => {
  const inputedText = props.value.slice(0, props.input.length);
  
  const leftText = props.value.slice(props.input.length);

  return (
    <div className={styles['practice__text']}>
      <div className={styles['practice__text_textarea']}>
        {inputedText && <span className={styles.inputedText}>{inputedText}</span>}
        {leftText && <span>{leftText}</span>}
        </div>
    </div>
  )
};