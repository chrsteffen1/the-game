import React from 'react';
import './Card.css';

const Card = ({ value, onClick, isSelected }) => {
  return (
    <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}> 
      {value}
    </div>
  );
};

export default Card;
