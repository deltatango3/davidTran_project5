import React, {Component} from 'react';
import './Favourites.css';
import CloseButton from '../close-button/CloseButton';
import FavouriteProfile from '../favouriteProfile/FavouriteProfile';


class Favourites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProfile: false,
      key: '',
    }
  }
  showFavouriteProfile = (key) => {
    this.setState({
      showProfile: true,
      key, 
    })
  }
  hideFavouriteProfile = () => {
    this.setState({
      showProfile: false,
    })
  }
  render() {
    return(
    <section className={`favourites ${this.props.favouritesActive === true ? 'expand-favourites' : 'close-favourites'}`}>
      <CloseButton closeFavourites={this.props.closeFavourites} />
      <h2>Favourites</h2>
      <div className="favourites-container">
        {/* {console.log(Object.entries(this.props.favouritePets))} */}
        {this.props.favouritePets ? 
          Object.entries(this.props.favouritePets).map((pet) => {
            let key = pet[0];
            return(
              <div className="pet-wrapper" key={pet[0]} onClick={() => {this.showFavouriteProfile(key)}}>
                <div className="pet">
                  <div className="img-container">
                    <img src={pet[1].photo} alt=""/>
                  </div>
                  <div className="pet-info">
                    <h3>{pet[1].name}</h3>
                    <p>{pet[1].age}</p>
                    {/* Checking if the returned pet has multiple breeds in an array */}
                    <p>Breed(s): {Array.isArray(pet[1].breed) ?
                      pet[1].breed.map((breeds) => {
                        return `${breeds} `;
                      })
                      : pet[1].breed
                      }</p>
                      {/* Click To add to favourites */}
                    </div>
                </div>
                <button className="favourite-btn" onClick={() => {this.props.removeFromFavourites(pet[0])}} id={pet[0]}>Remove</button>
              </div>
            )
          }) : <p className="favourites-blurb">You have no favourite pets yet!</p>
        }
      </div>
      {this.state.showProfile === true ? 
        <FavouriteProfile petKey={this.state.key} favouritePets={this.props.favouritePets} hideFavouriteProfile={this.hideFavouriteProfile}/> : null
      }
    </section>
    )
  }
}

export default Favourites;