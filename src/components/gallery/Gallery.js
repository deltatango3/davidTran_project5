import React, {Component} from 'react';
import './Gallery.css';
import PetTile from '../pet-tile/PetTile';

const Gallery = (props) => {
  return(
    <section className={`gallery ${props.visibleState ? 'active' : 'hidden'}`}>
      <h2>Gallery</h2>
      <div className="gallery-container">
        <div className={`location-pets ${props.displayType === 'location-pets' ? 'active' : 'hidden'}`}>
          <PetTile petList={props.petList} mapItem={props.petList} addToFavourites={props.addToFavourites} displayPetProfile={props.displayPetProfile}/>
        </div>
        <div className={`random-pet ${props.displayType === 'random-pet' ? 'active' : 'hidden'}`}>
          <PetTile randomPet={props.randomPet} mapItem={props.randomPet} addToFavourites={props.addToFavourites} displayPetProfile={props.displayPetProfile}/>
        </div>
      </div>
    </section>
  )
}

export default Gallery;