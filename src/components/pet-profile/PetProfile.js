import React from 'react';
import './PetProfile.css';

const PetProfile = (props) => {
  return(
    <section className={`profile ${props.petProfileActive ? 'active' : 'hidden'}`}>
      <h3>Pet Card Here</h3>
        {props.petProfile.map((info) => {
          return(
            <div className="pet-profile" key={info.id.$t}>
              <img src={info.photo.$t} alt=""/>
              <h2>{info.name.$t}</h2>
              {/* Checking if the returned pet has multiple breeds in an array */}
              <p>Breed(s): {Array.isArray(info.breed) ?
                info.breed.map((breeds) => {
                  return `${breeds.$t} `;
                })
                : info.breed.$t}</p>
              <p>{info.age.$t}</p>
              <p>{info.gender.$t}</p>
              <p>{info.description.$t}</p>
              <div className="misc-info">
                <h3>Misc info here</h3>
                <p>

                </p>
                {/*Check if the options info is empty(returning an undefined. If not then check if its an array of items or just one object to display)  */}
                {info.misc[0] === undefined ? `Contact for more details` : 
                  (Array.isArray(info.misc[0]) ? 
                    info.misc[0].map((miscInfo) => {
                      return `${miscInfo.$t} `;
                    }) :
                    info.misc[0].$t
                  ) 
                }
              </div>
              <div className="contact-info">
                <h3>Contact Info</h3>
                <p>{info.address.$t}</p>
                <p>{info.city.$t}</p>
                <p>{info.state.$t}</p>
                <p>{info.phone.$t}</p>
                <p>{info.email.$t}</p>
              </div>
              <p>Shelter: {info.shelterID.$t}</p>
            </div>
          )
        })}
    </section>
  )
}

export default PetProfile;