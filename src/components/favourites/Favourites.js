import React from 'react';
import './Favourites.css';

const Favourites = (props) => {
  return(
  <section className="Favourites">
    <h2>Favourites</h2>
    <div className="favourites-container">
      {/* {console.log(Object.entries(props.favouritePets))} */}
      {Object.entries(props.favouritePets).map((pet) => {
        return(
          <div className="pet" key={pet[0]}>
            <div className="img-container">
              <img src={pet[1].photo} alt=""/>
            </div>
            <h3>{pet[1].name}</h3>
            <p>{pet[1].age}</p>
            {/* Checking if the returned pet has multiple breeds in an array */}
            <p>Breed(s): {Array.isArray(pet[1].breed) ?
              pet[1].breed.map((breeds) => {
                return `${breeds} `;
              })
              : pet[1].breed
              }</p>
              {/* Click To add to favourites */}
              <button onClick={() => {props.removeFromFavourites(pet[0])}} id={pet[0]}>Remove</button>
          </div>
        )
      })}
    </div>
  </section>
  )
}

export default Favourites;