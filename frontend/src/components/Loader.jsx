import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg'; // Make sure you have your logo in assets

const Loader = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;
    
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 3));
    }, 20);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-50 h-50">
        {/* Circular progress */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#3B82F6" // Using primary color
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.83}, 283`} // Approximate circumference
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Logo in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-50 h-50 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Loader;