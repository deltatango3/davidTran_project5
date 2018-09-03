import React from 'react';

const ExpandButton = (props) => {
  return (
    <button onClick={props.revealFavourites} className="expand-btn round-btn" title="Show Favourites">Expand</button>
  )
}

export default ExpandButton;