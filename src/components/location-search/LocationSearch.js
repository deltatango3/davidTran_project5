import React, {Component} from 'react';
import './LocationSearch.css';

// User will be able to input a location.
// Plug that location into a axios call and return 100 animals that are up for adoption in that area. 
class LocationSearchForm extends Component {
  constructor(props) {
    super(props);
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
    e.preventDefault();
    //Pass the location that is submitted back to the APP function that makes the axios call.
    // Make a function in the APP that makes the call
    this.props.returnPetsByLocation(this.state.location);
    this.props.makeVisible();
    this.props.setDisplayType('location-pets');
    this.props.revealMenuSearch();
  }
  resetLocationField = (input) => {
    input.target.value = '';
  }
  render() {  
    return(
      <form className={`location-search ${this.props.menuSearchVisible === true ? 'hide-main-search' : 'hide-search-in-menu'}`} onSubmit={this.locationSubmit}>
        <label className="placeholder-label" htmlFor="location-search"></label>
        <input onChange={this.locationChange} onFocus={this.resetLocationField} className="location-field" id="location" type="text" required placeholder="Location (City, Province)" />
        <input className="location-btn btn" type="submit" value={this.props.buttonText}/>
      </form>
    )
  }
}

export default LocationSearchForm