import React from 'react';
import './RandomPetButton.css';

const RandomPetButton = (props) => {
  return(
    <button className="btn" onClick={props.getRandomPet}>See Random Pet</button>
  );
}


export default RandomPetButton;