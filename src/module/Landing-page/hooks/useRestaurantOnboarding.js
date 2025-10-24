import { useCallback, useEffect, useRef, useState } from "react";
import {
  INITIAL_FORM_STATE,
  toApiPayload,
} from "../../../utils/restaurantOnboardingData";

/**
 * Custom hook for managing restaurant onboarding form state and logic
 */
export function useRestaurantOnboarding() {
  // Formik will own form state; hook keeps submission state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const controllerRef = useRef(null);

  // Clear error message
  const clearError = useCallback(() => setError(""), []);

  // Handle celebration completion
  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
  }, []);

  // Submit form data
  // Submit Formik values. submitFunction should accept (payload, { signal })
  const submitValues = useCallback(async (values, submitFunction) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    controllerRef.current = new AbortController();

    try {
      // If logo is a File, convert to base64 string
      const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const preparedValues = { ...values };
      if (preparedValues.logo && typeof preparedValues.logo === "object") {
        try {
          preparedValues.logo = await fileToBase64(preparedValues.logo);
        } catch (err) {
          console.warn("Failed to convert logo to base64", err);
          preparedValues.logo = null;
        }
      }

      const payload = toApiPayload(preparedValues);
      await submitFunction(payload, { signal: controllerRef.current.signal });
      setSuccess(true);

      // Trigger celebration effect
      setTimeout(() => {
        setShowCelebration(true);
      }, 500); // Small delay for better UX

      return true;
    } catch (err) {
      if (err?.name === "AbortError") return false;
      const errorMessage = err?.message || "Failed to submit application";
      setError(errorMessage);
      console.error("Restaurant onboarding submission error:", err);
      return false;
    } finally {
      controllerRef.current = null;
      setLoading(false);
    }
  }, []);

  // Abort current request
  const abortSubmission = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
      setLoading(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return {
    loading,
    error,
    success,
    showCelebration,
    clearError,
    submitValues,
    abortSubmission,
    handleCelebrationComplete,
  };
}
