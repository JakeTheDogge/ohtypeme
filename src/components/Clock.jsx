import React from 'react';
import styles from './Practice/Practice.module.css';



class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: Date.now()
    });
  }

  countdown() {
    const leftTime = new Date(this.props.timestamp-Date.now());
    const leftSecs = leftTime.getSeconds();
    return leftSecs
  }

  render() {
    if (Date.now() >= this.props.timestamp) { return null; };
    return (
      <div className={styles.clock}>
        <div className={styles.popup}>
        00:0{this.countdown()}
        </div>
      </div>
    );
  }
}

export default Clock;