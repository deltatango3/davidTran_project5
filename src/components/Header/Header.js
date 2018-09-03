import React from 'react';
import './Header.css';
import ExpandButton from '../expand-button/ExpandButton';
import LocationSearchForm from '../location-search/LocationSearch';


const Header = (props) => {
  return (
    <header>
      <div className="wrapper">
        <h1>Best Friend Finder</h1>
        <LocationSearchForm returnPetsByLocation={props.returnPetsByLocation} setDisplayType={props.setDisplayType} buttonText={'Search'} makeVisible={props.makeVisible} visibleState={props.visibleState}/>
      </div>
      <ExpandButton revealFavourites={props.revealFavourites}/>
    </header>
  );
}

export default Header;