import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie})
{
    // Pull only the helpers this component needs from the shared context
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();

    // Re-checked on every render, so the heart stays in sync if favorites change elsewhere
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e)
    {
        // Stop the click from bubbling up and triggering parent link navigation
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    {/* "active" class is toggled so CSS can show a filled vs. empty heart */}
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ❤︎⁠
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    );
}

export default MovieCard;