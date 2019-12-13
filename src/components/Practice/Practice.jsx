import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Result } from './Result';
import { PracticeText } from './PracticeText';
import RaceState from '../Race/RaceState';
import styles from './Practice.module.css';
import { loadText, roundIsToStart, endTyping, startRound, endCountdown, START_ROUND } from '../../redux/actions';
import common from 'common-prefix';
import Clock from '../Clock.jsx';
import { is } from '@babel/types';
import RaceItem from '../Race/RaceItem';

// import Manager from '../../communications/Manager';
// import ID from '../../communications/ID';


const Practice = (props) => {
  const [input, setInput] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [percent, setPercent] = useState(0);
  const textInput = React.createRef();
  const [speed, setSpeed] = useState(0)
  const [time, setTime] = useState(null);
  const [text, setText] = useState('Wait a moment, darling');
  const randomId = () => Math.floor(Math.random() * Math.floor(2130) + 1);


  function fetchText() {
    fetch(`https://ohtypeme.ml/quotes/${randomId()}`)
      .then(response => response.json())
      .then(data => setText(data.text))
  }

  useEffect(() => {
    textInput.current.focus();
  }, []);



  const toggleClick = () => {
    fetchText();
    setInput('');
    textInput.current.focus();
    setPercent(0);
    setMistakes(0);
    setSpeed(0);
    setPercent(0)
    setTime(Date.now() + 5000)
  };

  useEffect(() => { fetchText() }, []);



  const handleInputChange = (e) => {
    setInput(e.target.value);
 
      setSpeed(Math.round((common([e.target.value, text]).length * 12 /  (new Date(Date.now() - time).getSeconds()) )));

    if ((e.target.value.length > input.length) && (e.target.value[e.target.value.length - 1] !== text[e.target.value.length - 1])) {
      setMistakes(mistakes + 1)
    }
    // if (e.target.value.length === text.length && common([e.target.value, text]) === text) { props.endTyping() }
    setPercent(e.target.value.length / text.length);
  };

  console.log(time);
  return (
    <>
      {time && <Clock timestamp={time} />}
      <div className={styles.practice}>
        <div className={styles.practiceZone}>
          <RaceItem percent={percent}/>
          <PracticeText value={text} input={input} />
          <div className={styles['practice__input']}>
            <textarea value={input} onChange={handleInputChange} ref={textInput} className={styles['practice__input_textarea']} autoFocus='on' spellCheck="false" autoCapitalize='off' autoCorrect='off' autoComplete='off'></textarea>
          </div>

        </div>
        <div className={styles.statsZone}>
          <button className={styles.repeatButton} title='New Text' onClick={toggleClick} />
          <Result mistakes={mistakes} text={text} speed={speed} />
        </div>
      </div >
    </>
  )
};

const mapDispatchToProps = dispatch => ({
  endTyping: () => dispatch(endTyping()),
  loadText: text => dispatch(loadText(text)),
  roundIsToStart: () => dispatch(roundIsToStart()),
  startRound: (payload) => dispatch(startRound(payload)),
  endCountdown: () => dispatch(endCountdown())
});
const mapStateToProps = state => ({ text: state.text, gameIsToStart: state.gameIsToStart, time: state.time });

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Practice);