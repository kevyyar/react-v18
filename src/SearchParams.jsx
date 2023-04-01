import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import fetchSearch from './fetchSearch';
import Results from './Results'
import useBreedList from './useBreedList'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [animal, setAnimal] = useState('')
  const [breedList] = useBreedList(animal)
  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: ""
  })

  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results?.data?.pets ?? []

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const obj = {
          animal: formData.get("animal") ?? "",
          location: formData.get("location") ?? "",
          breed: formData.get("breed") ?? "",
        }
        setRequestParams(obj)
      }}>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
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
          name="breed"
          disabled={breedList.length === 0}
        >
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
