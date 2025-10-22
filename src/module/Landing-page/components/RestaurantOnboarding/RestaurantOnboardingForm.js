import { useRef } from "react";
import { Formik } from "formik";
import {
  FORMIK_INITIAL_VALUES,
  getValidationSchema,
} from "../../../../utils/restaurantOnboardingData";
import { MultiStepForm } from "./MultiStepForm";

export function RestaurantOnboardingForm({
  onSubmit,
  onCancel,
  loading,
  error,
}) {
  const firstFieldRef = useRef(null);

  return (
    <Formik
      initialValues={FORMIK_INITIAL_VALUES}
      validationSchema={getValidationSchema()}
      onSubmit={onSubmit}
    >
      <MultiStepForm
        onCancel={onCancel}
        loading={loading}
        error={error}
        firstRef={firstFieldRef}
        onSubmitStep={onSubmit}
      />
    </Formik>
  );
}
