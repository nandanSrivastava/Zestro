import { useFormikContext } from "formik";
import styles from "../../../styles/RestaurantOnboardingModal.module.css";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../../../../../utils/restaurantOnboardingData";
import { InputField, FormSection } from "../index";

// Owner Information Step
export function OwnerStep() {
  const { values } = useFormikContext();
  const selectedCountry = values.country;

  return (
    <FormSection title="">
      <div className={styles.fieldGrid}>
        <InputField
          name="ownerName"
          label={FORM_LABELS.ownerName}
          placeholder={FORM_PLACEHOLDERS.ownerName}
          required
        />
        <InputField
          name="email"
          label={FORM_LABELS.email}
          placeholder={FORM_PLACEHOLDERS.email}
          type="email"
          inputMode="email"
          required
        />
      </div>
      <InputField
        name="phone"
        label={FORM_LABELS.phone}
        placeholder={FORM_PLACEHOLDERS.phone}
        type="tel"
        inputMode="tel"
        required
      />

      {/* Conditional tax fields based on country */}
      {selectedCountry === "India" && (
        <InputField
          name="gstin"
          label="GSTIN"
          placeholder="Enter GSTIN number (optional)"
        />
      )}

      {selectedCountry === "Nepal" && (
        <InputField
          name="vat"
          label="VAT Number"
          placeholder="Enter VAT number (optional)"
        />
      )}
    </FormSection>
  );
}
