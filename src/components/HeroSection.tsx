import React from "react";
import { Button } from "../components/ui/button";
import { Play, Clock } from "lucide-react";

interface HeroSectionProps {
  movie: {
    title: string;
    description: string;
    poster: string;
    releaseDate: string;
    ageRating: string;
    duration: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
  return (
    <div
      className="relative h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${movie.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      <div className="container relative z-10 text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-6">{movie.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg">
              <Play className="mr-2 h-4 w-4" />
              Watch Now
            </Button>
            <Button variant="outline" size="lg">
              <Clock className="mr-2 h-4 w-4" />
              {movie.duration}
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-300 flex items-center justify-center md:justify-start gap-2">
            <span>{movie.releaseDate}</span>
            <span>•</span>
            <span>{movie.ageRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
