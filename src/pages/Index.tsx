
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/HeroSection";
import MovieList from "../components/MovieList";
import { useMovies } from "../context/MovieContext";

// Mock data for development
const featuredMovie = {
  id: "1",
  title: "Demon Slayer: Mugen Train",
  backdrop: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80",
  description: "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers.",
  poster: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80",
  releaseDate: "2020",
  ageRating: "PG-13",
  duration: "117 min",
};

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

const Index = () => {
  const { getTrendingMovies, getLatestMovies, getComingSoonMovies } = useMovies();
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trendingMovies = getTrendingMovies();
  const latestMovies = getLatestMovies();
  const comingSoonMovies = getComingSoonMovies();

  return (
    <MainLayout>
      <div className="pt-16 md:pt-20">
        {/* Hero Section */}
        <HeroSection movie={featuredMovie} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Top Categories */}
          <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant="outline"
                  className="bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
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

          {/* Trending Now */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <MovieList title="Trending Now" movies={trendingMovies} viewAllLink="/trending" />
          </div>

          {/* Latest Releases */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <MovieList title="Latest Releases" movies={latestMovies} viewAllLink="/latest" />
          </div>

          {/* Coming Soon */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <MovieList title="Coming Soon" movies={comingSoonMovies} viewAllLink="/coming-soon" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
