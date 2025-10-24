import { useRef } from "react";
import { MultiStepForm } from "./MultiStepForm";

export function RestaurantOnboardingForm({
  onSubmit,
  onCancel,
  loading,
  error,
}) {
  const firstFieldRef = useRef(null);

  return (
    <MultiStepForm
      onCancel={onCancel}
      loading={loading}
      error={error}
      firstRef={firstFieldRef}
      onSubmitStep={onSubmit}
    />
  );
}
