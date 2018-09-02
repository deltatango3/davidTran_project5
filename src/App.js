import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

//Axios Calls
import { getRandomPetData, getPetDataByLocation } from './axios.js';

// Components
import Header from './components/header/Header';
import LocationSearchForm from './components/location-search/LocationSearch';
import Gallery from './components/gallery/Gallery';
import Favourites from './components/favourites/Favourites';
import RandomPetButton from './components/random-pet-button/RandomPetButton';
import PetProfile from './components/pet-profile/PetProfile';

const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
      petList: [],
      favouritePets: [],
      randomPet: [],
      petProfile: [],
      visible: false,
      displayType: '',
      petProfileActive: false,
    }
  }
  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      this.setState({
        favouritePets: snapshot.val(),
      })
    })
  }
  //returnPetsByLocation is called by LocationSearch. It makes the axios to return X number of pets by location.
  //NEXT: I must display 5 random pets. Grab Five random animsl from the call. 
  //HOW: Do I pass this calls return to a new component called pet card and map it out?
  returnPetsByLocation = (location) => {
    getPetDataByLocation(location).then(({data}) => {
      const pets = data.petfinder.pets.pet;
      this.chooseRandomPets(pets);
    })
  }
  //Returns 5 random pets from the list.
  chooseRandomPets = (pets) => {
    let randomPets = [];
    for (let i = 0; i < 5; i++) {
      let randomIndex = [Math.floor(Math.random() * pets.length)];
      let randomPet = pets[randomIndex];
      randomPets.push(randomPet);
      pets.splice(randomIndex, 1);
    }
    //Pass the randomly selected pets into another function that will grab the info needed and set the state of petlist
    this.getPetInfo(randomPets);
  }
  getPetInfo = (pets) => {
    const petsArray = pets.map((pet) => {
      const photos = pet.media.photos.photo.filter((photo) => {
        return photo[`@size`] === 'x';
      });
      return({
        id: pet.id,
        name: pet.name,
        age: pet.age,
        breed: pet.breeds.breed,
        photo: photos[0],
        type: pet.animal,
        description: pet.description,
        gender: pet.sex,
        size: pet.size,
        address: pet.contact.address1,
        city: pet.contact.city,
        state: pet.contact.state,
        zip: pet.contact.zip,
        email: pet.contact.email,
        phone: pet.contact.phone,
        misc: [pet.options.option],
        shelterID: pet.shelterId,
        status: pet.status,
      })
    })
    this.setState({
      petList: petsArray
    })
  }
  addToFavourites = (pet) => {
    //If my Favourites list (in the DB) has an animal with the pet.id already, dont add it. 
    let currentFavourites;
    let currentFavouritesID = new Set();
    
    dbRef.on('value', (snapshot) => {
      if (snapshot.val()) {
        currentFavourites = Object.entries(snapshot.val());
        currentFavourites.map((favourite) => {
          currentFavouritesID.add(favourite[1].id)
        })
      }
    })

    if (!currentFavouritesID.has(pet.id.$t)) {
      dbRef.push({
        // key: pet.id.$t,
        id: pet.id.$t,
        name: pet.name.$t,
        age: pet.age.$t,
        breed: pet.breed.$t || [pet.breed[0].$t, pet.breed[1].$t],
        photo: pet.photo.$t
      });
    } 
  }
  removeFromFavourites = (petID) => {
    const petDbRef = firebase.database().ref(petID)

    petDbRef.remove();
  }
  getRandomPet = () => {
    getRandomPetData().then(({data}) => {
      const pet = data.petfinder.pet;
      this.displayRandomPet(pet);
      console.log(pet);
    })
  }
  displayRandomPet = (pet) => {
    const photos = pet.media.photos.photo.filter((photo) => {
      return photo[`@size`] === 'x';
    });

    const randomPet = [{
      id: pet.id,
      name: pet.name,
      age: pet.age,
      breed: pet.breeds.breed,
      photo: photos[0],
      location: pet.contact.city,
      type: pet.animal,
      description: pet.description,
      gender: pet.sex,
      size: pet.size,
      address: pet.contact.address1,
      city: pet.contact.city,
      state: pet.contact.state,
      zip: pet.contact.zip,
      email: pet.contact.email,
      phone: pet.contact.phone,
      misc: [pet.options.option],
      shelterID: pet.shelterId,
      status: pet.status,
    }]
    this.setState({
      randomPet
    })
  }
  displayPetProfile = (pet) => {
    const petProfile = [{
      id: pet.id,
      name: pet.name,
      age: pet.age,
      breed: pet.breed,
      photo: pet.photo,
      type: pet.type,
      description: pet.description,
      gender: pet.gender,
      size: pet.size,
      address: pet.address,
      city: pet.city,
      state: pet.state,
      zip: pet.zip,
      email: pet.email,
      phone: pet.phone,
      misc: [pet.misc[0]],
      shelterID: pet.shelterID,
      status: pet.status,
    }]
    this.setState({
      petProfile,
      petProfileActive: true,
    })
  }
  makeVisible = () => {
    // const currentState = this.state.visible;
    this.setState({
      // visible: !currentState,
      visible: true,
    })
  }
  setDisplayType = (displayType) => {
    this.setState({
      displayType
    })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <LocationSearchForm returnPetsByLocation={this.returnPetsByLocation} makeVisible={this.makeVisible} setDisplayType={this.setDisplayType} />
        <Gallery addToFavourites={this.addToFavourites} petList={this.state.petList} randomPet={this.state.randomPet} showMorePetInfo={this.showMorePetInfo} displayPetProfile={this.displayPetProfile} visibleState={this.state.visible} displayType={this.state.displayType} />
        <RandomPetButton getRandomPet={this.getRandomPet} makeVisible={this.makeVisible} displayType={this.setDisplayType} />
        <PetProfile petProfile={this.state.petProfile} petProfileActive={this.state.petProfileActive}/>
        <Favourites favouritePets={this.state.favouritePets} removeFromFavourites={this.removeFromFavourites} />
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
