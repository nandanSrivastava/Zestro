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
  const { validateForm, submitForm } = useFormikContext();
  const isSmallScreen = useResponsiveButtonText();

  const handleNext = async () => {
    // Validate current step fields before proceeding
    const errors = await validateForm();
    const currentStepId = FORM_STEPS[currentStep].id;

    // Check if current step has validation errors
    const hasStepErrors = Object.keys(errors).some((key) => {
      return STEP_FIELDS[currentStepId]?.includes(key);
    });

    if (hasStepErrors) {
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
