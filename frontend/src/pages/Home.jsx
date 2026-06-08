import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home()
{
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try
            {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch (err)
            {
                console.log(err);
                setError("Failed to load movies...");
            }
            finally
            {
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the form from resetting the input 
        alert(searchQuery);
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery} // Controlled by state - input always shows whatever searchQuery is
                    onChange={(e) => setSearchQuery(e.target.value)} // updates state on each keystroke so typing actually works
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (<div className="loading">Loading...</div>)
            : (
                <div className="movies-grid">
                    {movies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Home;