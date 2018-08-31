import React from 'react';
import './Gallery.css';
import { randomBytes } from 'crypto';
import RandomPetButton from '../random-pet-button/RandomPetButton';

const Gallery = (props) => {
  return(
    <section className = "gallery" >
      <h2>Gallery</h2>
      <div className="gallery-container">
        {props.petList.map((pet) => {
          return (
            <div className="pet" key={pet.id.$t}>
              <div className="img-container">
                <img src={pet.photo.$t} alt=""/>
              </div>
              <h3>{pet.name.$t}</h3>
              <p>{pet.age.$t}</p>
              {/* Checking if the returned pet has multiple breeds in an array */}
              <p>Breed(s): {Array.isArray(pet.breed) ?
                pet.breed.map((breeds) => {
                  return `${breeds.$t} `;
                })
                : pet.breed.$t
                }</p>
                {/* Click To add to favourites */}
                <button onClick={() => {props.addToFavourites(pet)}}>Like</button>
            </div>
          )
        })}
          {props.randomPet.map((pet) => {
            return(
              <div className="random-pet" key={pet.id.$t}>
                <h3>{pet.name.$t}</h3>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default Gallery;