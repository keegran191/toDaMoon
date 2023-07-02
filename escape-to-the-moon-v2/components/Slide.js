import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide = ({ items, numToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);

  const nextSlide = () => {
    setSlideDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setTimeout(() => setSlideDirection(null), 500); // Reset slide direction after animation
  };

  const previousSlide = () => {
    setSlideDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setTimeout(() => setSlideDirection(null), 500); // Reset slide direction after animation
  };

  const getSlideIndex = (index) => {
    return (currentIndex + index + items.length) % items.length;
  };

  return (
    <div className="flex items-center justify-center select-none">
      <img src="/previous.png" className='w-3 h-5' onClick={previousSlide}></img>
      
      <div className="text-center overflow-hidden">
        <div className="flex">
          {[...Array(numToShow)].map((_, index) => {
            const itemIndex = getSlideIndex(index);
            const item = items[itemIndex];
            if (!item) return null; // Skip rendering if item is undefined

            return (
              <motion.div
                key={index}
                className={`mb-4 mx-6 ${slideDirection === 'next' ? 'slide-next' : slideDirection === 'prev' ? 'slide-prev' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={`uploads/${item.Image}`}
                  alt={item.Title}
                  className="mx-auto w-32 h-32 rounded-full"
                  initial={{ x: slideDirection === 'next' ? 100 : slideDirection === 'prev' ? -100 : 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: slideDirection === 'next' ? -100 : slideDirection === 'prev' ? 100 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                <h3 className="text-[#4B4946] font-bold mt-1">{item.Title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
      <img src="/next.png" className='w-3 h-5' onClick={nextSlide}></img>
    </div>
  );
};

export default Slide;
