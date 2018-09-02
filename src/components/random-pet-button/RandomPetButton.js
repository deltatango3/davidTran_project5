import React from 'react';
import './RandomPetButton.css';

const RandomPetButton = (props) => {
  const handleClick = () => {
    props.getRandomPet();
    props.makeVisible();
    props.displayType('random-pet');
  }
  return(
    <button className="btn" onClick={handleClick}>See Random Pet</button>
  );
}

export default RandomPetButton;