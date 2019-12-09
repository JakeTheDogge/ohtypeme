import React, { useState, useEffect } from 'react';
// import PracticeInput from './PracticeInput';
import { Result } from './Result';
import { PracticeText } from './PracticeText'
import RaceState from '../Race/RaceState'
import styles from './Practice.module.css';


const Practice = (props) => {
  const [input, setInputValue] = useState('');
  const [text, setText] = useState('Wait a moment, darling');
  const textInput = React.createRef();
  const randomId = () => Math.floor(Math.random() * Math.floor(2130) + 1);


  async function fetchText() {
    const response = await fetch(`/quotes/${randomId()}`)
    response.json()
      .then(data => setText(data.text))

  };
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const toggleClick = () => {
    fetchText();
    textInput.current.value = '';
    textInput.current.focus();

  };

  useEffect(() => { fetchText() }, [])


  const handleInputChange = () => {
    setInputValue(textInput.current.value);
  };

  return (
    <div className={styles.practice}>
      <div className={styles.practiceZone}>
        {props.participants && <RaceState participants={props.participants} procent={props.procent} />}
        <PracticeText value={text} input={input} />
        <div className={styles['practice__input']}>
          <textarea onChange={handleInputChange} ref={textInput} className={styles['practice__input_textarea']} autoFocus='on' spellCheck="false" autoCapitalize='off' autoCorrect='off' autoComplete='off'></textarea>
        </div>

      </div>
      <div className={styles.statsZone}>
        <button className={styles.repeatButton} onClick={toggleClick} />
        <Result />
      </div>
    </div >
  )
}

export default Practice;