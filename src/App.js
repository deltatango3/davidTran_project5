import React, { Component } from 'react';
import './utils.css';
import './general.css';
import './typography.css';
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
import LoadingState from './components/loading-state/LoadingState';

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
      favouritesActive: false,
      menuSearchVisible: false,
      loadingState: false,
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
    this.destroyStates();
    getPetDataByLocation(location).then(({data}) => {
      const pets = data.petfinder.pets.pet;
      this.chooseRandomPets(pets);
    })
  }
  //Returns 5 random pets from the list.
  chooseRandomPets = (pets) => {
    let randomPets = [];
    for (let i = 0; i < 6; i++) {
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
      petList: petsArray,
      loadingState: false,
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
        id: pet.id.$t,
        name: pet.name.$t,
        age: pet.age.$t,
        breed: pet.breed.$t || [pet.breed[0].$t, pet.breed[1].$t],
        photo: pet.photo.$t,
        address: pet.address.$t ? pet.address.$t : '',
        type: pet.type.$t ? pet.type.$t : '',
        description: pet.description.$t ? pet.description.$t : '',
        gender: pet.gender.$t ? pet.gender.$t : '',
        size: pet.size.$t ? pet.size.$t : '',
        city: pet.city.$t ? pet.city.$t : '',
        state: pet.state.$t ? pet.state.$t : '',
        zip: pet.zip.$t ? pet.zip.$t : '',
        email: pet.email.$t ? pet.email.$t : '',
        phone: pet.phone.$t ? pet.phone.$t : '',
        // misc: !pet.misc[0] === undefined ? pet.misc[0].map((misc) => {
        //   console.log(misc);
        //   return misc;
        // }) : '',
        shelterID: pet.shelterID.$t ? pet.shelterID.$t : '',
        status: pet.status.$t ? pet.status.$t : '',
      });
    }
  }
  removeFromFavourites = (petID) => {
    const petDbRef = firebase.database().ref(petID)

    petDbRef.remove();
  }
  revealFavourites = () => {
    this.setState({
      favouritesActive: true,
    })
  }
  closeFavourites = () => {
    this.setState({
      favouritesActive: false,
    })
  }
  getRandomPet = () => {
    this.destroyStates();
    getRandomPetData().then(({data}) => {
      const pet = data.petfinder.pet;
      this.displayRandomPet(pet);
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
      randomPet,
      loadingState: false,
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
      // misc: pet.misc,
      shelterID: pet.shelterID,
      status: pet.status,
    }]
    this.setState({
      petProfile,
      petProfileActive: true,
    })
  }
  closePetProfile = () => {
    this.setState({
      petProfileActive: false,
    })
  }
  makeVisible = () => {
    this.setState({
      visible: true,
    })
  }
  setDisplayType = (displayType) => {
    this.setState({
      displayType
    })
  }
  revealMenuSearch = () => {
    this.setState({
      menuSearchVisible: true,
    })
  }
  destroyStates = () => {
    this.setState({
      petList: [],
      randomPet: [],
      loadingState: true,
    })
  }
  render() {
    return (
      <div className="App">
        <Header revealFavourites={this.revealFavourites} returnPetsByLocation={this.returnPetsByLocation} makeVisible={this.makeVisible} setDisplayType={this.setDisplayType} visibleState={this.state.visible} menuSearchVisible={this.state.menuSearchVisible} revealMenuSearch={this.revealMenuSearch} getRandomPet={this.getRandomPet}/>
        <main>
          <LocationSearchForm returnPetsByLocation={this.returnPetsByLocation} makeVisible={this.makeVisible} setDisplayType={this.setDisplayType} buttonText={'Search by Location'} visibleState={this.state.visible} revealMenuSearch={this.revealMenuSearch} menuSearchVisible={this.state.menuSearchVisible}/>

          {this.state.loadingState ? <LoadingState/> : null}

          <span className={this.state.menuSearchVisible === true ? 'hidden' : 'active'}>OR</span>
          
          <RandomPetButton getRandomPet={this.getRandomPet} makeVisible={this.makeVisible} displayType={this.setDisplayType} revealMenuSearch={this.revealMenuSearch} menuSearchVisible={this.state.menuSearchVisible}/>

          <Gallery addToFavourites={this.addToFavourites} petList={this.state.petList} randomPet={this.state.randomPet} showMorePetInfo={this.showMorePetInfo} displayPetProfile={this.displayPetProfile} visibleState={this.state.visible} displayType={this.state.displayType} />
          
          <PetProfile petProfile={this.state.petProfile} petProfileActive={this.state.petProfileActive} closePetProfile={this.closePetProfile} addToFavourites={this.addToFavourites} />
        </main>

        <Favourites favouritePets={this.state.favouritePets} removeFromFavourites={this.removeFromFavourites} favouritesActive={this.state.favouritesActive} closeFavourites={this.closeFavourites} displayPetProfile={this.displayPetProfile} closePetProfile={this.closePetProfile}/>
      </div>
    );
  }
}

export default App;
