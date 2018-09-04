import React from 'react';
import './PetTile.css';

const PetTile = (props) => {
  return (
    <div className="pets-wrapper wrapper">
    {props.mapItem.map((pet) => {
      console.log(pet);
      return(
        <div className="pet-wrapper" key={pet.id.$t}>
          <div className="pet" onClick={() => {props.displayPetProfile(pet)}}>
            <div className="img-container">
              <img src={pet.photo.$t} alt=""/>
            </div>
            <div className="pet-info">
              <h3 className="pet-name">{pet.name.$t}</h3>
              <div className="pet-info-extras">
                <p className="blurb">{pet.age.$t}</p>
                {/* Check if breed is an array or handle it as normal */}
                <p className="blurb">Breed(s): {Array.isArray(pet.breed) ?
                  pet.breed.map((breeds) => {
                    return `${breeds.$t} `;
                  })
                : pet.breed.$t}</p>
                {/* If pet location exists, display it (for random pets to see where they came from) */}
                {pet.location ? <p className="blurb">Location: {pet.location.$t}</p> : null}
              </div>
            </div>
          </div>
          <button className="favourite-btn" onClick={() => {props.addToFavourites(pet)}}>Add to Favourite</button>
        </div>
      )
    })}
    </div>
  )
}

export default PetTile;