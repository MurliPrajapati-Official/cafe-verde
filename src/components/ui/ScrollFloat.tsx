import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  className?: string;
  as?: React.ElementType;
}

export function ScrollFloat({
  children,
  animationDuration = 1,
  ease = "back.out(2)",
  scrollStart = "top bottom",
  scrollEnd = "bottom center",
  stagger = 0.03,
  className = "",
  as: Component = "h2"
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotateX: -40
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: animationDuration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollStart,
          end: scrollEnd,
          toggleActions: "play none none reverse",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  const words = children.split(' ');

  return (
    <Component ref={containerRef} className={className} style={{ perspective: "1000px" }}>
      <div ref={textRef} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
        {words.map((word, i) => (
          <span key={i} style={{ display: 'inline-flex', overflow: 'hidden' }}>
            {word.split('').map((char, j) => (
              <span key={j} className="char" style={{ display: 'inline-block', transformOrigin: 'bottom center' }}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </Component>
  );
}
