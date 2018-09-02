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
                {info.misc[0] === undefined ? `Contact for more details` : 
                  (Array.isArray(info.misc[0]) ? 
                    info.misc[0].map((miscInfo) => {
                      return `${miscInfo.$t} `;
                    }) :
                    info.misc[0].$t
                  ) 
                }
                {/* {Array.isArray(info.misc) ? 
                  info.misc[0].map((miscInfo) => {
                    return (miscInfo[0] === undefined ? `Contact for more details` :
                      `${miscInfo.$t} `)
                  }) : info.misc[0].$t
                } */}
                {/* {info.misc === undefined ? console.log('there is no misc info') : 
                  info.misc[0].map((miscInfo) => {
                    return (
                      <p key={miscInfo.$t}>{miscInfo.$t}</p>
                    )
                  }) 
                } */}
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