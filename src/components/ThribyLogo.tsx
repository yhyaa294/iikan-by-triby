import React from 'react';

interface ThribyLogoProps {
  className?: string;
  width?: number;
}

const ThribyLogo: React.FC<ThribyLogoProps> = ({ className = '', width = 200 }) => {
  // Skala relatif berdasarkan lebar yang diminta
  const height = width * 0.4; // Rasio aspek

  return (
    <div 
      className={`flex items-center justify-center rounded-2xl ${className}`}
      style={{ 
        backgroundColor: '#FFD600', // Vibrant Yellow
        width: `${width}px`,
        height: `${height}px`,
        padding: `${width * 0.1}px`,
        fontFamily: '"Fredoka", "Nunito", sans-serif' // Fallback ke rounded fonts
      }}
    >
      {/* Load font khusus untuk tampilan rounded yang mirip */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap');
        `}
      </style>

      <div style={{ 
        color: '#3E2723', // Dark Brown
        fontSize: `${width * 0.25}px`,
        fontWeight: 800,
        display: 'flex',
        alignItems: 'baseline',
        lineHeight: 1,
        letterSpacing: '-0.02em'
      }}>
        <span>thrib</span>
        
        {/* Custom Letter Y with Face */}
        <div style={{ position: 'relative', marginLeft: '-0.01em' }}>
          <span>y</span>
          
          {/* Mata Kiri */}
          <div style={{
            position: 'absolute',
            top: '28%',
            left: '20%',
            width: '12%',
            height: '12%',
            backgroundColor: '#3E2723', // Warna sama dengan teks
            borderRadius: '50%'
          }}></div>

          {/* Mata Kanan */}
          <div style={{
            position: 'absolute',
            top: '28%',
            right: '20%',
            width: '12%',
            height: '12%',
            backgroundColor: '#3E2723', 
            borderRadius: '50%'
          }}></div>

          {/* Senyum */}
          <div style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            height: '15%',
            borderBottom: `${width * 0.015}px solid #3E2723`, // Ketebalan senyum proporsional
            borderRadius: '50%'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default ThribyLogo;
