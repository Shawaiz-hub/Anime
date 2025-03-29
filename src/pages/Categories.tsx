
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import MainLayout from "../layouts/MainLayout";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";

// Mock data for categories
const categories = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Supernatural",
];

const Categories = () => {
  const { getMoviesByCategory } = useMovies();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredMovies = getMoviesByCategory(selectedCategory);

  return (
    <MainLayout>
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className={`text-3xl font-bold mb-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Categories</h1>
          
          {/* Categories Filter */}
          <div className={`mb-8 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  style={{ 
                    transitionDelay: `${100 + index * 30}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease'
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Movies Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {filteredMovies.map((movie, index) => (
              <div
                key={movie.id}
                style={{ 
                  transitionDelay: `${300 + index * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease'
                }}
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster}
                  rating={movie.rating}
                  releaseDate={movie.releaseDate}
                />
              </div>
            ))}
          </div>
          
          {filteredMovies.length === 0 && (
            <div className={`text-center py-12 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-muted-foreground">No movies found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Categories;
