import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import styles from "./preloader.module.scss";

const TextPressure = dynamic(() => import("../TextPressure/TextPressure"), {
  ssr: false
});

export default function PreLoader({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const hasCompleted = useRef(false);

  const generateMessage = () => {
    const messages = [
      "Welcome...",
      "Just A Second...",
      "In progress...",
      "Loading...",
      "It's Coming...",
      "One Moment...",
      "Almost There...",
      "Don't leave.."
    ];
    const randomNum = Math.floor(Math.random() * messages.length);
    return messages[randomNum];
  };

  useEffect(() => {
    if (hasCompleted.current) return;

    setMessage(generateMessage());
    setProgress(0);

    const totalDuration = 2000;
    const intervalTime = 30;
    const totalSteps = totalDuration / intervalTime;
    const increment = 100 / totalSteps;

    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;

        if (next >= 100) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          if (onLoadingComplete && !hasCompleted.current) {
            hasCompleted.current = true;
            onLoadingComplete();
          }
          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      {progress < 100 && (
        <motion.div
          className={styles.preloader_overlay}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            className={styles.preloader_container}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.8,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.1
            }}
            style={{ pointerEvents: 'none' }}
          >
            <div className={styles.text_container}>
              <TextPressure
                text={message}
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={100}
              />
            </div>

            <div className={styles.percentage_container}>
              {Math.floor(progress).toString().split('').map((digit, index) => (
                <motion.span
                  key={index}
                  className={styles.percentage_digit}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: index * 0.1
                    }
                  }}
                >
                  {digit}
                </motion.span>
              ))}
              <motion.span
                className={styles.percentage_symbol}
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: Math.floor(progress).toString().length * 0.1
                  }
                }}
              >
                %
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}