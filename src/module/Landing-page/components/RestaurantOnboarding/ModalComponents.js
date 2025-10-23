import styles from "../../styles/RestaurantOnboardingModal.module.css";

/**
 * Form section wrapper component
 */
export function FormSection({ title, children }) {
  return (
    <div className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
}

/**
 * Success panel component displayed after successful form submission
 */
export function SuccessPanel({ onClose }) {
  return (
    <div className={styles.successPanel}>
      <div className={styles.successIcon}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#10B981" />
          <path
            d="M16 24l6 6 12-12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className={styles.successTitle}>Application Submitted!</h3>
      <p className={styles.successMessage}>
        Thank you for your interest in joining Zestro! We've received your
        restaurant onboarding application. Our team will review your information
        and get back to you within 2-3 business days.
      </p>
      <div className={styles.successActions}>
        <button type="button" className={styles.btnPrimary} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

/**
 * Action row component with cancel and submit buttons
 */
export function ActionRow({ onCancel, loading }) {
  return (
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
        {loading ? "Submitting Application..." : "Submit Application"}
      </button>
    </div>
  );
}

/**
 * Modal header component
 */
export function ModalHeader() {
  return (
    <div className={styles.headerInner}>
      <div className={styles.titleRow}>
        <h3 id="onboarding-title" className={styles.title}>
          <span className={styles.titleAccent}>Join</span> Zestro
        </h3>
      </div>
    </div>
  );
}

/**
 * Close button component for modal
 */
export function CloseButton({ onClose }) {
  return (
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
  );
}
