import React, { useEffect, useState } from 'react';
import Clock from '../Clock.jsx';
import styles from '../Practice/Practice.module.css';
import { connect } from 'react-redux';
import { PracticeText } from '../Practice/PracticeText';
import {
  loadText,
  roundIsToStart,
  endTyping,
  startRound,
  endCountdown,
  START_ROUND,
  startTyping
} from '../../redux/actions';
import common from 'common-prefix';
import { Result } from '../Practice/Result';
import RaceState from '../Race/RaceState';
import Manager from '../../communications/Manager';
import { RANDOM_SUFFIX, USER_NAME } from '../../App';


const Race = (props) => {
  const {
    match: { params },
  } = props;
  const [input, setInput] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [percent, setPercent] = useState(0);
  const textInput = React.createRef();
  const [speed, setSpeed] = useState(0)
  const { time, percents, text, gameIsToStart, ids, isRoundOn } = props;
  const randomId = () => Math.floor(Math.random() * Math.floor(2130) + 1);
  const manager = Manager.getInstance(params.roomId, USER_NAME, RANDOM_SUFFIX);


  function fetchText() {
    fetch(`https://ohtypeme.ml/quotes/${randomId()}`)
      .then(response => response.json())
      .then(text => {
        props.loadText(text);
        manager.prepareToStartNewRound(text);
      })
  }

  const startGame = () => {
    props.endTyping();
    fetchText();
    setInput('');
    textInput.current.focus();
    setPercent(0);
    setMistakes(0);
    props.roundIsToStart();
  };

  const endGame =() => {
    props.endTyping();
    setInput('');
    setPercent(0);
    setMistakes(0);
    manager.finishRound();
  })

  const handleInputChange = (e) => {
    setInput(e.target.value);

    setSpeed(Math.round((common([e.target.value, text]).length * 12 / (new Date(Date.now() - time).getSeconds()))));
    if ((e.target.value.length > input.length) && (e.target.value[e.target.value.length - 1] !== text[e.target.value.length - 1])) {
      setMistakes(mistakes + 1)
    }
    if (e.target.value.length === text.length && common([e.target.value, text]) === text) {
      manager.finishRound();
      props.endTyping();
    }
    const progress = e.target.value.length / text.length;
    setPercent(progress);
    console.log('sending progress');
    console.log(progress, manager);
    manager.sendProgress(progress)
  };

  return (
    <>
      {gameIsToStart && <div className={styles.gameIsToStart}> <div className={styles.popup}> Waiting for your friends </div></div>}
      {time && <Clock timestamp={time} />}
      <div className={styles.practice}>
        <div className={styles.practiceZone}>
          <RaceState participants={ids} percents={percents} myId={manager.webRTC.peerId} myPercent={percent}/>

          <PracticeText value={text} input={input} />
          {isRoundOn || <div className={styles['practice__input']}>
            <textarea value={input} onChange={handleInputChange} ref={textInput} className={styles['practice__input_textarea']} autoFocus='on' spellCheck="false" autoCapitalize='off' autoCorrect='off' autoComplete='off' />
          </div>}
        </div>
        <div className={styles.statsZone}>
          <button title='Start a Race!' className={styles.startGame} onClick={() => {startGame()}} />
          <button title='Finish Race!' className={styles.startGame} onClick={() => {endGame()}} />
          <Result mistakes={mistakes} text={text} speed={speed} />
        </div>
      </div>
    </>
  )
};

const mapDispatchToProps = dispatch => ({
  endTyping: () => dispatch(endTyping()),
  loadText: text => dispatch(loadText(text)),
  roundIsToStart: () => dispatch(roundIsToStart()),
  startRound: (payload) => dispatch(startRound(payload)),
  endCountdown: () => dispatch(endCountdown()),
  startTyping: () => dispatch(startTyping()),
});
const mapStateToProps = state => ({
  text: state.text,
  gameIsToStart: state.gameIsToStart,
  time: state.time,
  percents: state.percents,
  ids: state.ids,
  isRoundOn: state.isRoundOn,
});
const mapStateToProps = state => ({ text: state.text, gameIsToStart: state.gameIsToStart, time: state.time, percents: state.percents, isRoundOn: state.isRoundOn });

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Race);
