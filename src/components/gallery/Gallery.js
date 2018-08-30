import React from 'react';

const Gallery = (props) => {
  return(
    <section className = "gallery" >
      <h2>Gallery</h2>
      {props.petList.map((pet) => {
        return (
          <div className="pet" key={pet.id.$t}>
            <h3>{pet.name.$t}</h3>
            <p>{pet.age.$t}</p>
            {/* Checking if the returned pet has multiple breeds in an array */}
            <p>Breed(s): {Array.isArray(pet.breed) ?
              pet.breed.map((breeds) => {
                return `${breeds.$t} `;
              })
              : pet.breed.$t
              }</p>
          </div>
        )
      })}
    </section>
  )
}

export default Gallery;