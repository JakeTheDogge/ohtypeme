import React, { useState, useEffect } from 'react';
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
  const startGameButton = React.createRef();
  const [speed, setSpeed] = useState(0)
  const { time, percents, text, gameIsToStart, ids, isRoundOn } = props;
  const randomId = () => Math.floor(Math.random() * Math.floor(2130) + 1);
  const manager = Manager.getInstance(params.roomId, USER_NAME, RANDOM_SUFFIX);


  function fetchText() {
    fetch(`http://ohtypeme.ml/quotes/${randomId()}`)
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

  const endGame = () => {
    props.endTyping();
    setInput('');
    setPercent(0);
    setMistakes(0);
    startGameButton.current.focus();
    manager.finishRound();
    manager.sendProgress(0)
  }

  useEffect(() => {
    startGameButton.current.focus();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);

    setSpeed(Math.round((common([e.target.value, text]).length * 12 / ((Date.now() - time) / 1000))));
    if ((e.target.value.length > input.length) && (e.target.value[e.target.value.length - 1] !== text[e.target.value.length - 1])) {
      setMistakes(mistakes + 1)
    }
    if (e.target.value.length === text.length && common([e.target.value, text]) === text) {
      manager.finishRound();
      props.endTyping();
      setInput('');
      setPercent(0);
      setMistakes(0);
      startGameButton.current.focus();
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
      {time && <Clock timestamp={time} />}}
      <div className={styles.practice}>
        <div className={styles.practiceZone}>
          <RaceState participants={ids} percents={percents} myId={manager.webRTC.peerId} myPercent={percent} />

          <PracticeText value={text} input={input} />
          <div className={styles['practice__input']}>
            <textarea value={input} onChange={handleInputChange} ref={textInput} className={styles['practice__input_textarea']} autoFocus='on' spellCheck="false" autoCapitalize='off' autoCorrect='off' autoComplete='off' />
          </div>
        </div>
        <div className={styles.statsZone}>
          <div className={styles.buttons}>
            <button title='Start a Race!' ref={startGameButton} className={styles.startGame} onClick={() => { startGame() }} />
            <button title='Finish Race!' className={styles.endGame} onClick={() => { endGame() }} />
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Race);
