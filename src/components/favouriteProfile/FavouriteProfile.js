import React from "react";

const FavouriteProfile = props => {
  const pet = props.favouritePets[props.petKey];
  return pet ? (
    <section className="profile">
      <button className="close-btn" onClick={props.hideFavouriteProfile}>
        &times;
      </button>
      <div className="pet-profile-wrapper">
        <div className="pet-profile">
          <div className="img-container">
            <img src={pet.photo} alt="" />
          </div>
          <div className="profile-information blurb">
            <h2 className="pet-name">{pet.name}</h2>
            {/* Checking if the returned pet has multiple breeds in an array */}
            <p>
              Breed(s):{" "}
              {Array.isArray(pet.breed)
                ? pet.breed.map(breeds => {
                    return `${breeds} `;
                  })
                : pet.breed}
            </p>
            <p>{pet.age}</p>
            <p>{`Gender: ${pet.gender}`}</p>
            <p className="description">{pet.description}</p>
            {/* <div className="misc-info">
                      <h3>More Information</h3>
                      <p>
                      {pet.misc[0] === undefined ? `Contact for more details` : 
                        (Array.isArray(pet.misc[0]) ? 
                          pet.misc[0].map((miscInfo) => {
                            return `${miscInfo.$t} `;
                          }) :
                          pet.misc[0].$t
                        ) 
                      }
                      </p>
                    </div> */}
            <div className="contact-info">
              <h3>Contact</h3>
              <p>{pet.address}</p>
              <p>{pet.city}</p>
              <p>{pet.state}</p>
              <p>{pet.phone}</p>
              <p>{pet.email}</p>
            </div>
            {/* <p>Shelter: {info.shelterID.$t}</p> */}
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default FavouriteProfile;
