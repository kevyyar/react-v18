import { useState } from 'react'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [location, setLocation] = useState('')
  const [animal, setAnimal] = useState('')
  const [breed, setBreed] = useState('')
  const breeds = []

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
        </label>
        <select
          id="animal"
          value={animal}
          onChange={
            (e) => {
              setAnimal(e.target.value)
              setBreed("")
            }
          }>
          <option />
          {ANIMALS.map(animal => (
            <option key={animal}>{animal}</option>
          ))}
        </select>
        <label htmlFor="breed">
          Breeds
        </label>
        <select
          id="breed"
          disabled={breeds.length === 0}
          value={breed}
          onChange={(e) => setBreed(e.target.value)}>
          <option />
          {breeds.map(breed => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SearchParams;
