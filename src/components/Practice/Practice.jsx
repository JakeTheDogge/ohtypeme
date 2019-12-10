import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Result } from './Result';
import { PracticeText } from './PracticeText';
import RaceState from '../Race/RaceState';
import styles from './Practice.module.css';
import {loadText} from '../../redux/actions';
import Manager from '../../communications/Manager';
import ID from '../../communications/ID';


const Practice = (props) => {
  const [input, setInput] = useState('');
  // const [text, setText] = useState('Wait a moment, darling');
  const [mistakes, setMistakes] = useState(0);
  const [procent, setProcent] = useState(0);
  const textInput = React.createRef();
  const randomId = () => Math.floor(Math.random() * Math.floor(2130) + 1);


  async function fetchText() {
    const response = await fetch(`http://167.172.164.93:8800/quotes/${randomId()}`);
    response.json()
      .then(text => props.loadText(text))

  };
  useEffect(() => {
    textInput.current.focus();
  }, []);



  const toggleClick = () => {
    fetchText();
    setInput('');
    textInput.current.focus();
    setProcent(0);
    setMistakes(0);
  };

  useEffect(() => { fetchText() }, [])

  const startGame = () => { fetchText(); };


  const handleInputChange = (e) => {
    setInput(e.target.value);
    if ((e.target.value.length > input.length) && (e.target.value[e.target.value.length - 1] !== text[e.target.value.length - 1])) {
      setMistakes(mistakes + 1)
    };
    setProcent(e.target.value.length / text.length);
    

  };
  const { text } = props;

  return (

    <div className={styles.practice}>
      <div className={styles.practiceZone}>
        {props.participants && <RaceState participants={props.participants} procent={procent} />}
        <PracticeText value={text} input={input} />
        <div className={styles['practice__input']}>
          <textarea value={input} onChange={handleInputChange} ref={textInput} className={styles['practice__input_textarea']} autoFocus='on' spellCheck="false" autoCapitalize='off' autoCorrect='off' autoComplete='off'></textarea>
        </div>

      </div>
      <div className={styles.statsZone}>
        {props.participants && <button className={styles.startGame} onClick={startGame} />}
        <button className={styles.repeatButton} onClick={toggleClick} />
        <Result mistakes={mistakes} text={text} />
      </div>
    </div >
  )
}
const mapDispatchToProps = dispatch => ({
  loadText: text => dispatch(loadText(text)),
});
const mapStateToProps = state => ({ text: state.text });

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Practice);