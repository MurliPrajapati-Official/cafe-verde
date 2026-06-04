import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RotatingTextProps {
  texts: string[];
  transition?: any;
  className?: string;
}

export function RotatingText({
  texts,
  transition = { type: 'spring', damping: 25, stiffness: 300 },
  className = ""
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={transition}
          style={{ display: 'inline-block' }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
