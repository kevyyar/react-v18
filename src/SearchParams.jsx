import { useState } from 'react'

const SearchParams = () => {
  const [location, setLocation] = useState('')

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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SearchParams;
