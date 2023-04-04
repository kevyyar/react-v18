import { useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import AdoptedPetContext from './AdoptedPetContext';
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
    const [adoptedPet, _] = useContext(AdoptedPetContext)

    const results = useQuery(["search", requestParams], fetchSearch);

    const pets = results?.data?.pets ?? []

    return (
        <div className="search-params">
            <form className='p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center' onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    location: formData.get("location") ?? "",
                    breed: formData.get("breed") ?? "",
                }
                setRequestParams(obj)
            }}>
                {
                    adoptedPet ? (
                        <div className='pet image-container'>
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null
                }
                <label htmlFor="location">
                    Location
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Location"
                        className='search-input'
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        className='search-input'
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
                </label>
                <label htmlFor="breed">
                    Breeds
                    <select
                        id="breed"
                        name="breed"
                        className='search-input grayed-out-disabled'
                        disabled={breedList.length === 0}
                    >
                        <option />
                        {breedList.map(breed => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button className='rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500' type="submit">Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams;
