import { useState, useCallback } from 'react'
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import axios from 'axios';

function App() {

  const [pokemonData, setPokemonData] = useState([]); // array of pokemon objects
  const [loading, setLoading] = useState(false); // boolean to show loading spinner
  const [nextPage, setNextPage] = useState([]); // array of pokemon objects for next Page, however not implemented yet
  const [error,setError] = useState(false); // setting error boolean state
  const [errorText,setErrorText] = useState(''); // error message
  const [retry,setRetry] = useState(false); // boolean to show retry button

  const baseUrl = 'https://hungry-woolly-leech.glitch.me/api/pokemon/search'; //setting the base url for the api


  const getPokemon = (query,retries) => { // function to get pokemon data
    setRetry(false)
    setError(false);  // setting error state to false at the start api call
    setLoading(true);
    axios.get(`${baseUrl}/${query}?chaos=true`)
    .then(response => {
    setPokemonData(response.data.pokemon); // setting pokemon data
    setLoading(false); 
   }).catch((error) => {   // error handling
     if(error.response){
     setRetry(true)
     setError(true)
     setErrorText(error.message); // setting error message
     setTimeout(() => {
       if(retries > 0){
        getPokemon(query,retries-1);
       }  // when there is an error true value in error state, then run the getPokemon function again after 3 seconds
       setRetry(false)
     },3000)      
     }
   })
  }

  const handleChange = (e) => { // handleChange function to get the value of the input field
    const { value } = e.target;
    getPokemon(value,2)
  }

  const debounce = (func) => { // debounce function to prevent multiple api calls
    let timer;

    return function(...args) {
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => { // setTimeout function to run the getPokemon function after 3 seconds
        timer = null;
        func.apply(context, args);
      }, 500);
    }
  }

  const optimizedSearch = useCallback(debounce(handleChange),[]); // useCallback is used to avoid re-rendering the component when the search query changes
   
  return (
    <div>
      <Search type="text" onChange={optimizedSearch} />
      {loading && !error ? <div className="alert alert-warning" role="alert">
      Loading...!
    </div> : <PokemonList pokemon={pokemonData}/>}
      {error && <div className="alert alert-danger" role="alert">
      {errorText}
    </div>}
      {error && retry && <div className="alert alert-info" role="alert">
      Retrying...!
    </div>}
    </div>
  );
}

export default App;