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
    <button className={`random-btn btn ${props.menuSearchVisible === true ? 'hidden reveal-random-btn': 'active'}`} onClick={handleClick}>Random Friend</button>
  );
}

export default RandomPetButton;