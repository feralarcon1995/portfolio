import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './about.module.scss';

const About = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Configuración de scroll con spring para suavizar
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animaciones mejoradas con rangos más suaves
  const h2Y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, 100]);
  const h3X = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [-300, 0, 0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  return (
    <section ref={sectionRef} className={styles.container} id="about">
      <motion.article
        className={styles.title}
        style={{
          opacity,
          scale
        }}
      >
        <motion.h2
          style={{
            y: h2Y,
          }}
        >
          a little bit of me
        </motion.h2>
        <motion.h3
          style={{
            x: h3X,
          }}
        >
          a little bit of me
        </motion.h3>
      </motion.article>

      <motion.article
        className={styles.about_info}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={{
            overflow: 'hidden',
            width: '40%',
            height: '1300px'
          }}
        >
          <motion.img
            src="/images/me.jpg"
            alt="foto mia cruzado de brazos, con una remera negra, sonriendo."
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            loading="lazy"
          />
        </motion.div>
        <motion.div>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Let me tell you a bit about myself so you can get to know me better. I was born in Buenos Aires, Argentina, where I still live today, back in 1995.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            My name&apos;s Fernando Alarcón, and I&apos;m all about giving my best in everything I do. I believe that in today&apos;s digital world, there&apos;s always a need for more solutions to make the customer experience even better.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
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
