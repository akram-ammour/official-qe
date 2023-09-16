import React, { useEffect } from 'react';

const useFullScreen = () => {
    const [isFullScreen, setIsFullScreen] = React.useState(false);
  
    const enterFullScreen = () => {
      try {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
        setIsFullScreen(true);
      } catch (error) {
        console.error('Failed to enter full-screen mode:', error);
      }
    };
  
    const exitFullScreen = () => {
      try {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        setIsFullScreen(false);
      } catch (error) {
        console.error('Failed to exit full-screen mode:', error);
      }
    };
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isFullScreen) {
          exitFullScreen();
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isFullScreen]);
  
    return { isFullScreen, enterFullScreen, exitFullScreen };
  };
export default useFullScreen