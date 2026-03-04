import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpinWheel from './components/SpinWheel';

function App() {
  useEffect(() => {
    // Prevent back navigation
    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, null, window.location.href);
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <SpinWheel />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;