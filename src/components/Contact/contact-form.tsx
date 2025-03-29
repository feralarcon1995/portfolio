"use client";

import React, { useRef, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import styles from "./contact-form.module.scss";
import emailjs from "@emailjs/browser";
import Squares from "../Squares/Squares";
import Magnet from "../Magnet/Magnet";

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
  const formRef = useRef<HTMLFormElement>(null);

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

    setIsSubmitting(true);

    try {
      if (!formRef.current) {
        return;
      }

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error: unknown) {
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

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

  return (
    <section className={styles.contact_container} id="#contact-form">
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
          <motion.button
            type="submit"
            className={styles.submit_button}
            disabled={isSubmitting}
            whileHover="hover"
            whileTap="tap"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
          {isSubmitted && (
            <motion.div
              className={styles.success_message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;