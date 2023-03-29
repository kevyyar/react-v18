import Pet from "./Pet"

export default function Results({ pets }) {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No pets found</h1>
      ) : (
        pets.map(pet => (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
          />
        )))}
    </div>
  )
}
