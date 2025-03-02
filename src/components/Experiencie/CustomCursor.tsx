import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

interface CustomCursorProps {
  text?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ text }) => {
  const [position, setPosition] = useState({ x: 15, y: 15 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState(text || '');

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const showCursor = (e: Event) => {
      const target = e.target as HTMLElement;
      const text = target.getAttribute('data-cursor-text');
      if (text) {
        setCursorText(text);
      }
      setIsVisible(true);
    };

    const hideCursor = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', updateCursorPosition);

    const links = document.querySelectorAll(`.${styles.image_container_link}`);
    links.forEach(link => {
      link.addEventListener('mouseenter', showCursor);
      link.addEventListener('mouseleave', hideCursor);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);

      links.forEach(link => {
        link.removeEventListener('mouseenter', showCursor);
        link.removeEventListener('mouseleave', hideCursor);
      });
    };
  }, []);

  return (
    <div
      className={`${styles.custom_cursor} ${isVisible ? styles.active : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <div className={styles.marquee_wrapper}>
        <div className={styles.marquee_content}>{cursorText}</div>
        <div className={styles.marquee_content}>{cursorText}</div>
      </div>
    </div>
  );
};

export default CustomCursor;