import styles from "../../../styles/RestaurantOnboardingModal.module.css";

// Step Navigation Component
export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  loading,
  isLastStep,
}) {
  return (
    <div className={styles.stepNavigation}>
      <div className={styles.stepButtons}>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={onPrev}
            className={styles.btnOutline}
            disabled={loading}
          >
            Previous
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className={styles.btnPrimary}
          disabled={loading}
        >
          {loading
            ? isLastStep
              ? "Submitting..."
              : "Saving..."
            : isLastStep
            ? "Submit Application"
            : "Save & Next"}
        </button>
      </div>
    </div>
  );
}
