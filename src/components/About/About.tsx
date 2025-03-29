import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './about.module.scss';
import useLenis from '@/hooks/useLenis'; 

const About = React.memo(() => {
  const titleControls = useAnimation();
  const subTitleControls = useAnimation();
  const imgControls = useAnimation();
  const aboutControls = useAnimation();
  const paragraphControls = useAnimation();
  const lenis = useLenis(); 

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          titleControls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 0.8 }
          });

          subTitleControls.start({
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, delay: 0.2 }
          });

          imgControls.start({
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: { duration: 0.8, delay: 0.3 }
          });

          aboutControls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, delay: 0.4 }
          });

          paragraphControls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, delay: 0.5 }
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [aboutControls, imgControls, isVisible, paragraphControls, subTitleControls, titleControls]);

  useEffect(() => {
    if (!lenis || !sectionRef.current) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.min(1, Math.max(0, 1 - top / window.innerHeight));

      if (scrollProgress > 0.1 && isVisible) {
        titleControls.set({
          y: -scrollProgress * 30
        });

        subTitleControls.set({
          x: scrollProgress * 50
        });
      }
    };

    lenis.on('scroll', handleScroll);
    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis, isVisible, titleControls, subTitleControls]);

  return (
    <section ref={sectionRef} className={styles.container} id="about">
      <motion.article
        className={styles.title}
        initial={{ y: 70, opacity: 0 }}
        animate={titleControls}
      >
        <motion.h2>a little bit of me</motion.h2>
        <motion.h3
          initial={{ x: -50, opacity: 0 }}
          animate={subTitleControls}
        >
          a little bit of me
        </motion.h3>
      </motion.article>

      <motion.article
        className={styles.about_info}
        initial={{ y: 100, opacity: 0 }}
        animate={aboutControls}
      >
        <motion.img
          src="/images/me.jpg"
          alt="foto mia cruzado de brazos, con una remera negra, sonriendo."
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} 
          animate={imgControls}
          loading="lazy"
        />
        <motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={paragraphControls}
          >
            Let me tell you a bit about myself so you can get to know me better. I was born in Buenos Aires, Argentina, where I still live today, back in 1995.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={paragraphControls}
            transition={{ delay: 0.1 }}
          >
            My name&apos;s Fernando Alarcón, and I&apos;m all about giving my best in everything I do. I believe that in today&apos;s digital world, there&apos;s always a need for more solutions to make the customer experience even better.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={paragraphControls}
            transition={{ delay: 0.2 }}
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
