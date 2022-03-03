const PokemonList = ({ pokemon }) => {

    const baseUrl = `https://hungry-woolly-leech.glitch.me/api/pokemon/`;

    const listAttributes = (id) => {
        window.location.href= `${baseUrl}${id}`;
    }
    return (
        <div>
        {pokemon.map(pokemon => {
        return(
            <ul className="list-group" key={pokemon.id}>
                <li className="list-group-item"> id: {pokemon.id} - Name: {pokemon.name}
                    <button className="btn btn-primary" style={{margin: "0 0 0 15px"}} onClick={() => listAttributes(pokemon.id)}>Stats</button>
                </li>
            </ul>)
        }
        )   
    }
        </div>
    )
}

export default PokemonList;
