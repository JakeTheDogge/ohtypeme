import React from 'react';
import Practice from '../Practice/Practice';


const Race = (props) => {
  const {
    match: { params },
  } = props;
  const getParticipants = () => [{ id: 1, procent: 0.34 }, { id: 2, procent: 0.76 }];
  return (
    <>
      <Practice participants={getParticipants()} roomId={params.raceId} />
    </>
  )
};

export default Race;