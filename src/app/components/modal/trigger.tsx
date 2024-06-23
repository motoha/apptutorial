'use client'

import React from 'react';

interface OpenModalButtonProps {
    onClick: (productId: number) => void;
  productId: number;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onClick, productId  }) => {
  return (
    <button onClick={() => onClick(productId)}>
      Open Modal
    </button>
  );
};

export default OpenModalButton;