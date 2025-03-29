"use client";

import React, { useRef, useState, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./contact-form.module.scss";
import emailjs from "@emailjs/browser";
import Squares from "../Squares/Squares";
import Magnet from "../Magnet/Magnet";
import ReCAPTCHA from "react-google-recaptcha";

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
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (recaptchaRef.current) {
      try {
        setIsSubmitting(true);
        setIsSubmitting(true);
        const captchaValue = await recaptchaRef.current.executeAsync();
        console.log("Captcha Value:", captchaValue); 

        if (!captchaValue) {
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
          "g-recaptcha-response": captchaValue
        };

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
        );

        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        recaptchaRef.current.reset();

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error: unknown) {
        console.error("Error sending email or verifying reCAPTCHA:", error);
        setCaptchaError("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [validateForm, formData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      backgroundColor: "#fff",
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
      backgroundColor: "#000",
      color: "#fff",
      borderColor: "#fff",
      borderWidth: "1px",
      borderStyle: "solid",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const loadingDotsVariants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  const successVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: 0.8
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className={styles.contact_container} id="contact-form">
      <div className={styles.background_wrapper}>
        <Squares
          speed={0.5}
          squareSize={40}
          direction="down"
          borderColor="#323232"
          hoverFillColor="#eee"
        />
      </div>
      <motion.div
        className={styles.contact_content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className={styles.contact_header}>
          <h1>Get in touch.</h1>
          <h2>Fill out the form below and I&#39;ll get back to you soon.</h2>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className={styles.contact_form}
          variants={containerVariants}
        >
          <Magnet padding={30} disabled={false} magnetStrength={60} className={styles.w_full}>
            <motion.div className={styles.form_group} variants={itemVariants}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={errors.name ? styles.error_input : ""}
              />
              {errors.name && <span className={styles.error_message}>{errors.name}</span>}
            </motion.div>
          </Magnet>
          <Magnet padding={50} disabled={false} magnetStrength={60} className={styles.w_full}>
            <motion.div className={styles.form_group} variants={itemVariants}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className={errors.email ? styles.error_input : ""}
              />
              {errors.email && <span className={styles.error_message}>{errors.email}</span>}
            </motion.div>
          </Magnet>
          <Magnet padding={50} disabled={false} magnetStrength={60} className={styles.w_full}>
            <motion.div className={styles.form_group} variants={itemVariants}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={5}
                className={errors.message ? styles.error_input : ""}
              />
              {errors.message && <span className={styles.error_message}>{errors.message}</span>}
            </motion.div>
          </Magnet>

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            size="invisible"
            badge="inline"
          />

          {captchaError && (
            <motion.div className={styles.error_message} variants={itemVariants}>
              {captchaError}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className={styles.submit_button}
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
                  animate={{
                    rotate: 360,
                  }}
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
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0
                    }}
                  >.</motion.span>
                  <motion.span
                    className={styles.loading_dot}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0.2
                    }}
                  >.</motion.span>
                  <motion.span
                    className={styles.loading_dot}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0.4
                    }}
                  >.</motion.span>
                </motion.div>
              </motion.div>
            ) : (
              "Send Message"
            )}
          </motion.button>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                className={styles.success_message}
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="success-message"
              >
                <motion.div
                  className={styles.success_icon}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { delay: 0.2, type: "spring", stiffness: 300 }
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
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Thank you! Your message has been sent successfully.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </section>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;