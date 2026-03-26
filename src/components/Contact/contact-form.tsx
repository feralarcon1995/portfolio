"use client";

import React, { useRef, useState, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import styles from "./contact-form.module.scss";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { SplitInline } from "@/components/SplitWordsReveal/SplitWordsReveal";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState<string>("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { elementProgressMotion } = useLenisScroll(sectionRef as unknown as React.RefObject<HTMLElement>);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  const [formReveal, setFormReveal] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  const currentYear = new Date().getFullYear();

  const titleY = useTransform(elementProgressMotion, [0, 0.62, 1], [0, -52, -92]);
  const titleOpacity = useTransform(elementProgressMotion, [0, 0.65, 1], [1, 1, 0.22]);
  const smoothTitleY = useSpring(titleY, { stiffness: 76, damping: 24 });
  const smoothTitleOpacity = useSpring(titleOpacity, { stiffness: 92, damping: 28 });

  const blockY = useTransform(elementProgressMotion, [0, 0.75, 1], [0, -18, -32]);
  const blockOpacity = useTransform(elementProgressMotion, [0, 0.58, 1], [0.88, 1, 0.15]);
  const smoothBlockY = useSpring(blockY, { stiffness: 62, damping: 22 });
  const smoothBlockOpacity = useSpring(blockOpacity, { stiffness: 70, damping: 24 });

  const shellX = useTransform(elementProgressMotion, [0, 0.76, 1], [0, 76, 124]);
  const shellOpacity = useTransform(elementProgressMotion, [0, 0.62, 1], [1, 1, 0.18]);
  const smoothShellX = useSpring(shellX, { stiffness: 54, damping: 20 });
  const smoothShellOpacity = useSpring(shellOpacity, { stiffness: 66, damping: 23 });

  const footerLineY = useTransform(elementProgressMotion, [0, 1], [0, -14]);
  const smoothFooterLineY = useSpring(footerLineY, { stiffness: 58, damping: 21 });

  const contactOutline1Y = useTransform(elementProgressMotion, [0, 1], [0, -38]);
  const contactOutline2Y = useTransform(elementProgressMotion, [0, 1], [0, -88]);
  const smoothContactOutline1Y = useSpring(contactOutline1Y, { stiffness: 52, damping: 21 });
  const smoothContactOutline2Y = useSpring(contactOutline2Y, { stiffness: 52, damping: 21 });

  useMotionValueEvent(elementProgressMotion, "change", (v: number) => {
    if (isMobile) return;
    if (!formReveal && v >= 0.12) setFormReveal(true);
  });

  useEffect(() => {
    const checkIfMobile = () => {
      const isSmallScreen = window.innerWidth < 768;

      setIsMobile(isSmallScreen);
      if (isSmallScreen) setFormReveal(true);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    if (value) {
      setCaptchaError("");
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let verificationValue;

      if (isMobile) {
        verificationValue = captchaValue || recaptchaRef.current?.getValue();

        if (!verificationValue) {
          setCaptchaError("Please check the reCAPTCHA box");
          setIsSubmitting(false);
          return;
        }
      } else {
        try {
          verificationValue = await recaptchaRef.current?.executeAsync();
        } catch (error) {
          setCaptchaError("Failed to verify reCAPTCHA. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      if (!verificationValue) {
        setCaptchaError("reCAPTCHA verification failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      if (!formRef.current) {
        setIsSubmitting(false);
        return;
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        "g-recaptcha-response": verificationValue
      };


      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setCaptchaValue(null);
      recaptchaRef.current?.reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setCaptchaError(`Error: ${error.message}`);
      } else {
        setCaptchaError("An unknown error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, formData, isMobile, captchaValue]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    idle: {
      backgroundColor: "#F2E5BF",
      color: "#000",
      borderColor: "transparent",
      scale: 1
    },
    sending: {
      backgroundColor: "#f8f8f8",
      color: "#666",
      borderColor: "#eee",
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#F2E5BF",
      color: "#000",
      borderColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={sectionRef} className={styles.contact_container} id="contact">
      <div className={styles.contactBgLines} aria-hidden="true">
        <motion.div
          className={styles.contactOutline1}
          style={{ y: isMobile ? 0 : smoothContactOutline1Y, opacity: 0.08 }}
        >
          COMMS_RELAY
        </motion.div>
        <motion.div
          className={styles.contactOutline2}
          style={{ y: isMobile ? 0 : smoothContactOutline2Y, opacity: 0.05 }}
        >
          SIGNAL_READY
        </motion.div>
      </div>
      <motion.div
        className={styles.contact_content}
        style={{ y: isMobile ? 0 : smoothBlockY, opacity: isMobile ? 1 : smoothBlockOpacity }}
      >
        <motion.header
          className={styles.contact_section_header}
          style={{ y: isMobile ? 0 : smoothTitleY, opacity: isMobile ? 1 : smoothTitleOpacity }}
        >
          <div className={styles.section_kicker}>CONTACT_RESOURCES_V1.0</div>
          <h2 className={styles.section_title}>
            <SplitInline
              segments={[
                { words: ["CONTACT_"] },
                { words: ["TERMINAL"], className: styles.section_accent },
              ]}
              delayChildren={0.06}
            />
          </h2>
          <div className={styles.section_path}>PATH: /USER/FERNANDO/TRANSMISSIONS</div>
        </motion.header>

        <div className={styles.terminal_topbar}>
          <div className={styles.dots} aria-hidden="true">
            <div className={styles.dot_red} />
            <div className={styles.dot_yellow} />
            <div className={styles.dot_green} />
          </div>
          <h2 className={styles.terminal_title}>Terminal — v2.4.0-contact</h2>
        </div>

        <motion.div
          className={styles.terminal_shell}
          style={{ x: isMobile ? 0 : smoothShellX, opacity: isMobile ? 1 : smoothShellOpacity }}
        >
          <div className={styles.scanline} aria-hidden="true" />

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.terminal_form}
            initial={isMobile ? "visible" : "hidden"}
            animate={isMobile || formReveal ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className={styles.terminal_infobar}>
              <div className={styles.infobar_left}>
                <span className={styles.pulse_dot} aria-hidden="true" />
                <span className={styles.infobar_text}>CONNECTION_STABLE</span>
              </div>
              <div className={styles.infobar_right}>
                <span className={styles.infobar_k}>ENC_TYPE:</span> AES-256-GCM
              </div>
              <div className={styles.infobar_ready}>READY_FOR_INPUT</div>
            </div>

            <div className={styles.terminal_grid}>
              <div className={styles.terminal_inputs_col}>
                <motion.div className={styles.terminal_field} variants={itemVariants}>
                  <label className={styles.terminal_label} htmlFor="name">
                    01. USER_NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER_IDENTITY"
                    className={`${styles.terminal_input} ${errors.name ? styles.terminal_error_input : ""}`}
                  />
                  {errors.name && <span className={styles.error_message}>{errors.name}</span>}
                </motion.div>

                <motion.div className={styles.terminal_field} variants={itemVariants}>
                  <label className={styles.terminal_label} htmlFor="email">
                    02. USER_EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ENTER_COMMS_ENDPOINT"
                    className={`${styles.terminal_input} ${errors.email ? styles.terminal_error_input : ""}`}
                  />
                  {errors.email && <span className={styles.error_message}>{errors.email}</span>}
                </motion.div>
              </div>

              <div className={styles.terminal_textarea_col}>
                <motion.div className={styles.terminal_field} variants={itemVariants}>
                  <label className={styles.terminal_label} htmlFor="message">
                    03. INITIALIZE_BRIEF
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="SYSTEM_AWAITING_DATA..."
                    rows={5}
                    className={`${styles.terminal_textarea} ${errors.message ? styles.terminal_error_input : ""}`}
                  />
                  {errors.message && <span className={styles.error_message}>{errors.message}</span>}
                </motion.div>
              </div>
            </div>

            <div className={styles.terminal_execute_row}>
              <div className={styles.terminal_status}>
                <div className={styles.terminal_prompt}>
                  <span className={styles.prompt_root}>ROOT@MEDICENFERPY:~#</span>
                  <span className={styles.prompt_cursor} aria-hidden="true" />
                </div>
                <div className={styles.status_text}>
                  {isSubmitting
                    ? "EXECUTE_RUNNING..."
                    : isSubmitted
                      ? "TRANSMISSION_CONFIRMED"
                      : "Awaiting Command Execute..."}
                </div>
              </div>

              <motion.button
                type="submit"
                className={styles.terminal_execute_button}
                disabled={isSubmitting}
                variants={buttonVariants}
                initial="idle"
                animate={isSubmitting ? "sending" : "idle"}
                whileHover={isSubmitting ? undefined : "hover"}
                whileTap={isSubmitting ? undefined : "tap"}
              >
                {isSubmitting ? (
                  <motion.div className={styles.sending_container}>
                    <motion.div
                      className={styles.loading_circle}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div className={styles.sending_text}>
                      <span>Sending</span>
                      <motion.span
                        className={styles.loading_dot}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        className={styles.loading_dot}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        className={styles.loading_dot}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      >
                        .
                      </motion.span>
                    </motion.div>
                  </motion.div>
                ) : (
                  "EXECUTE_SEND"
                )}
              </motion.button>
            </div>

            <div className={styles.recaptcha_container}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                size={isMobile ? "compact" : "invisible"}
                badge="bottomright"
                onChange={handleCaptchaChange}
              />
            </div>

            {captchaError && (
              <motion.div className={styles.error_message} variants={itemVariants}>
                {captchaError}
              </motion.div>
            )}

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  key="contact-success"
                  className={styles.success_wrapper}
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className={styles.success_message}>
                    <motion.div
                      className={styles.success_icon}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: { delay: 0.12, type: "spring", stiffness: 320, damping: 20 },
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                          d="M5 13L9 17L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </svg>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>

        <motion.div
          className={styles.terminal_footer}
          style={{ y: isMobile ? 0 : smoothFooterLineY }}
        >
          END_OF_TRANSMISSION // {currentYear}
        </motion.div>
      </motion.div>
    </section>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;