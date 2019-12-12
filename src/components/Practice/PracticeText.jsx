import React from 'react';
import styles from './Practice.module.css';
import common from 'common-prefix';


export const PracticeText = (props) => {
  const leftText = props.value.slice(props.input.length);

  const checkSpelling = () => {
    const prefix = common([props.input, props.value]);
    const right = props.value.slice(0, prefix.length);
    const wrong = prefix.length === props.input.length ? '' : props.value.slice(prefix.length, props.input.length);
    return [right, wrong];
  };

  const [right, wrong] = checkSpelling();

  return (
    <div className={styles['practice__text']}>
      <div className={styles['practice__text_textarea']}>
        {right && <span className={styles.rightText}>{right}</span>}
        {wrong && <span className={styles.wrongText}>{wrong}</span>}
        {leftText && <span>{leftText}</span>}
      </div>
    </div>
  )
};
