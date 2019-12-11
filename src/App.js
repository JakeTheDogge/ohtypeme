import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Home } from './components/Home/Home';
import Race from './components/Race/Race';
import { Profile } from './components/Profile/Profile';
import Practice from './components/Practice/Practice.jsx';
import uid from 'uid2';
import { names } from './communications/names'

const randomId = () => Math.floor(Math.random() * Math.floor(27));
export const getDataFromLS = (key) => {
  if (!localStorage.getItem(String(key))) {
    const name = names[randomId()];
    localStorage.setItem(String(key), name)
    return name;
  } else { 
    return localStorage.getItem(String(key)) 
  }
}

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

            <NavLink to={'/race/' + uid(6)} className={styles.menuItem} activeClassName={styles.selectedNav}> Race </NavLink>

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
