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
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })

      const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null
      const target = el?.closest<HTMLElement>('[data-cursor-text]')

      if (target) {
        const text = target.getAttribute('data-cursor-text')
        if (text) setCursorText(text)
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, []);

  return (
    <div
      className={`${styles.custom_cursor} ${isVisible ? 'active' : ''}`}
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