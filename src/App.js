import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Home } from './components/Home/Home';
import Race from './components/Race/Race';
import { Profile } from './components/Profile/Profile';
import Practice from './components/Practice/Practice.jsx';
import uid from 'uid2';
import _ from 'lodash';
import { names } from './names';

export const getDataFromLS = (key, defaultValue) => {
  if (!localStorage.getItem(String(key))) {
    localStorage.setItem(String(key), defaultValue);
    return defaultValue;
  } else { 
    return localStorage.getItem(String(key)) 
  }
};

export const USER_NAME = getDataFromLS('userName', _.sample(names));
export const RANDOM_SUFFIX = getDataFromLS('randomSuffix', uid(6, undefined));

function App() {
  return (
    <>
      <Router>
        <div className={styles.menu}>
          <div >
            <NavLink to='/' className={styles.menuTitle}  > Oh Type Me </NavLink>
          </div>
          <div>
            <NavLink to='/practice' className={styles.menuItem} activeClassName={styles.selectedNav} > Practice </NavLink>
            <NavLink to={'/race/' + uid(6, undefined)} className={styles.menuItem} activeClassName={styles.selectedNav}> Race </NavLink>
            <NavLink to='/profile' className={styles.menuItem} activeClassName={styles.selectedNav}> Profile </NavLink>
          </div>
        </div>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/practice' component={Practice} />
          <Route path='/race/:raceId' component={Race} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
