import { useEffect, useRef, useState } from 'react';

interface ViewportLazyProps {
  children: React.ReactNode;
  className?: string;
}

export function ViewportLazy({ children, className = "" }: ViewportLazyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={className}>
      {isVisible ? children : <div style={{ height: '50vh' }} />}
    </section>
  );
}
