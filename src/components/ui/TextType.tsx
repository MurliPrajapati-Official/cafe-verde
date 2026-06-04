import { useState, useEffect } from 'react';

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
}

export function TextType({
  text,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 3000,
  showCursor = true,
  cursorCharacter = "|",
  className = ""
}: TextTypeProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    const handleType = () => {
      const currentString = text[currentIndex];
      
      if (isDeleting) {
        setDisplayText(prev => prev.substring(0, prev.length - 1));
        timer = setTimeout(handleType, deletingSpeed);
      } else {
        setDisplayText(prev => currentString.substring(0, prev.length + 1));
        timer = setTimeout(handleType, typingSpeed);
      }

      if (!isDeleting && displayText === currentString) {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % text.length);
      }
    };

    timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">{cursorCharacter}</span>}
    </span>
  );
}
