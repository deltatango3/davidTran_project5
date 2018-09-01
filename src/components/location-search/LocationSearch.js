import React, {Component} from 'react';
import './LocationSearch.css';
import {getPetDataByLocation} from '../../axios'

// User will be able to input a location.
// Plug that location into a axios call and return 100 animals that are up for adoption in that area. 
class LocationSearchForm extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
    }
  }
  locationChange = (input) => {
    //Record the change that happens in the location field and set the state of location. 
    this.setState({
      [input.target.id]: input.target.value,
    })
  }
  locationSubmit = (e) => {
    console.log('location submit is called')
    e.preventDefault();
    //Pass the location that is submitted back to the APP function that makes the axios call.
    // Make a function in the APP that makes the call
    this.props.returnPetsByLocation(this.state.location);
  }
  render() {  
    return(
      <form onSubmit={this.locationSubmit}>
        <label htmlFor="location-search"></label>
        <input onChange={this.locationChange} id="location" type="text" required placeholder="Location (City, Provice)"/>
        <input type="submit" value="Search this location"/>
      </form>
    )
  }
}

export default LocationSearchForm