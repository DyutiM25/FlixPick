import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

//movies.map() => dynamically renders an array of values
//inside the map function => movie = the parameter we are accepting and after the arrow function comes
//                        => component we want to return for every single instance of that movie
// .key prop to the component we are returning => so that react can know which component to update based on the interactions hapenning with the web page.

//State is something where once it's updated, the component will change and re-render itself to show the new state.
//anytime we update the state the component we are returning will re-render itself and update based on the state change.
//When a state change occurs, the entire component is re-ran or re-rendered
//movie search => movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />

//useEffect => allows us to use the function we have written down in api.js
//useEffect allows you to add side effects to your functions or to your components and define when the should run
//useEffect calls a function when the value of the dependency array changes.
//whatever we put inside the dependency array we are gonna check it after every single re-render
//if the dependency array has changed since the last time we rendered, we will run this useEffect
//if the dependency array id empty [], then it will just run one time right when this component is rendered on screen
//you usually leave the array empty when you are calling the api

//it is a common practice to store two variables (or states) whenever we are fetching data from API
//        => one to store the loading state
//        => one to store any potential error when calling the api

//local storage concept for storing the favourites movie permanently
//react contexts concept - a context will allow state to be globally available to anything thats within the provided context
//by using contexts we can pass data throguh various components of a component tree. 
// alternate method to contexts is - prop drilling - but not recommended

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return // wont allow the user to search for a bunch of spaces (empty strings)
    if(loading) return // wont allow us to search while we are already searching for something else
   
    setLoading(true)
    try{
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    }catch(err){
        console.log(err)
        setError("Failed to search movies...")
    }finally{
        setLoading(false)
    }


    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
