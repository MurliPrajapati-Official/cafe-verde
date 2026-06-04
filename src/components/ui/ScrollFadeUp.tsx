import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export function ScrollFadeUp({
  children,
  delay = 0,
  className = "",
  as: Component = "div"
}: ScrollFadeUpProps) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    gsap.fromTo(el.current,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el.current,
          start: "top bottom-=10%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [delay]);

  return (
    <Component ref={el} className={className}>
      {children}
    </Component>
  );
}
