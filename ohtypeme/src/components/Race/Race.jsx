import React from 'react';
import Practice from '../Practice/Practice';


const Race = () => {
  const getProcent = () => 0.34;
  const getParticipants = () => [{ id: 1, procent: 0.34 }, { id: 2, procent: 0.76 }];
  return (
    <>
      <Practice participants={getParticipants()} procent={getProcent()} />
    </>
  )
};

export default Race;