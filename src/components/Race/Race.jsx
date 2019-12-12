import React, { useEffect, useState } from 'react';
import Clock from '../Clock.jsx';
import styles from '../Practice/Practice.module.css';
import { connect } from 'react-redux';
import { PracticeText } from '../Practice/PracticeText';
import { loadText, roundIsToStart, endTyping, startRound, endCountdown, START_ROUND } from '../../redux/actions';
import common from 'common-prefix';
import Manager from '../../communications/Manager';
import { USER_NAME } from '../../App';


const Race = (props) => {
  const {
    match: { params },
  } = props;
  const [input, setInput] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [percent, setPercent] = useState(0);
  const textInput = React.createRef();
  const { text } = props;
  const { gameIsToStart } = props;
  const { time } = props;
  const randomId = () => Math.floor(Math.random() * Math.floor(2130) + 1);


  function fetchText() {
    fetch(`https://ohtypeme.ml/quotes/${randomId()}`)
      .then(response => response.json())
      .then(text => props.loadText(text))
  }

  const startGame = () => {
    fetchText();
    setInput('');
    textInput.current.focus();
    setPercent(0);
    setMistakes(0);
    props.roundIsToStart();
    props.startRound({ text: text, time: Date.now() + 5000 });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if ((e.target.value.length > input.length) && (e.target.value[e.target.value.length - 1] !== text[e.target.value.length - 1])) {
      setMistakes(mistakes + 1)
    }
    if (e.target.value.length === text.length && common([e.target.value, text]) === text) { props.endTyping() }
    setPercent(e.target.value.length / text.length);
  };

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <>
      {gameIsToStart && <div className={styles.gameIsToStart}> banner + countdown</div>}
      {time && <Clock timestamp={time} />}
      <PracticeText value={text} input={input} />
      <div className={styles['practice__input']}>
        <textarea value={input} onChange={handleInputChange} ref={textInput} className={styles['practice__input_textarea']} autoFocus='on' spellCheck="false" autoCapitalize='off' autoCorrect='off' autoComplete='off'></textarea>
      </div>
      {props.participants && <button title='Start a Race!' className={styles.startGame} onClick={startGame} />}

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
  mapDispatchToProps)(Race);
