import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

    return (
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-24 right-16 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors"
        style={{ zIndex: 1000 }}
      >
        ↑
      </button>
    );
};

export default ScrollToTop;
