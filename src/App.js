import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';

// Components
import Header from './components/header/Header';
import LocationSearchForm from './components/location-search/LocationSearch';
import Gallery from './components/gallery/Gallery';

const apiURL = 'https://api.petfinder.com/pet.find';
const apiKey = '03e269d9ab2bafaf6f5ace0f1ee278f1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      petList: [],
    }
  }
  //returnPetsByLocation is called by LocationSearch. It makes the axios to return X number of pets by location.
  //NEXT: I must display 5 random pets. Grab Five random animsl from the call. 
  //HOW: Do I pass this calls return to a new component called pet card and map it out?
  returnPetsByLocation = () => {
    console.log('return pets by location is called');
    axios({
      url: 'http://proxy.hackeryou.com',
      method: 'GET',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      },
      params: {
        reqUrl: apiURL,
        params: {
          key: apiKey,
          format: 'json',
          output: 'full',
          location: 'Toronto, ON',
          animal: 'dog',
          count: 10,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then(({data}) => {
      //pass data to a randomizer function.
      // console.log(data.petfinder.pets);
      const pets = data.petfinder.pets.pet;
      this.chooseRandomPets(pets);
    })
  }
  //Returns 5 random pets from the list.
  chooseRandomPets = (pets) => {
    console.log('choose random pets is called');
    let randomPet;
    let randomPets = [];
    for (let i = 0; i <= 4; i++) {
      randomPet = pets[Math.floor(Math.random() * pets.length)];
      randomPets.push(randomPet);
    }
    //Pass the randomly selected pets into another function that will grab the info needed and set the state of petlist
    this.getPetInfo(randomPets);
  }
  getPetInfo = (pets) => {
    console.log('get pet info is called')
    console.log(pets);
    const petsArray = pets.map((pet) => {
      return({
        name: pet.name,
        age: pet.age,
        breed: pet.breeds.breed
      })
    })
    this.setState({
      petList: petsArray
    })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <LocationSearchForm returnPetsByLocation={this.returnPetsByLocation} />
        <Gallery petList={this.state.petList}/>
      </div>
    );
  }
}

export default App;

//Get a random animal

// MVP

// User can submit a location (format: City, Province).
// API will return a call with 25 (I believe it is default latest updated profile) dogs that are up for adoption in the area.
// Display 5 dogs randomly.
//Basic profile will be displayed: name, age, breed, gender, one photo and 
//User can click 'Read More' to see a profile section with a description, contact information of each animal. 
// User will be able to randomize again to display 5 dogs randomly. You might see the same twice, leave this as is. Maybe the same dog appearing will signal DESTINY!

// Add a really random button to just see random adoptable pets in the database (worldwide?);


//STRETCH

//Favourite an animal, add it to Firebase. User will be able to see a list of animals they have favourited.

// Filter by breed (for dogs only?)
// Filter by type of animal (or allow toggle of Cats/Both)
// Find other pets in the same shelter by making another call to get the Shelter list. Display the dogs in that list.
