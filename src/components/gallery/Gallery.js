import React from 'react';
import './Gallery.css';
import PetTile from '../pet-tile/PetTile';

const Gallery = (props) => {
  return(
    <section className = "gallery" >
      <h2>Gallery</h2>
      <div className="gallery-container">
        <PetTile petList={props.petList} mapItem={props.petList} addToFavourites={props.addToFavourites}/>
        <PetTile randomPet={props.randomPet} mapItem={props.randomPet} addToFavourites={props.addToFavourites}/>
      </div>
    </section>
  )
}

export default Gallery;