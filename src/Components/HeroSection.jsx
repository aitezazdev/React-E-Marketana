import React from 'react';
import heroImg from '/images/hero.webp';

const HeroSection = () => {
  return (
    <div className="w-full">
      <img
        className="w-full object-cover"
        src={heroImg}
        alt="hero section image"
      />
    </div>
  );
};

export default HeroSection;
