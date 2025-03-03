import { motion } from 'framer-motion';
import styles from './Contact.module.scss';
import GithubIcon from '@/icons/GithubIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import Line from '../Line/Line';
import { RButton } from '../Button/RButton';
import EmailIcon from '@/icons/EmailIcon';
import XIcon from '@/icons/XIcon';
import Magnet from '../Magnet/Magnet';
import Link from 'next/link';
import { menu } from '../Navbar/menu';

const socialLinks = [
  {
    id: 1,
    icon: <GithubIcon />,
    url: 'https://github.com/feralarcon1995',
    label: 'GitHub'
  },
  {
    id: 2,
    icon: <LinkedinIcon />,
    url: 'https://linkedin.com/in/feralarcon1995',
    label: 'LinkedIn'
  },
  {
    id: 3,
    icon: <XIcon />,
    url: 'https://x.com/medicenferpy',
    label: 'X'
  },
  {
    id: 4,
    icon: <EmailIcon />,
    url: 'mailto:feralarcon1995@gmail.com',
    label: 'Email'
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Contact() {
  function getFullYear() {
    return new Date().getFullYear();
  }
  return (
    <footer id="contact" className={styles.contact}>
      <div className={styles.footer_container}>
        <div className={styles.footer_menu}>
          <h2>Menu</h2>
          {menu.map((item) => (
            <Magnet key={item.path_url} padding={20} disabled={false} magnetStrength={5}>
              <Link href={item.path_url} key={item.title} className={styles.footer_menu_link}>
                {item.title}
              </Link>
            </Magnet>
          ))}
        </div>
        <div className={styles.footer_contact}>
          <h2>Let&#39;s Talk</h2>
          <motion.div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <Magnet key={link.id} padding={50} disabled={false} magnetStrength={10}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social_link}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </motion.a>
              </Magnet>
            ))}
          </motion.div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <p className={styles.footer_title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 200"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="stretch" patternUnits="userSpaceOnUse" width="100%" height="100%">
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontFamily="Arial Black, Arial, sans-serif"
                  fontWeight="900"
                  fontSize="150"
                  textLength="100%"
                  lengthAdjust="spacingAndGlyphs"
                  style={{
                    textTransform: 'uppercase',
                    filter: 'url(#outline)'
                  }}
                >
                  MEDICENFERPY
                </text>
              </pattern>
              <filter id="outline">
                <feMorphology
                  operator="dilate"
                  radius="2"
                  in="SourceAlpha"
                  result="thicken"
                />
                <feFlood floodColor="white" />
                <feComposite in2="thicken" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#stretch)" />
          </svg>
        </p>
        <p className={styles.footer_text}>&copy; {getFullYear()}. Handcrafted by Ferpy </p>
      </div>
    </footer>
  );
} 