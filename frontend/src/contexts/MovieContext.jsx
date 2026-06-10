import { createContext, useState, useContext, useEffect } from "react";

// The shared "channel" all consumers and the provider connect through
const MovieContext = createContext();

// Shortcut hook so consumers don't have to import MovieContext + call useContext themselves
export const useMovieContext = () => useContext(MovieContext);

// Wraps the app and holds the favorites state in one place so any descendant can read/update it
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    // Runs once on mount (empty deps) to restore favorites saved from a previous session
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");

        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

    // Runs whenever favorites changes, persisting the latest list to localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites]);


    // Append the movie to a new array; spreading prev (not mutating it) lets React detect the change
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    // Build a new array containing every favorite except the one whose id matches movieId
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    // Returns true as soon as any favorite's id matches movieId; false if none do
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    }

    // Bundle state + helpers into one object so consumers can destructure what they need
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    // Anything rendered inside {children} can call useMovieContext() to read `value`
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}