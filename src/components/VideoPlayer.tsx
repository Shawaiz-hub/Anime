
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setVideoData = () => {
      setDuration(video.duration);
    };

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnd = () => {
      setIsPlaying(false);
    };

    // Wait for video to be loaded
    if (video.readyState >= 2) {
      setVideoData();
    } else {
      video.addEventListener("loadeddata", setVideoData);
    }

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("ended", handleEnd);

    return () => {
      video.removeEventListener("loadeddata", setVideoData);
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("ended", handleEnd);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // Auto-hide controls after inactivity
    const handleMouseMove = () => {
      setIsControlsVisible(true);
      
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      controlsTimeout.current = setTimeout(() => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      }, 3000);
    };
    
    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener("mousemove", handleMouseMove);
      return () => {
        playerElement.removeEventListener("mousemove", handleMouseMove);
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
      };
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    video.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;

    if (!document.fullscreenElement) {
      player.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={playerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
      ></video>
      
      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Button
            variant="ghost"
            size="lg"
            className="h-16 w-16 rounded-full bg-primary/80 hover:bg-primary text-white"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8" />
          </Button>
          <div className="absolute bottom-4 left-4 text-white font-medium text-lg">
            {title}
          </div>
        </div>
      )}
      
      {/* Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          isControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-2">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="h-1"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white" onClick={() => skip(-10)}>
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white" onClick={() => skip(10)}>
              <SkipForward className="h-4 w-4" />
            </Button>
            
            <div className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div 
              className="relative" 
              onMouseEnter={() => setIsVolumeControlVisible(true)}
              onMouseLeave={() => setIsVolumeControlVisible(false)}
            >
              <Button variant="ghost" size="sm" className="text-white" onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              {isVolumeControlVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/80 rounded-lg w-24">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="h-1"
                  />
                </div>
              )}
            </div>
            
            <Button variant="ghost" size="sm" className="text-white">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
