import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useAnimation } from 'framer-motion';
import expImage from '/public/images/exp.png';
import Image from 'next/image';
import styles from './style.module.scss';
import { ArrowUp } from '@/icons/ArrowUp';
export default function Experiencie() {
  const experiences = [
    {
      title: "Fullstack Developer",
      company: "Banco Comafi",
      link_company: 'https://www.comafi.com.ar/',
      date: "June 2024 - Currently",
      description: "In my role on the team, I contribute to the creation of frontend components with Next.js and TypeScript, as well as backend development using AWS Serverless. My work includes designing and implementing user interfaces and managing cloud services to ensure seamless platform functionality.",
      thumbnail: '/images/company_logo/comafi.png',
      stack: [
        { id: 'nextjs', name: 'NEXTJS' },
        { id: 'typescript', name: 'TYPESCRIPT' },
        { id: 'aws', name: 'AWS' },
        { id: 'nodejs', name: 'NODEJS' },
        { id: 'materialui', name: 'MATERIAL UI' }
      ]
    },
    {
      title: "Web Development Teacher",
      company: "Coderhouse",
      link_company: 'https://www.coderhouse.com/',
      date: "October 2022 - Currently",
      description: "As a professor, I design lesson plans and guide both students and the tutoring team. I teach core web development technologies such as HTML, CSS, SASS, Bootstrap, JavaScript, and Git.",
      thumbnail: '/images/company_logo/coder.jpg',
      stack: [
        { id: 'html', name: 'HTML' },
        { id: 'css', name: 'CSS' },
        { id: 'javascript', name: 'JAVASCRIPT' },
        { id: 'bootstrap', name: 'BOOTSTRAP' },
        { id: 'git', name: 'GIT' },
        { id: 'scss', name: 'SCSS' },
        { id: 'python', name: 'PYTHON' },
        { id: 'django', name: 'DJANGO' }
      ]
    },
    {
      title: "Frontend Developer",
      company: "Proactive Talent Hub",
      date: "May 2023 - March 2024",
      link_company: 'https://www.linkedin.com/company/proactivetalenthub',
      description: "In my role as a frontend developer, I create and implement web platforms using ReactJS, focusing on delivering seamless layouts and user experiences.",
      thumbnail: '/images/company_logo/path.jpg',
      stack: [
        { id: 'reactjs', name: 'REACTJS' },
        { id: 'javascript', name: 'JAVASCRIPT' },
        { id: 'bootstrap', name: 'BOOTSTRAP' },
        { id: 'css', name: 'CSS' }
      ]
    }
  ];

  const stackColors: Record<string, { bgColor: string; textColor: string, hoverColor: string }> = {
    nextjs: { bgColor: 'var(--light)', textColor: 'var(--light)', hoverColor: 'var(--black)' },
    typescript: { bgColor: '#009cff', textColor: '#009cff', hoverColor: 'var(--light)' },
    aws: { bgColor: '#ff6a00', textColor: '#ff6a00', hoverColor: 'var(--light)' },
    nodejs: { bgColor: '#167614', textColor: '#167614', hoverColor: 'var(--light)' },
    materialui: { bgColor: '#0070f3', textColor: '#0070f3', hoverColor: 'var(--light)' },
    html: { bgColor: '#e34c26', textColor: '#e34c26', hoverColor: 'var(--light)' },
    css: { bgColor: '#264de4', textColor: '#264de4', hoverColor: 'var(--light)' },
    javascript: { bgColor: '#f7df1e', textColor: '#f7df1e', hoverColor: 'var(--light)' },
    bootstrap: { bgColor: '#B175FF', textColor: '#B175FF', hoverColor: 'var(--light)' },
    git: { bgColor: '#f05032', textColor: '#f05032', hoverColor: 'var(--light)' },
    scss: { bgColor: '#c6538c', textColor: '#c6538c', hoverColor: 'var(--light)' },
    python: { bgColor: '#306998', textColor: '#306998', hoverColor: 'var(--light)' },
    django: { bgColor: '#88CA5E', textColor: '#88CA5E', hoverColor: 'var(--light)' },
    reactjs: { bgColor: '#61dafb', textColor: '#61dafb', hoverColor: '#000' },
    default: { bgColor: '#ccc', textColor: '#000', hoverColor: '#000' },
  };


  const titleControls = useAnimation();
  const subTitleControls = useAnimation();
  const imgControls = useAnimation();

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        const scaleValue = Math.min(1.5, Math.max(1, 1 + sectionTop / windowHeight));
        const imageFadeOutPoint = sectionTop + windowHeight * 0.4;
        const opacityValue = scrollY > imageFadeOutPoint ? 0 : 1;

        imgControls.start({
          scale: scaleValue,
          opacity: opacityValue,
        });

        titleControls.start({
          y: sectionTop * 0.1,
          opacity: scrollY > sectionTop - windowHeight ? 1 : 0,
        });

        subTitleControls.start({
          x: sectionTop * 0.1,
          opacity: scrollX > sectionTop - windowHeight ? 1 : 0,
        });
      }
    };

    lenis.on('scroll', handleScroll);
    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
    };
  }, [titleControls, subTitleControls, imgControls]);


  return (
    <section ref={sectionRef} className={styles.experience_container} id="experiencie">
      <motion.div initial={{ scale: 0.5 }} animate={imgControls} className={styles.image_container}>
        <Image
          src={expImage}
          fill
          alt="image"
          placeholder='blur'
        />
      </motion.div>
      <article className={styles.article}>
        <motion.article className={styles.title} initial={{ y: -100, opacity: 0 }} animate={titleControls}>
          <motion.h2 animate={titleControls}>My Journey: What I&apos;ve Learned in the Way</motion.h2>
          <motion.h3 animate={subTitleControls}>My Journey: What I&apos;ve Learned in the Way</motion.h3>
        </motion.article>

        {experiences.map((exp, index) => {
          const baseDuration = 10;
          const calculatedDuration = baseDuration + exp.stack.length * 1.2;
          return (
            <article className={styles.experience_details} key={index}>
              <div className={styles.experience_header}>
                <p className={styles.experience_date}>{exp.date}</p>
                <h3>{exp.title}</h3>
                <a href={exp.link_company} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={exp.thumbnail}
                    alt={`${exp.company} logo`}
                    width={40}
                    height={40}
                    className={styles.experience_thumbnail}
                  />   {exp.company} <ArrowUp />
                </a>
              </div>
              <p className={styles.experience_description}>{exp.description}</p>
              <div className={styles.experience_stack_container}>
                <h4>Stack in which I work</h4>
                <div
                  className={styles.slider}
                  style={{
                    '--width': '270px',
                    '--quantity': `${exp.stack.length}`,
                    '--height': '50px',
                    '--duration': `${calculatedDuration}s`
                  } as React.CSSProperties}>
                  <div className={styles.slider_list}>
                    {exp.stack.map((item, index) => {
                      const { bgColor, hoverColor } = stackColors[item.id] || stackColors.default;
                      return (
                        <div key={item.id} className={styles.slider_item} style={{ '--position': `${index + 1}` } as React.CSSProperties}>
                          <span style={{
                            '--hover': `${bgColor}`,
                            '--text-hover': `${hoverColor}`
                          } as React.CSSProperties}>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={`${styles.slider} ${styles.reverse}`}
                  style={{
                    '--width': '270px',
                    '--quantity': `${exp.stack.length}`,
                    '--height': '50px',
                    '--duration': `${calculatedDuration + 5}s`
                  } as React.CSSProperties}>
                  <div className={styles.slider_list}>
                    {exp.stack.map((item, index) => {
                      const { bgColor, hoverColor } = stackColors[item.id] || stackColors.default;
                      return (
                        <div key={item.id} className={styles.slider_item} style={{ '--position': `${index + 1}` } as React.CSSProperties}>
                          <span style={{
                            '--hover': `${bgColor}`,
                            '--text-hover': `${hoverColor}`
                          } as React.CSSProperties}>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </article>
    </section>
  );
}
