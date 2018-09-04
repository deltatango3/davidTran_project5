import React from 'react';
import Star from '../../assets/star-solid.svg'
import './ExpandButton.css';

const ExpandButton = (props) => {
  return (
    <button onClick={props.revealFavourites} className="expand-btn round-btn" title="Show Favourites"><img className="expand-icon" src={Star} alt="Show Favourites"/></button>
  )
}

export default ExpandButton;