import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 32,
        zIndex: 9999,
        display: visible ? 'block' : 'none',
        background: 'rgba(40,40,50,0.22)',
        color: '#e0e7ef',
        border: '1.5px solid rgba(255,255,255,0.25)',
        borderRadius: 28,
        minWidth: 120,
        height: 56,
        boxShadow: '0 4px 16px rgba(44,62,80,0.18)',
        cursor: 'pointer',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        transition: 'opacity 0.2s',
        padding: '0 24px',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
      aria-label="Scroll to top"
    >
      Goto Top
    </button>
  );
};

export default ScrollToTop; 