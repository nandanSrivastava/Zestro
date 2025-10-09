"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { submitWaitlist, WaitlistError } from "../../lib/waitlistClient";
import styles from "./WaitlistModal.module.css";

/* ------------------ UTILITIES ------------------ */
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));

const validatePhone = (phone) =>
  String(phone || "").replace(/[^0-9]/g, "").length >= 7;

const validateForm = ({ name, phone, email }) => {
  if (!String(name || "").trim()) return "Name is required";
  if (!validatePhone(phone)) return "Please provide a valid phone";
  if (!validateEmail(email)) return "Please provide a valid email";
  return null;
};

/* ------------------ SUBCOMPONENTS ------------------ */
const InputField = ({
  name,
  label,
  placeholder,
  inputMode,
  inputRef,
  value,
  onChange,
}) => (
  <label className={styles.label} htmlFor={name}>
    <span className={styles.labelText}>{label}</span>
    <input
      id={name}
      ref={inputRef}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className={styles.input}
      placeholder={placeholder}
      inputMode={inputMode}
      aria-label={label}
    />
  </label>
);

const SuccessPanel = ({ onClose }) => (
  <div className={styles.successPanel}>
    <p className={styles.success}>Thanks — we'll be in touch.</p>
    <div className={styles.successActions}>
      <button type="button" className={styles.btnPrimary} onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);

const ActionRow = ({ onCancel, loading }) => (
  <div className={styles.row}>
    <button
      type="button"
      className={styles.btnOutline}
      onClick={onCancel}
      disabled={loading}
    >
      Cancel
    </button>
    <button type="submit" className={styles.btnPrimary} disabled={loading}>
      {loading ? "Submitting…" : "Join Waitlist"}
    </button>
  </div>
);

/* ------------------ MAIN COMPONENT ------------------ */
export default function WaitlistModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const firstRef = useRef(null);
  const containerRef = useRef(null);
  const controllerRef = useRef(null);

  /* Reset state & focus when opened */
  useLayoutEffect(() => {
    if (!open) return;
    setError("");
    setSuccess(false);
    firstRef.current?.focus();
  }, [open]);

  /* Trap focus & handle Escape */
  useEffect(() => {
    if (!open) return;

    const FOCUSABLE =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKey = (e) => {
      if (e.key === "Escape") return onClose();

      if (e.key === "Tab" && containerRef.current) {
        const focusable = Array.from(
          containerRef.current.querySelectorAll(FOCUSABLE)
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  /* Abort inflight request when closed */
  useEffect(() => {
    if (!open && controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
      setLoading(false);
    }
  }, [open]);

  /* Cleanup on unmount */
  useEffect(() => () => controllerRef.current?.abort(), []);

  const setField = useCallback((name, value) => {
    setForm((s) => ({ ...s, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess(false);

      const validationMessage = validateForm(form);
      if (validationMessage) return setError(validationMessage);

      setLoading(true);
      controllerRef.current = new AbortController();

      try {
        const payload = {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
        };

        await submitWaitlist(payload, {
          signal: controllerRef.current.signal,
        });

        setSuccess(true);
        setForm({ name: "", phone: "", email: "" });
      } catch (err) {
        if (err?.name === "AbortError") return;
        if (err instanceof WaitlistError) setError(err.message);
        else setError("Submission failed");
        console.error(err);
      } finally {
        controllerRef.current = null;
        setLoading(false);
      }
    },
    [form]
  );

  if (!open) return null;

  const modal = (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className={styles.dialog}
      >
        {/* Header + content */}
        <div className={styles.content}>
          {/* Close button (moved inside the white card so it's visually inside the modal on large screens) */}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4.5 4.5l11 11m0-11l-11 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={`${styles.header} ${styles.headerSticky}`}>
            <div className={styles.headerInner}>
              <h3 id="waitlist-title" className={styles.title}>
                Join the waitlist
              </h3>
              <p className={styles.subtitle}>
                Get early access — we'll notify you when we launch.
              </p>
            </div>
          </div>

          {/* Body */}
          {success ? (
            <SuccessPanel onClose={onClose} />
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <InputField
                name="name"
                label="Name"
                placeholder="Your full name"
                inputMode="text"
                inputRef={firstRef}
                value={form.name}
                onChange={setField}
              />
              <InputField
                name="phone"
                label="Phone"
                placeholder="e.g. +91 9876543210"
                inputMode="tel"
                value={form.phone}
                onChange={setField}
              />
              <InputField
                name="email"
                label="Email"
                placeholder="you@company.com"
                inputMode="email"
                value={form.email}
                onChange={setField}
              />

              {error && <div className={styles.error}>{error}</div>}

              <ActionRow onCancel={onClose} loading={loading} />
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
