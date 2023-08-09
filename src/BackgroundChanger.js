import React, { useState, useEffect } from 'react';
import './BackgroundChanger.css';

const BackgroundChanger = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Change the background image after 5 seconds
    const timer = setInterval(() => {
      setFadeOut(true); // Start fading out
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage === 1 ? 2 : 1));
        setFadeOut(false); // Reset fade out
      }, 1000); // Wait for 1 second before updating currentImage
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className={`background-container ${fadeOut ? 'background-fade-out' : ''}`}
      style={{ backgroundImage: `url(/background${currentImage}.jpg)` }}
    ></div>
  );
};

export default BackgroundChanger;
