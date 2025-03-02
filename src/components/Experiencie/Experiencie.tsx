import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useAnimation, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from './style.module.scss';
import Magnet from '../Magnet/Magnet';

const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const Testimonials = dynamic(() => import('./Testimonials'), { ssr: false });
const ExperienceTimeline = dynamic(() => import('./ExperienceTimeline'), { ssr: false });

interface TechStack {
  id: string;
  name: string;
}

interface Testimonial {
  id: string;
  author: string;
  position: string;
  quote: string;
  linkedin: string;
  color: string;
}

interface Experience {
  title: string;
  company: string;
  link_company: string;
  date: string;
  description: string;
  thumbnail: string;
  image: string;
  color: string;
  stack: TechStack[];
  testimonials: Testimonial[];
}

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const ExperienceItem = ({ experience, index }: ExperienceItemProps) => {
  const expRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(expRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const stackControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setTimeout(() => {
        stackControls.start('visible');
      }, 600);
    }
  }, [isInView, controls, stackControls]);

  return (
    <motion.article
      ref={expRef}
      className={styles.experience_details}
      key={index}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div className={styles.experience_header} variants={itemVariants}>
        <div className={styles.experience_title}>
          <Magnet padding={50} disabled={false} magnetStrength={10}>
            <motion.h3 variants={itemVariants}>{experience.title}</motion.h3>
          </Magnet>
          <Magnet padding={50} disabled={false} magnetStrength={10}>
            <motion.p className={styles.experience_description} variants={itemVariants}>
              {experience.description}
            </motion.p></Magnet>
        </div>
        <motion.a
          href={experience.link_company}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.image_container_link}
          data-cursor-text={`find out more about ${experience.company} here`}
          variants={itemVariants}
        >
          {isInView && <CustomCursor text={`find out more about ${experience.company} here`} />}
          <div className={styles.image_container}>
            <img src={experience.image} />
          </div>
          <div className={styles.text_cutout}>  {experience.company}</div>
        </motion.a>
      </motion.div>
      <div className={styles.grid_content}>
        <motion.div variants={itemVariants} className={styles.experience_timeline_wrapper}>
          <ExperienceTimeline experience={experience} isInView={isInView} />
        </motion.div>
        <motion.div variants={itemVariants} className={styles.testimonials_wrapper}>
          <motion.h4 variants={itemVariants}>what the people I work with say</motion.h4>
          {experience.testimonials.filter((t: Testimonial) => Object.keys(t).length > 0).length > 0 ? (
            isInView && (
              <Testimonials
                testimonials={experience.testimonials.filter((t: Testimonial) => Object.keys(t).length > 0)}
              />
            )
          ) : (
            <motion.p className={styles.no_testimonials} variants={itemVariants}>
              No testimonials available.
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
};

export default function Experience() {
  const experiences: Experience[] = [
    {
      title: 'Fullstack Developer',
      company: 'Banco Comafi',
      link_company: 'https://www.comafi.com.ar/',
      date: 'June 2024 - Currently',
      description:
        'In my role on the team, I contribute to the creation of frontend components with Next.js and TypeScript, as well as backend development using AWS Serverless. My work includes designing and implementing user interfaces and managing cloud services to ensure seamless platform functionality.',
      thumbnail: '/images/company_logo/comafi-logo.jpg',
      image: '/images/company_logo/comafi.webp',
      color: '#0e5c02de',
      stack: [
        { id: 'nextjs', name: 'NEXTJS' },
        { id: 'typescript', name: 'TYPESCRIPT' },
        { id: 'aws', name: 'AWS' },
        { id: 'nodejs', name: 'NODEJS' },
        { id: 'materialui', name: 'MATERIAL UI' },
      ],
      testimonials: [],
    },
    {
      title: 'Web Development Teacher',
      company: 'Coderhouse',
      link_company: 'https://www.coderhouse.com/',
      date: 'October 2022 - December 2024',
      description:
        'As a professor, I design lesson plans and guide both students and the tutoring team. I teach core web development technologies such as HTML, CSS, SASS, Bootstrap, JavaScript, and Git.',
      image: '/images/company_logo/coderhouse.jpg',
      thumbnail: '/images/company_logo/coder.jpg',
      color: '#191919e0',
      stack: [
        { id: 'html', name: 'HTML' },
        { id: 'css', name: 'CSS' },
        { id: 'javascript', name: 'JAVASCRIPT' },
        { id: 'bootstrap', name: 'BOOTSTRAP' },
        { id: 'git', name: 'GIT' },
        { id: 'scss', name: 'SCSS' },
        { id: 'python', name: 'PYTHON' },
        { id: 'django', name: 'DJANGO' },
      ],
      testimonials: [
        {
          id: 'lema',
          author: 'Nahuel Lema',
          position: 'Co-Founder Coderhouse',
          quote:
            'Fernando is a master of JavaScript. His ability to teach in a clear and motivating way is exceptional. Fernando excels in web development, JavaScript and effective teaching methods and I highly recommend Fernando as a teacher for those who want to master JavaScript!',
          linkedin: 'https://www.linkedin.com/in/nahuellema/',
          color: '#282022',
        },
        {
          id: 'massonnat',
          author: 'Mario Massonnat',
          position: "Technical Facilitator of 'Yo Puedo Programar' in Junior Achievement Santa Fe",
          quote:
            'Excellent tutor and great developer. He demonstrates a lot of knowledge and is also a very responsible and predisposed person for his work.',
          linkedin: 'https://www.linkedin.com/in/mario-massonnat/',
          color: '#312032',
        },
        {
          id: 'martin',
          author: 'Martin Manriquez Leon',
          position: ' Software Engineer in BlackLine',
          quote:
            'Fernando has been an incredible contributor to the projects he is involved in, being active with any questions or suggestions and bringing new topics to the discussions and meetings.',
          linkedin: 'https://www.linkedin.com/in/martin-manriquez/',
          color: '#342324',
        },
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Proactive Talent Hub',
      date: 'May 2023 - March 2024',
      link_company: 'https://www.linkedin.com/company/proactivetalenthub',
      description:
        'In my role as a frontend developer, I create and implement web platforms using ReactJS, focusing on delivering seamless layouts and user experiences.',
      thumbnail: '/images/company_logo/path.jpg',
      image: '/images/company_logo/proactive.avif',
      color: '#031b37c9',
      stack: [
        { id: 'reactjs', name: 'REACTJS' },
        { id: 'javascript', name: 'JAVASCRIPT' },
        { id: 'bootstrap', name: 'BOOTSTRAP' },
        { id: 'css', name: 'CSS' },
      ],
      testimonials: [],
    },
  ];

  const titleControls = useAnimation();
  const subTitleControls = useAnimation();

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
  }, [titleControls, subTitleControls]);

  return (
    <section ref={sectionRef} className={styles.experience_container} id="experiencie">
      <article className={styles.article}>
        <motion.article className={styles.title} initial={{ y: -100, opacity: 0 }} animate={titleControls}>
          <motion.h2 animate={titleControls}>My Journey: What I&apos;ve Learned in the Way</motion.h2>
          <motion.h3 animate={subTitleControls}>My Journey: What I&apos;ve Learned in the Way</motion.h3>
        </motion.article>

        {experiences.map((experience, index) => (
          <ExperienceItem key={index} experience={experience} index={index} />
        ))}
      </article>
    </section>
  );
}