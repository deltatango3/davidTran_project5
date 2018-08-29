import React from 'react';

const Gallery = (props) => {
  console.log(props);
  return(
    <section className = "gallery" >
      <h2>Gallery</h2>
      {props.petList.map((pet) => {
        return (
          <div className="pet">
            <h3>{pet.name.$t}</h3>
            <p>{pet.age.$t}</p>
            <p>{pet.breed.$t}</p>
          </div>
        )
      })}
    </section>
  )
}

export default Gallery;