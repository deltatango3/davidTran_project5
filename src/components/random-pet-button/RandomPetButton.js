import React from 'react';
import './RandomPetButton.css';

const RandomPetButton = (props) => {
  const handleClick = () => {
    props.getRandomPet();
    props.makeVisible();
    props.displayType('random-pet');
    props.revealMenuSearch();
  }
  return(
    <button className="random-btn btn" onClick={handleClick}>See Random Pet</button>
  );
}

export default RandomPetButton;