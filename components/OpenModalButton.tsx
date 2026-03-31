'use client';

import type { ReactNode } from 'react';

interface OpenModalButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function OpenModalButton({ children, className = '', variant = 'primary' }: OpenModalButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).openModal) {
      (window as any).openModal();
    }
  };

  const baseStyles = variant === 'primary'
    ? 'px-8 py-4 bg-[#0b8a7a] hover:bg-[#076d5f] text-white transition'
    : 'px-4 py-2 border-2 border-[#e0e0e0] hover:border-[#0b8a7a] text-[#555] text-sm transition';

  const bebasStyle = variant === 'primary'
    ? { fontFamily: '"Bebas Neue", sans-serif', fontSize: '20px', letterSpacing: '.08em' }
    : {};

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${className}`}
      style={bebasStyle}
    >
      {children}
    </button>
  );
}