import styles from "../../../styles/RestaurantOnboardingModal.module.css";

// Step Progress Indicator
export function StepIndicator({ currentStep, steps }) {
  return (
    <div className={styles.stepIndicator}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`${styles.stepItem} ${
            index === currentStep ? styles.stepActive : ""
          } ${index < currentStep ? styles.stepCompleted : ""}`}
        >
          <div className={styles.stepNumber}>{index + 1}</div>
          <div className={styles.stepTitle}>{step.title}</div>
        </div>
      ))}
    </div>
  );
}
