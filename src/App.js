import { useEffect, useState } from 'react';
import './App.css'
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'


const API_URL = "http://omdbapi.com?apikey=8d6ecc67";

const App = () => {

    const [movies, setMovies] = useState([])
    const[searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();

            setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="App">
            <h1>  MovieLand</h1>
            <div className='search'>
                <input placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search Icon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies.length > 0 ?
                (
                    <div className="container">
                        {movies.map((m) => (
                            <MovieCard movie={m} />
                        )
                        )}
                    </div>
                ) :
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App;