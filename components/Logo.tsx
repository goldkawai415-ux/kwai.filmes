
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-10' }) => {
  return (
    <div className={`flex items-center font-black text-2xl ${className}`}>
      <span className="text-white">Kwai</span>
      <span className="text-accent">.</span>
      <span className="text-secondary-accent">filmes</span>
    </div>
  );
};

export default Logo;
