
import React, { createContext, useContext, useState, useEffect } from "react";

// Define movie types
export type MovieStatus = "regular" | "latest" | "coming-soon";

export interface Movie {
  id: string;
  title: string;
  description?: string;
  poster: string;
  backdrop?: string;
  rating: number;
  releaseDate: string;
  duration?: string;
  ageRating?: string;
  status: MovieStatus;
  genres?: string[];
  releaseCountdown?: string;
  categories?: string[];
}

interface MovieContextType {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  updateMovie: (movie: Movie) => void;
  deleteMovie: (id: string) => void;
  getMoviesByCategory: (category: string | null) => Movie[];
  getTrendingMovies: () => Movie[];
  getLatestMovies: () => Movie[];
  getComingSoonMovies: () => Movie[];
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Initial movie data
const initialMoviesData: Movie[] = [
  {
    id: "1",
    title: "Demon Slayer: Mugen Train",
    poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    rating: 8.5,
    releaseDate: "2020",
    status: "regular",
    categories: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: "2",
    title: "My Hero Academia: Heroes Rising",
    poster: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
    rating: 7.9,
    releaseDate: "2019",
    status: "regular",
    categories: ["Action", "Adventure"],
  },
  {
    id: "3",
    title: "Weathering With You",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    rating: 8.1,
    releaseDate: "2019",
    status: "regular",
    categories: ["Drama", "Fantasy", "Romance"],
  },
  {
    id: "4",
    title: "A Silent Voice",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
    rating: 8.2,
    releaseDate: "2016",
    status: "regular",
    categories: ["Drama", "Romance"],
  },
  {
    id: "5",
    title: "Your Name",
    poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    rating: 8.4,
    releaseDate: "2016",
    status: "regular",
    categories: ["Drama", "Fantasy", "Romance"],
  },
  {
    id: "6",
    title: "Spirited Away",
    poster: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
    rating: 8.6,
    releaseDate: "2001",
    status: "regular",
    categories: ["Adventure", "Fantasy"],
  },
  {
    id: "7",
    title: "Jujutsu Kaisen 0",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
    rating: 7.8,
    releaseDate: "2021",
    status: "latest",
    categories: ["Action", "Fantasy", "Supernatural"],
  },
  {
    id: "8",
    title: "Belle",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    rating: 7.5,
    releaseDate: "2021",
    status: "latest",
    categories: ["Adventure", "Sci-Fi"],
  },
  {
    id: "9",
    title: "The Deer King",
    poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    rating: 7.0,
    releaseDate: "2022",
    status: "latest",
    categories: ["Fantasy", "Adventure"],
  },
  {
    id: "10",
    title: "Bubble",
    poster: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
    rating: 6.8,
    releaseDate: "2022",
    status: "latest",
    categories: ["Sci-Fi", "Romance"],
  },
  {
    id: "11",
    title: "Pompo: The Cinéphile",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    rating: 7.3,
    releaseDate: "2021",
    status: "latest",
    categories: ["Comedy", "Drama"],
  },
  {
    id: "12",
    title: "Suzume",
    poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    rating: 0,
    releaseDate: "2023",
    status: "coming-soon",
    releaseCountdown: "7 days",
    categories: ["Adventure", "Fantasy"],
  },
  {
    id: "13",
    title: "Chainsaw Man",
    poster: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
    rating: 0,
    releaseDate: "2023",
    status: "coming-soon",
    releaseCountdown: "14 days",
    categories: ["Action", "Horror", "Supernatural"],
  },
  {
    id: "14",
    title: "One Piece: Red",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
    rating: 0,
    releaseDate: "2023",
    status: "coming-soon",
    releaseCountdown: "30 days",
    categories: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: "15",
    title: "Dragon Ball Super: Super Hero",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    rating: 0,
    releaseDate: "2023",
    status: "coming-soon",
    releaseCountdown: "45 days",
    categories: ["Action", "Adventure", "Sci-Fi"],
  },
];

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with saved data from localStorage or default data
  const [movies, setMovies] = useState<Movie[]>(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : initialMoviesData;
  });

  // Update localStorage whenever movies state changes
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie: Movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  };

  const updateMovie = (updatedMovie: Movie) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  const deleteMovie = (id: string) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  };

  const getMoviesByCategory = (category: string | null) => {
    if (!category) return movies;
    return movies.filter(movie => 
      movie.categories?.includes(category)
    );
  };

  const getTrendingMovies = () => {
    return movies.filter(movie => movie.status === "regular").slice(0, 6);
  };

  const getLatestMovies = () => {
    return movies.filter(movie => movie.status === "latest").slice(0, 5);
  };

  const getComingSoonMovies = () => {
    return movies.filter(movie => movie.status === "coming-soon").slice(0, 4);
  };

  return (
    <MovieContext.Provider value={{
      movies,
      addMovie,
      updateMovie,
      deleteMovie,
      getMoviesByCategory,
      getTrendingMovies,
      getLatestMovies,
      getComingSoonMovies
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
