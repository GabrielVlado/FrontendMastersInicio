import React, { useState, useEffect } from "react";
import pet,{ANIMALS} from '@frontendmasters/pet';
import useDropdown from './useDropdown'

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  //const [animal,setAnimal] = useState("")
  //const [breed,setBreed] = useState("")
  const [breeds,setBreeds] = useState ([])
  const [animal,AnimalDropdown] = useDropdown("Animal","dog",ANIMALS)
  const [breed, BreedDropdown,setBreed] = useDropdown ('Brreed', "",breeds)
  const [pets,setPets] =useState([])

  async function requestPets(){
    const {animals} = await pet.animals({
      location,
      breed,
      type: animal
    })
    setPets(animals || [])
  }

  useEffect (()=>{
    //pet.breeds("bird").then (console.log, console.error)    --- Esta linea me duevuelve las razas de pajaros en consola
  setBreeds([]);
  setBreed("");

  pet.breeds(animal).then(({breeds: apiBreeds})=>{
      const breedStrings = apiBreeds.map(({name})=> name)     //transformo un objeto que me entra que es breeds y obtengo solo lo que quiero que es name
      setBreeds(breedStrings)     // es igual (({name})=> name)
     },console.error)
  }, [animal,setBreed,setBreeds]) // El render depende de animal,setbreed,, setbreeds si no cambian no se rederiza de nuevo

  return (
    <div className="search-params">
      <form onSubmit={ e =>{
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown/>
        <BreedDropdown/>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default SearchParams;
