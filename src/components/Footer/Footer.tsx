import styles from './Footer.module.scss';
import GithubIcon from '@/icons/GithubIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import EmailIcon from '@/icons/EmailIcon';
import XIcon from '@/icons/XIcon';
import Link from 'next/link';
import { menu } from '../Navbar/menu';
import Magnet from '../Magnet/Magnet';

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

export default function Footer() {
  function getFullYear() {
    return new Date().getFullYear();
  }

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.logo}>
        <h1>MEDICENFERPY</h1>
      </div>

      <div className={styles.footerContent}>
        <div className={styles.column}>
          <h2>NAVIGATE</h2>
          <nav>
            {menu.map((item) => (
              <Link
                href={item.path_url}
                key={item.title}
                className={styles.navLink}
              >
                {item.title.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.column}>
          <h2>FOLLOW</h2>
          <nav>
            {socialLinks.map((link) => (
              <Magnet key={link.id} padding={60} disabled={false} magnetStrength={30}>
                <a
                  href={link.url}
                  key={link.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              </Magnet>
            ))}
          </nav>
        </div>

        <div className={styles.column}>
          <h2>CONTACT</h2>
          <nav>
            <a href="#" className={styles.navLink}>GET STARTED</a>
            <a href="mailto:feralarcon1995@gmail.com" className={styles.navLink}>
              feralarcon1995@gmail.com
            </a>
          </nav>
        </div>

        <div className={styles.column}>
          <h2>VISIT</h2>
          <p className={styles.visitText}>By Appointment Only</p>
          <address className={styles.address}>
            La Matanza.<br />
            Buenos Aires. Argentina
          </address>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>ALL RIGHTS RESERVED. ALL WRONGS RESTORED.</p>
        <div className={styles.footerBottomRight}>
          <p className={styles.motto}>WORK HARD, BE SATISFIED</p>
          <p className={styles.copyrightYear}>© {getFullYear()}, MADE BY FERPY</p>
        </div>
      </div>
    </footer>
  );
}