import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { cn } from "../lib/utils";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  releaseDate: string;
  status?: "regular" | "upcoming";
  variant?: "default" | "compact";
  releaseCountdown?: string;
}

type CardVariants = "default" | "compact";

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  rating,
  releaseDate,
  status = "regular",
  variant = "default",
  releaseCountdown,
}) => {
  return (
    <Link to={`/movie/${id}`} className="group relative block">
      <div
        className={cn(
          "relative rounded-md overflow-hidden transition-shadow hover:shadow-lg",
          variant === "compact" ? "aspect-[9/16]" : "aspect-video"
        )}
      >
        <img
          src={poster}
          alt={title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        {status === "upcoming" && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-secondary rounded-md text-xs font-medium">
            {releaseCountdown ? `Releasing in ${releaseCountdown}` : "Upcoming"}
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-semibold line-clamp-1">{title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Star className="h-4 w-4 mr-1" />
          <span>{rating}</span>
          <span className="mx-2">•</span>
          <span>{releaseDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
