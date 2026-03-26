'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Burger from './burger';
import Stairs from './stairs';
import Menu from './menu';
import { menuLayer, mountAnim } from './anim';
import styles from './FullscreenMenuOverlay.module.scss';

export default function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <header>
      <Burger openMenu={() => setMenuIsOpen(true)} />
      <AnimatePresence mode="sync">
        {menuIsOpen && (
          <motion.div
            key="fullscreen-menu"
            className={styles.layer}
            variants={menuLayer}
            {...mountAnim}
          >
            <Stairs />
            <Menu closeMenu={() => setMenuIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}