import React from "react";
import MovieCard from "./MovieCard";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieListProps {
  title: string;
  movies: {
    id: string;
    title: string;
    poster: string;
    rating: number;
    releaseDate: string;
  }[];
  viewAllLink?: string;
}

const MovieList: React.FC<MovieListProps> = ({ title, movies, viewAllLink }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {viewAllLink && (
          <Button variant="link" className="text-sm">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
