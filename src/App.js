import { useState, useCallback } from 'react'
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import axios from 'axios';

function App() {

  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState();
  const [error,setError] = useState(false);
  const [errorText,setErrorText] = useState('');
  const [retry,setRetry] = useState(false);

  const baseUrl = 'https://hungry-woolly-leech.glitch.me/api/pokemon/search';


  const getPokemon = (query,retries) => {
    setRetry(false)
    setError(false);  // setting error state to false at the start api call
    setLoading(true);
    axios.get(`${baseUrl}/${query}?flakiness=1`)
    .then(response => {
    console.log(response.data);
    setPokemonData(response.data.pokemon);
    setLoading(false); 
   }).catch((error) => {  
     if(error.response){
     setRetry(true)
     setError(true)
     setErrorText(error.message);
     setTimeout(() => {
       if(retries > 0){
        getPokemon(query,retries-1);
       }  // when there is an error true value in error state, then run the getPokemon function again after 3 seconds
       setRetry(false)
     },3000)      
     }
   })
  }

  const handleChange = (e) => {
    const { value } = e.target;
    getPokemon(value,2)
  }

  const debounce = (func) => {
    let timer;

    return function(...args) {
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    }
  }

  const optimizedSearch = useCallback(debounce(handleChange),[]);
   
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