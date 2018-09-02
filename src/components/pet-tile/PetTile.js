import React from 'react';
import './PetTile.css';

const PetTile = (props) => {
  return (
    <div className="pets-wrapper">
    {props.mapItem.map((pet) => {
      return(
        <div className="pet" key={pet.id.$t} onClick={() => {props.displayPetProfile(pet)}}>
          <div className="img-container">
            <img src={pet.photo.$t} alt=""/>
          </div>
          <h3>{pet.name.$t}</h3>
          <p>{pet.age.$t}</p>
          {/* Check if breed is an array or handle it as normal */}
          <p>Breed(s): {Array.isArray(pet.breed) ?
            pet.breed.map((breeds) => {
              return `${breeds.$t} `;
            })
          : pet.breed.$t}</p>
          {/* If pet location exists, display it (for random pets to see where they came from) */}
          {pet.location ? <p>Location: {pet.location.$t}</p> : null}
          <button onClick={() => {props.addToFavourites(pet)}}>Like</button>
        </div>
      )
    })}
    </div>
  )
}

export default PetTile;