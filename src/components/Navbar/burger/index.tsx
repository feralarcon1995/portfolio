import Link from 'next/link';
import styles from './style.module.scss';

interface BurgerProps {
  openMenu: () => void;
}

export default function Burger({ openMenu }: BurgerProps) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      <Link href="/" className={styles.logo}>
        MEDICENFERPY
      </Link>
      <button type="button" className={styles.menuTrigger} onClick={openMenu} aria-label="Open menu">
        <span className={`material-symbols-outlined ${styles.menuIcon}`}>menu</span>
      </button>
    </nav>
  );
}
