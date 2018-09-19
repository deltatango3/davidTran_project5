import React from 'react';
import './Header.css';
import ExpandButton from '../expand-button/ExpandButton';
import LocationSearchForm from '../location-search/LocationSearch';
import RandomPetButton from '../random-pet-button/RandomPetButton';


const Header = (props) => {
  return (
    <header>
        <div className="top">
          <div className="wrapper">
            <h1>Up Dog</h1>
            <ExpandButton revealFavourites={props.revealFavourites}/>
          </div>
        </div>
        <div className={`cta-wrapper bottom ${props.menuSearchVisible === true ? 'visible' : 'invisible'}`}>
          <div className="wrapper">
            <RandomPetButton getRandomPet={props.getRandomPet} displayType={props.setDisplayType} makeVisible={props.makeVisible} revealMenuSearch={props.revealMenuSearch}/>
            
            <LocationSearchForm returnPetsByLocation={props.returnPetsByLocation} setDisplayType={props.setDisplayType} buttonText={'Search'} makeVisible={props.makeVisible} visibleState={props.visibleState} menuSearchVisible={props.menuSearchVisible} revealMenuSearch={props.revealMenuSearch}/>
          </div>
        </div>
    </header>
  );
}

export default Header;