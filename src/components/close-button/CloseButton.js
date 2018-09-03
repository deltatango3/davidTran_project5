import React from 'react';

const CloseButton = (props) => {
  return (
    <button onClick={props.closeFavourites} className="round-btn close-btn" title="Close Favourites">Close</button>
  )
}

export default CloseButton;