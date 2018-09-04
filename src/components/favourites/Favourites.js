import React from 'react';
import './Favourites.css';
import CloseButton from '../close-button/CloseButton';

const Favourites = (props) => {
  return(
  <section className={`favourites ${props.favouritesActive === true ? 'expand-favourites' : 'close-favourites'}`}>
    <CloseButton closeFavourites={props.closeFavourites} />
    <h2>Favourites</h2>
    <div className="favourites-container">
      {/* {console.log(Object.entries(props.favouritePets))} */}
      {props.favouritePets ? 
        Object.entries(props.favouritePets).map((pet) => {
          return(
            <div className="pet-wrapper">
              <div className="pet" key={pet[0]}>
                <div className="img-container">
                  <img src={pet[1].photo} alt=""/>
                </div>
                <div className="pet-info">
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
                  </div>
              </div>
              <button className="favourite-btn" onClick={() => {props.removeFromFavourites(pet[0])}} id={pet[0]}>Remove</button>
            </div>
          )
        }) : <p className="favourites-blurb">You have no favourite pets yet!</p>
      }
    </div>
  </section>
  )
}

export default Favourites;