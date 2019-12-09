import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Home } from './components/Home/Home';
import  Race  from './components/Race/Race';
import { Profile } from './components/Profile/Profile';
import Practice from './components/Practice/Practice.jsx';

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

            <NavLink to='/race/:raceId' className={styles.menuItem} activeClassName={styles.selectedNav}> Race </NavLink>

            <NavLink to='/profile' className={styles.menuItem} activeClassName={styles.selectedNav}> Profile </NavLink>

          </div>
        
        </div>
        
        <Switch>
          <Route exact path='/'> <Home /> </Route>
          <Route path='/practice' > <Practice /></Route>
          <Route path='/race/:raceId'>  <Race /> </Route>
          <Route path='/profile'>  <Profile />  </Route>

        </Switch>
      </Router>

    </>
  );
}

export default App;
