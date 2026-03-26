import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideLeft, mountAnim, rotateX } from '../anim';
import styles from './style.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type NavItem = { label: string; href: string };

export const menuNavItems: NavItem[] = [
  { label: 'ABOUT', href: '#about' },
  { label: 'JOURNAL', href: '#experiencie' },
  { label: 'WORK', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

interface MenuProps {
  closeMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ closeMenu }) => {
  const router = useRouter();
  const [utcTime, setUtcTime] = useState('');
  const [activeHref, setActiveHref] = useState<string>(menuNavItems[0]?.href ?? '#about');

  useEffect(() => {
    let rafId = 0;
    const computeActiveHref = () => {
      const hasWindow = typeof window !== 'undefined';
      if (!hasWindow) return;

      const y = window.scrollY + 140;

      const items = menuNavItems
        .map((item) => {
          const id = item.href.replace(/^#/, '');
          const el = document.getElementById(id);
          return el ? { href: item.href, offsetTop: el.offsetTop } : null;
        })
        .filter(Boolean) as Array<{ href: string; offsetTop: number }>;

      if (items.length === 0) {
        const isProjectPage = window.location.pathname.startsWith('/projects/');
        setActiveHref(isProjectPage ? '#projects' : '#about');
        return;
      }

      let current = items[0].href;
      for (const item of items) {
        if (item.offsetTop <= y) current = item.href;
      }
      setActiveHref(current);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        computeActiveHref();
      });
    };

    computeActiveHref();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const t = new Date();
      const h = String(t.getUTCHours()).padStart(2, '0');
      const m = String(t.getUTCMinutes()).padStart(2, '0');
      const s = String(t.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s}`);
    };
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, []);

  const navigateTo = useCallback(
    (path: string) => {
      closeMenu()
      const goHash = (hash: string) => {
        const el = document.querySelector(hash)
        if (el) {
          const behavior = window.innerWidth < 768 ? 'auto' : 'smooth'
          el.scrollIntoView({ behavior })
        }
      }

      if (typeof window === 'undefined') return

      const isProjectPage = window.location.pathname.startsWith('/projects/')

      if (path.startsWith('#')) {
        if (router.pathname === '/') {
          window.setTimeout(() => goHash(path), 80)
          return
        }
        if (isProjectPage) {
          void router.push('/').then(() => {
            window.setTimeout(() => goHash(path), 120)
          })
          return
        }
        void router.push(`/#${path.slice(1)}`).then(() => {
          window.setTimeout(() => goHash(path), 120)
        })
        return
      }

      void router.push(path)
    },
    [closeMenu, router]
  );

  const onNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigateTo(href)
  };

  const year = new Date().getFullYear();

  return (
    <div className={styles.root}>
      <div className={styles.bgGrid} aria-hidden />
      <div className={styles.bgDrift} aria-hidden>
        <div className={`${styles.driftSquare} ${styles.driftA}`} />
        <div className={`${styles.driftSquare} ${styles.driftB}`} />
        <div className={`${styles.driftSquare} ${styles.driftC}`} />
        <div className={`${styles.driftSquare} ${styles.driftD}`} />
      </div>
      <div className={styles.ghostSystem} aria-hidden>
        SYSTEM_STABLE
      </div>
      <div className={styles.ghostLatency} aria-hidden>
        LATENCY: 14MS
      </div>

      <nav className={styles.topNav}>
        <Link href="/" className={styles.brand} onClick={() => closeMenu()}>
          MEDICENFERPY
        </Link>
        <div className={styles.topNavRight}>
          <div className={styles.topNavLinks}>
            {menuNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.topNavLink}
                onClick={(e) => onNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <motion.button
            type="button"
            variants={slideLeft}
            {...mountAnim}
            className={styles.iconButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span className={`material-symbols-outlined ${styles.materialIcon}`}>close</span>
          </motion.button>
        </div>
      </nav>

      <div className={styles.mobileHeader}>
        <div className={styles.mobileStatus}>
          <span className={styles.mobileStatusPrimary}>MEDICENFERPY</span>
          <span className={styles.mobileStatusMuted}>SYSTEM_STATUS: ACTIVE</span>
        </div>
        <motion.button
          type="button"
          variants={slideLeft}
          {...mountAnim}
          className={styles.mobileClose}
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <span className={`material-symbols-outlined ${styles.materialIconLarge}`}>close</span>
        </motion.button>
      </div>

      <main className={styles.main}>
        <motion.div variants={opacity} {...mountAnim} custom={0.08} className={styles.meta}>
          <div className={styles.metaPrimary}>EDITORIAL_V1</div>
          <div className={styles.metaSecondary}>
            SYSTEM_STATUS: ACTIVE // OVERLAY_MODE: FULL
          </div>
        </motion.div>

        <div className={styles.linkCluster}>
          {menuNavItems.map((item, index) => (
            <motion.div
              key={item.href}
              variants={rotateX}
              {...mountAnim}
              custom={index}
              className={styles.linkRow}
            >
              <span className={styles.linkIndex}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <a
                href={item.href}
                className={`${styles.linkAnchor} ${activeHref === item.href ? styles.linkAnchorActive : ''}`}
                onClick={(e) => onNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div variants={opacity} {...mountAnim} custom={0.42} className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => navigateTo('#contact')}
          >
            START_PROJECT
          </button>
        </motion.div>
      </main>

      <motion.footer
        variants={opacity}
        {...mountAnim}
        custom={0.32}
        className={styles.shellFooter}
      >
        <div className={styles.footerLeft}>
          <div className={styles.footerMeta}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>location_on</span>
            <span className={styles.footerMetaText}>ARG_BUE</span>
          </div>
        </div>
        <div className={styles.footerSocial}>
          <a
            href="https://github.com/feralarcon1995"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/feralarcon1995/"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>
        </div>
        <div className={styles.footerCopyright}>©{year}_MEDICENFERPY</div>
      </motion.footer>

      <div className={styles.mobileFooterInner}>
        <div className={styles.mobileFooterCol}>
          <div className={styles.mobileFooterSocial}>
            <a
              href="https://github.com/feralarcon1995"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/feralarcon1995/"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
          </div>
          <p className={styles.mobileCopyright}>©{year}_MEDICENFERPY</p>
        </div>
        <div className={styles.mobileFooterMeta}>
          <div className={styles.mobileMetaRow}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>location_on</span>
            <span className={styles.mobileMetaText}>ARG_BUE</span>
          </div>
        </div>
      </div>

      <div className={styles.corners} aria-hidden>
        <div className={`${styles.corner} ${styles.cornerTl}`} />
        <div className={`${styles.corner} ${styles.cornerTr}`} />
        <div className={`${styles.corner} ${styles.cornerBl}`} />
        <div className={`${styles.corner} ${styles.cornerBr}`} />
      </div>

      <div className={styles.mobileBgWord} aria-hidden>
        MEDICENFERPY
      </div>
    </div>
  );
};

export default Menu;
