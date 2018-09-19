import React from 'react';
import loadingGif from '../../assets/dog.gif';
import './LoadingState.css';

const LoadingState = () => {
  return(
    <div className="loading-container">
      <img src={loadingGif} alt=""/>
    </div>
  )
}

export default LoadingState;