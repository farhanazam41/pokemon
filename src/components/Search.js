const Search = (props) => {
   
    return (
      <div className="col-md-4 form-inline"> 
          <label>Pokemon Search</label>
          <input placeholder='Search for Pokemon' type="text" onChange={props.onChange} name="" className="form-control" />
     </div>
   );
  };
  
  export default Search;