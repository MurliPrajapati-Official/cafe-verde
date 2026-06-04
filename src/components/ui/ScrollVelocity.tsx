import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';

interface ScrollVelocityProps {
  children: string;
  velocity?: number;
  numCopies?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ScrollVelocity({ children, velocity = 50, numCopies = 4, className = "" }: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 1000);
    
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden m-0 whitespace-nowrap flex flex-nowrap ${className}`} style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x, display: 'flex', whiteSpace: 'nowrap' }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span key={i} style={{ display: 'block', marginRight: '30px' }}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
