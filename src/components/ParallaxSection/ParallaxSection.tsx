import React, { useRef } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import styles from './parallaxSection.module.scss';

const ParallaxSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { elementProgressMotion } = useLenisScroll(sectionRef);

  // Efectos parallax con diferentes velocidades
  const backgroundY = useTransform(elementProgressMotion, [0, 1], [0, -200]);
  const contentY = useTransform(elementProgressMotion, [0, 1], [100, -100]);
  const floatingElementY = useTransform(elementProgressMotion, [0, 1], [0, -300]);

  // Aplicar spring a las transformaciones para suavizarlas
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 50, damping: 15 });
  const smoothContentY = useSpring(contentY, { stiffness: 80, damping: 25 });
  const smoothFloatingElementY = useSpring(floatingElementY, { stiffness: 30, damping: 10 });

  return (
    <section ref={sectionRef} className={styles.container}>
      {/* Elemento de fondo con parallax lento */}
      <motion.div
        className={styles.backgroundElement}
        style={{ y: smoothBackgroundY }}
      >
        <div className={styles.backgroundCircle} />
      </motion.div>

      {/* Contenido principal con parallax medio */}
      <motion.div
        className={styles.content}
        style={{ y: smoothContentY }}
      >
        <h2>Efectos Parallax con Lenis</h2>
        <p>
          Este es un ejemplo de cómo crear efectos parallax fluidos usando Lenis
          y Framer Motion. Cada elemento se mueve a diferentes velocidades
          creando una sensación de profundidad.
        </p>
      </motion.div>

      {/* Elemento flotante con parallax rápido */}
      <motion.div
        className={styles.floatingElement}
        style={{ y: smoothFloatingElementY }}
      >
        <div className={styles.floatingIcon}>🚀</div>
      </motion.div>
    </section>
  );
};

export default ParallaxSection;
