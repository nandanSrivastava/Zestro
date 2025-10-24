import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import styles from "../../styles/RestaurantOnboardingModal.module.css";
import { FORM_STEPS, STEP_FIELDS } from "./steps";
import { StepIndicator } from "./navigation/StepIndicator";
import { StepNavigation } from "./navigation/StepNavigation";

// Custom hook for responsive button text
const useResponsiveButtonText = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 360);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isSmallScreen;
};

// Main MultiStep Form Component
export function MultiStepForm({
  onCancel,
  loading,
  error,
  firstRef,
  onSubmitStep,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepError, setStepError] = useState(null);
  const { validateForm, submitForm, setTouched, touched } = useFormikContext();
  const isSmallScreen = useResponsiveButtonText();

  const handleNext = async () => {
    // Clear any previous step error
    setStepError(null);

    // Validate current step fields before proceeding
    const errors = await validateForm();
    const currentStepId = FORM_STEPS[currentStep].id;
    const currentStepFields = STEP_FIELDS[currentStepId] || [];

    // Check if current step has validation errors
    const hasStepErrors = Object.keys(errors).some((key) => {
      return currentStepFields.includes(key);
    });

    if (hasStepErrors) {
      // Mark all current step fields as touched to show validation errors
      const touchedFields = {};
      currentStepFields.forEach((fieldName) => {
        touchedFields[fieldName] = true;
      });
      setTouched({ ...touched, ...touchedFields });

      // Show general error message
      setStepError("Please fill in all required fields before continuing.");
      return; // Stay on current step if validation fails
    }

    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - submit the form using Formik's submitForm
      submitForm();
    }
  };

  const handlePrev = () => {
    setStepError(null); // Clear step error when going back
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = FORM_STEPS[currentStep].component;
  const isLastStep = currentStep === FORM_STEPS.length - 1;

  return (
    <div className={styles.multiStepForm}>
      {/* Show only the current step title instead of the step indicator navigation */}
      <div className={styles.stepTitleHeader}>
        <h2 className={styles.stepTitle}>{FORM_STEPS[currentStep].title}</h2>
      </div>

      <div className={styles.stepContent}>
        <CurrentStepComponent firstRef={currentStep === 0 ? firstRef : null} />
      </div>

      {/* Display step validation error */}
      {stepError && <div className={styles.error}>{stepError}</div>}

      {/* Display general error from props */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Fixed footer with navigation buttons */}
      <div className={styles.modalFooter}>
        <div className={styles.footerButtons}>
          {/* Previous button - left side */}
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className={styles.btnOutline}
              disabled={loading}
            >
              Previous
            </button>
          )}

          {/* Spacer to push Next button to the right */}
          <div className={styles.footerSpacer}></div>

          {/* Next button - right side */}
          <button
            type="button"
            onClick={handleNext}
            className={styles.btnPrimary}
            disabled={loading}
          >
            {loading
              ? isLastStep
                ? "Submitting..."
                : "Saving..."
              : isLastStep
              ? isSmallScreen
                ? "Submit"
                : "Submit Application"
              : isSmallScreen
              ? "Next"
              : "Save & Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
