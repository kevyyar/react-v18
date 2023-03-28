import { useState } from 'react'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [location, setLocation] = useState('')
  const [animal, setAnimal] = useState('')

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
          onChange={(e) => setAnimal(e.target.value)}>
          <option />
          {ANIMALS.map(animal => (
            <option key={animal} value={animal}>{animal}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SearchParams;
