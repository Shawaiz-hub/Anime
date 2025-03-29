
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ThumbsUp, MessageSquare, Share, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { useToast } from "@/hooks/use-toast";

// Mock data for the movie to watch
const getMovieData = (id: string) => {
  // This would typically be an API call
  return {
    id,
    title: "Demon Slayer: Mugen Train",
    description: "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers.",
    poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    videoSrc: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video
    releaseDate: "2020",
    duration: "117 min",
    ageRating: "PG-13",
    genres: ["Animation", "Action", "Adventure", "Fantasy"],
    rating: 8.5,
    // Recommended movies
    recommended: [
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
    ]
  };
};

const WatchMovie = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setMovie(getMovieData(id));
      setIsLoading(false);
    }, 1000);
  }, [id, navigate]);

  const handleLike = () => {
    toast({
      title: "Liked!",
      description: `You've added "${movie.title}" to your favorites.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 mb-4"></div>
          <div className="text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-muted-foreground mb-6">The movie you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center text-muted-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        {/* Video Player */}
        <VideoPlayer 
          src={movie.videoSrc} 
          poster={movie.poster}
          title={movie.title}
        />

        {/* Movie Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-2">
              <div className="text-sm px-2 py-1 bg-secondary/50 rounded-md">{movie.releaseDate}</div>
              <div className="text-sm px-2 py-1 bg-secondary/50 rounded-md">{movie.duration}</div>
              <div className="text-sm px-2 py-1 bg-secondary/50 rounded-md">{movie.ageRating}</div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre: string) => (
                <Link 
                  key={genre} 
                  to={`/categories/${genre.toLowerCase()}`}
                  className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>
            
            <p className="text-muted-foreground">{movie.description}</p>
            
            <div className="flex space-x-3 pt-2">
              <Button variant="outline" size="sm" onClick={handleLike}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate(`/movie/${id}`)}>
                <Info className="h-4 w-4 mr-2" />
                Details
              </Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Recommended</h2>
            <div className="space-y-4">
              {movie.recommended.map((rec: any) => (
                <Link key={rec.id} to={`/watch/${rec.id}`} className="flex gap-3 group">
                  <div className="w-20 aspect-[2/3] bg-secondary rounded-md overflow-hidden">
                    <img 
                      src={rec.poster} 
                      alt={rec.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{rec.title}</h3>
                    <div className="flex items-center mt-1">
                      <div className="text-xs bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded">
                        {rec.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
