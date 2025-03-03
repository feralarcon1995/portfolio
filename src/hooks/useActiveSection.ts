import { useState, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: 'hero', title: 'Fernando Alarcon | Portfolio' },
  { id: 'about', title: 'About me | Fernando Alarcon' },
  { id: 'experiencie', title: 'My experience | Fernando Alarcon' },
  { id: 'projects', title: 'Some Projects | Fernando Alarcon' },
  { id: 'contact', title: 'Get in touch | Fernando Alarcon' }
];

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].title);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section =>
        document.getElementById(section.id)
      );

      const viewportHeight = window.innerHeight;
      let currentSection = sections[0].title;

      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;

          // Si la sección está visible en el viewport
          if (sectionTop < viewportHeight / 2 && sectionBottom > viewportHeight / 2) {
            currentSection = sections[index].title;
          }
        }
      });

      setActiveSection(currentSection);
      // Actualizar el título del documento
      document.title = currentSection;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamada inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeSection;
}; 