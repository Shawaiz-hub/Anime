import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Button } from "../components/ui/button";
import { Star, Clock, Play, Plus, Film, Heart, Share, Calendar, MessageSquare } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for development
  const movie = {
    id: "1",
    title: "Demon Slayer: Mugen Train",
    poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80",
    description: "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers.",
    rating: 8.5,
    releaseDate: "2020",
    duration: "117 min",
    director: "Haruo Sotozaki",
    cast: ["Natsuki Hanae", "Akari Kitō", "Yoshitsugu Matsuoka", "Hiro Shimono"],
    genres: ["Animation", "Action", "Adventure", "Fantasy"],
    trailerUrl: "https://www.youtube.com/watch?v=XrAQfkLhfTI",
    status: "regular",
  };

  // Similar movies (mock data)
  const similarMovies = [
    {
      id: "2",
      title: "My Hero Academia: Heroes Rising",
      poster: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
      rating: 7.9,
    },
    {
      id: "3",
      title: "Weathering With You",
      poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
      rating: 8.1,
    },
    {
      id: "4",
      title: "A Silent Voice",
      poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
      rating: 8.2,
    },
  ];

  // User reviews (mock data)
  const reviews = [
    {
      id: "r1",
      user: {
        name: "AnimeExpert101",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80",
      },
      rating: 9.0,
      date: "2021-05-15",
      content: "One of the best anime movies I've seen. The animation is stunning and the story is emotionally impactful.",
    },
    {
      id: "r2",
      user: {
        name: "SakuraChan",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80",
      },
      rating: 8.5,
      date: "2021-06-20",
      content: "Great continuation of the series. The action sequences were incredible, and Rengoku is such a compelling character!",
    },
  ];

  return (
    <MainLayout>
      <div className="pt-16 md:pt-20">
        {/* Hero Section with Backdrop */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30 z-10"></div>
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-20 -mt-32 md:-mt-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Poster and Actions (Left Side) */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-2xl mb-6 aspect-[2/3] bg-secondary">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4" /> Watch Now
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="h-4 w-4" /> Add to Watchlist
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" size="sm" className="w-full gap-2">
                    <Heart className="h-4 w-4" /> Like
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full gap-2">
                    <Share className="h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Movie Details (Right Side) */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <div className="flex items-center bg-primary/20 rounded-full px-3 py-1">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{movie.rating}</span>
                </div>
                
                <div className="flex items-center bg-secondary/80 rounded-full px-3 py-1">
                  <Clock className="h-4 w-4 mr-1 opacity-70" />
                  <span className="text-sm">{movie.duration}</span>
                </div>
                
                <div className="flex items-center bg-secondary/80 rounded-full px-3 py-1">
                  <Calendar className="h-4 w-4 mr-1 opacity-70" />
                  <span className="text-sm">{movie.releaseDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <Link 
                    key={genre} 
                    to={`/categories/${genre.toLowerCase()}`}
                    className="bg-secondary hover:bg-secondary/80 transition-colors text-foreground text-xs px-3 py-1 rounded-full"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Synopsis</h3>
                <p className="text-muted-foreground">{movie.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Director</h3>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Cast</h3>
                  <div className="text-muted-foreground">
                    {movie.cast.map((actor, index) => (
                      <span key={actor}>
                        {actor}
                        {index < movie.cast.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trailer Section */}
              <div className="mb-12">
                <h3 className="text-lg font-medium mb-4">Trailer</h3>
                <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Film className="h-12 w-12 text-white/50" />
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Reviews</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" /> Write a Review
                  </Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium">{review.user.name}</h4>
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                              <span className="text-xs text-muted-foreground">
                                {review.rating.toFixed(1)} • {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Movies Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/movie/${movie.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium text-sm truncate">{movie.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-muted-foreground">{movie.rating.toFixed(1)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MovieDetails;
