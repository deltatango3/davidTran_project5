import React from 'react';
import './CloseButton.css'

const CloseButton = (props) => {
  return (
    <button onClick={props.closeFavourites} className="close-btn" title="Close Favourites">&times;</button>
  )
}

export default CloseButton;