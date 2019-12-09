import React from 'react';
import styles from './Practice.module.css';

const PracticeInput = React.forwardRef((props, ref) => {
  return (
    <div className={styles['practice__input']}>
      <textarea ref={ref} className={styles['practice__input_textarea']} autoFocus='on' spellCheck="false" autoCapitalize='off' autoCorrect='off' autoComplete='off'></textarea>
    </div>
  )
})
// control input with redux
export default PracticeInput;