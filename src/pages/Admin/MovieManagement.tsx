import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Film,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  AlertTriangle,
  X,
  SaveIcon,
  Calendar,
  Clock,
  Star,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMovies, Movie, MovieStatus } from "@/context/MovieContext";

// Categories
const categories = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", 
  "Horror", "Romance", "Sci-Fi", "Slice of Life", "Supernatural"
];

const MovieManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { movies, addMovie, updateMovie, deleteMovie } = useMovies();
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newMovie, setNewMovie] = useState<Movie>({
    id: "",
    title: "",
    description: "",
    poster: "",
    backdrop: "",
    rating: 0,
    releaseDate: "",
    duration: "",
    ageRating: "PG-13",
    status: "regular" as MovieStatus,
    genres: [],
    categories: [],
  });

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page",
        variant: "destructive",
      });
      navigate("/login");
    } else {
      setIsAdmin(true);
    }
  }, [navigate, toast]);

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMovie = () => {
    setIsEditMode(false);
    setNewMovie({
      id: Date.now().toString(),
      title: "",
      description: "",
      poster: "",
      backdrop: "",
      rating: 0,
      releaseDate: "",
      duration: "",
      ageRating: "PG-13",
      status: "regular" as MovieStatus,
      genres: [],
      categories: [],
    });
    setIsAddMovieDialogOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setIsEditMode(true);
    setNewMovie({
      ...movie,
      description: movie.description || "",
      backdrop: movie.backdrop || "",
      duration: movie.duration || "",
      ageRating: movie.ageRating || "PG-13",
      genres: movie.genres || [],
      categories: movie.categories || [],
    });
    setIsAddMovieDialogOpen(true);
  };

  const handleDeleteMovie = (id: string) => {
    setMovieToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteMovie = () => {
    if (movieToDelete) {
      deleteMovie(movieToDelete);
      setIsDeleteDialogOpen(false);
      setMovieToDelete(null);
      
      toast({
        title: "Movie Deleted",
        description: "The movie has been successfully removed.",
      });
    }
  };

  const handleSubmitMovie = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const movieWithCategories = {
      ...newMovie,
      categories: newMovie.genres,
    };
    
    setTimeout(() => {
      if (isEditMode) {
        updateMovie(movieWithCategories);
        
        toast({
          title: "Movie Updated",
          description: `"${newMovie.title}" has been successfully updated.`,
        });
      } else {
        addMovie(movieWithCategories);
        
        toast({
          title: "Movie Added",
          description: `"${newMovie.title}" has been successfully added.`,
        });
      }
      
      setIsSubmitting(false);
      setIsAddMovieDialogOpen(false);
    }, 500);
  };

  const handleGenreChange = (genre: string) => {
    if (newMovie.genres?.includes(genre)) {
      setNewMovie({
        ...newMovie,
        genres: newMovie.genres.filter(g => g !== genre),
        categories: newMovie.categories?.filter(c => c !== genre)
      });
    } else {
      setNewMovie({
        ...newMovie,
        genres: [...(newMovie.genres || []), genre],
        categories: [...(newMovie.categories || []), genre]
      });
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Film className="mr-2 h-6 w-6" /> Movie Management
        </h1>
        <Button onClick={handleAddMovie}>
          <Plus className="mr-2 h-4 w-4" /> Add New Movie
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Movie</th>
                <th className="px-4 py-3 text-left font-medium">Release Date</th>
                <th className="px-4 py-3 text-left font-medium">Rating</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 rounded overflow-hidden bg-secondary">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{movie.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{movie.releaseDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{movie.rating || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        movie.status === "coming-soon" 
                          ? "bg-blue-500/20 text-blue-500" 
                          : movie.status === "latest" 
                          ? "bg-green-500/20 text-green-500"
                          : "bg-secondary text-foreground"
                      }`}>
                        {movie.status === "coming-soon" 
                          ? "Coming Soon" 
                          : movie.status === "latest" 
                          ? "Latest Release"
                          : "Regular"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/movie/${movie.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditMovie(movie)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteMovie(movie.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No movies found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Movie Dialog */}
      <Dialog open={isAddMovieDialogOpen} onOpenChange={setIsAddMovieDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Movie" : "Add New Movie"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the movie details below" 
                : "Fill in the details below to add a new movie"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitMovie} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="releaseDate"
                      value={newMovie.releaseDate}
                      onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="duration"
                      value={newMovie.duration}
                      onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                      className="pl-10"
                      placeholder="e.g. 120 min"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="ageRating">Age Rating</Label>
                  <Select 
                    value={newMovie.ageRating} 
                    onValueChange={(value) => setNewMovie({ ...newMovie, ageRating: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="G">G</SelectItem>
                      <SelectItem value="PG">PG</SelectItem>
                      <SelectItem value="PG-13">PG-13</SelectItem>
                      <SelectItem value="R">R</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newMovie.status} 
                    onValueChange={(value) => setNewMovie({ ...newMovie, status: value as MovieStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="latest">Latest Release</SelectItem>
                      <SelectItem value="coming-soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={newMovie.rating}
                      onChange={(e) => setNewMovie({ ...newMovie, rating: parseFloat(e.target.value) || 0 })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="poster">Poster URL</Label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="poster"
                      value={newMovie.poster}
                      onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="backdrop">Backdrop URL</Label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="backdrop"
                      value={newMovie.backdrop}
                      onChange={(e) => setNewMovie({ ...newMovie, backdrop: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    rows={5}
                  />
                </div>
                
                <div>
                  <Label>Genres</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((genre) => (
                      <Button
                        key={genre}
                        type="button"
                        variant={newMovie.genres.includes(genre) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleGenreChange(genre)}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    {isEditMode ? "Update Movie" : "Add Movie"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this movie? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDeleteMovie}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Movie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieManagement;
