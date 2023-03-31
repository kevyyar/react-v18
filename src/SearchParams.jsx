import { useState, useEffect } from 'react'
import Results from './Results'
import useBreedList from './useBreedList'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [location, setLocation] = useState('')
  const [animal, setAnimal] = useState('')
  const [breed, setBreed] = useState('')
  const [pets, setPets] = useState([])
  const [ breedList ] = useBreedList(animal)

  useEffect(() => {
    requestPets()
  }, [])

  async function requestPets() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
    const json = await res.json()

    setPets(json.pets)
  }

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault()
        requestPets()
      }}>
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
          disabled={breedList.length === 0}
          value={breed}
          onChange={(e) => setBreed(e.target.value)}>
          <option />
          {breedList.map(breed => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams;
