import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StarRating = ({ rating, onRatingChange, disabled = false, size = 'lg' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (starIndex) => {
    if (!disabled) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const handleClick = (starIndex) => {
    if (!disabled && onRatingChange) {
      onRatingChange(starIndex);
    }
  };

  const getStarSize = () => {
    switch (size) {
      case 'sm': return 'text-lg';
      case 'md': return 'text-2xl';
      case 'lg': return 'text-3xl';
      case 'xl': return 'text-4xl';
      default: return 'text-3xl';
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = disabled ? rating >= starIndex : (hoverRating >= starIndex || rating >= starIndex);
        
        return (
          <motion.button
            key={starIndex}
            type="button"
            className={`${getStarSize()} transition-colors duration-200 ${
              disabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            <i className={`bi bi-star${isFilled ? '-fill' : ''} ${
              isFilled ? 'text-warning' : 'text-muted'
            }`}></i>
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating; 