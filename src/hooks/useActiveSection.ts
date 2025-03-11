import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const isProjectPage = window.location.pathname.startsWith('/projects/');

      if (scrollPosition < windowHeight * 0.5 && !isProjectPage) {
        setActiveSection('Home');
        history.replaceState(null, '', '/');
        return;
      }

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.clientHeight;
        const sectionId = sectionElement.getAttribute('id') || '';

        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100 && !isProjectPage) {
          setActiveSection(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
          history.replaceState(null, '', `#${sectionId}`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeSection;
};