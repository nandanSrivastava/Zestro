import { useState } from "react";
import { useFormikContext } from "formik";
import styles from "../../styles/RestaurantOnboardingModal.module.css";
import { FORM_STEPS, STEP_FIELDS } from "./steps";
import { StepIndicator } from "./navigation/StepIndicator";
import { StepNavigation } from "./navigation/StepNavigation";

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
      <StepIndicator currentStep={currentStep} steps={FORM_STEPS} />

      <div className={styles.stepContent}>
        <CurrentStepComponent firstRef={currentStep === 0 ? firstRef : null} />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.stepFooter}>
        <StepNavigation
          currentStep={currentStep}
          totalSteps={FORM_STEPS.length}
          onNext={handleNext}
          onPrev={handlePrev}
          loading={loading}
          isLastStep={isLastStep}
        />

        <div className={styles.cancelSection}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.btnText}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
