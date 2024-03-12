// VideoPlayer.js
import React, { useState } from 'react';
import './VideoPlayer.css'; // Import the CSS file


const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const videoSrc = 'https://www.youtube.com/watch?v=49XMTZUCDYk&t=13s'; // Replace with your actual video URL

  return (
    <div className={`video-player ${isPlaying ? 'playing' : ''}`}>
      <video
        controls
        width="100%"
        height="auto"
        onPlay={handlePlayPause}
        onPause={handlePlayPause}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;


