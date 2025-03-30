import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './about.module.scss';

const About = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Configuración de scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef, // Basado en toda la sección
    offset: ["start end", "end start"], // Ajustado para un rango completo
  });

  // Animaciones basadas en el progreso del scroll
  const h2Y = useTransform(scrollYProgress, [0, 0.5], [-100, 0]); // Movimiento vertical
  const h3X = useTransform(scrollYProgress, [0, 0.5], [-300, 0]); // Movimiento horizontal más prominente

  return (
    <section ref={sectionRef} className={styles.container} id="about">
      <motion.article className={styles.title}>
        <motion.h2
          style={{
            y: h2Y, // Movimiento vertical con scroll
          }}
        >
          a little bit of me
        </motion.h2>
        <motion.h3
          style={{
            x: h3X, // Movimiento horizontal con scroll
          }}
        >
          a little bit of me
        </motion.h3>
      </motion.article>

      <motion.article
        className={styles.about_info}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="/images/me.jpg"
          alt="foto mia cruzado de brazos, con una remera negra, sonriendo."
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.8 }}
          loading="lazy"
        />
        <motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let me tell you a bit about myself so you can get to know me better. I was born in Buenos Aires, Argentina, where I still live today, back in 1995.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            My name&apos;s Fernando Alarcón, and I&apos;m all about giving my best in everything I do. I believe that in today&apos;s digital world, there&apos;s always a need for more solutions to make the customer experience even better.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            That&apos;s where I come in. I&apos;m passionate about contributing everything I know in my field to meet those demands and help push things forward.
          </motion.p>
        </motion.div>
      </motion.article>
    </section>
  );
});

About.displayName = 'About';

export default About;
