import React, { useState, useEffect } from 'react';
import './BackgroundChanger.css';


const BackgroundChanger = () => {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    // Change the background image after 3 seconds
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === 1 ? 2 : 1));
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="background-container"
      style={{ backgroundImage: `url(/background${currentImage}.jpg)` }}
    ></div>
  );
};

export default BackgroundChanger;
