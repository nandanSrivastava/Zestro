"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/RestaurantOnboardingModal.module.css";
import { useRestaurantOnboarding } from "../hooks/useRestaurantOnboarding";
import { submitRestaurantOnboarding } from "../../../lib/restaurantOnboardingClient";
import {
  FORMIK_INITIAL_VALUES,
  getValidationSchema,
} from "../../../utils/restaurantOnboardingData";

import {
  SuccessPanel,
  ModalHeader,
  CloseButton,
  RestaurantOnboardingForm,
} from "./RestaurantOnboarding";
import { Formik } from "formik";

/**
 * Restaurant Onboarding Modal Component
 */
export default function RestaurantOnboardingModal({ open, onClose }) {
  const { loading, error, success, submitValues, abortSubmission } =
    useRestaurantOnboarding();

  const firstRef = useRef(null);
  const containerRef = useRef(null);

  /* Focus management when modal opens */
  useLayoutEffect(() => {
    if (!open) return;
    firstRef.current?.focus();
  }, [open]);

  /* Keyboard navigation and focus trapping */
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

  /* Cleanup on modal close */
  useEffect(() => {
    if (!open) {
      abortSubmission();
    }
  }, [open, abortSubmission]);

  /* Formik onSubmit handled below via submitValues */

  if (!open) return null;

  const modal = (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className={styles.dialog}
      >
        <div className={styles.content}>
          <CloseButton onClose={onClose} />

          <div className={`${styles.header} ${styles.headerSticky}`}>
            <ModalHeader />
          </div>

          {success ? (
            <SuccessPanel onClose={onClose} />
          ) : (
            <Formik
              initialValues={FORMIK_INITIAL_VALUES}
              validationSchema={getValidationSchema()}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await submitValues(values, submitRestaurantOnboarding);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {(formikProps) => (
                <RestaurantOnboardingForm
                  onSubmit={formikProps.handleSubmit}
                  onCancel={onClose}
                  loading={loading || formikProps.isSubmitting}
                  error={error}
                  firstRef={firstRef}
                />
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
