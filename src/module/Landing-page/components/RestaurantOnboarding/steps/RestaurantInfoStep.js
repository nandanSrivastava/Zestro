import { useFormikContext } from "formik";
import styles from "../../../styles/RestaurantOnboardingModal.module.css";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../../../../../utils/restaurantOnboardingData";
import {
  InputField,
  TextareaField,
  FileUploadField,
  FormSection,
} from "../index";

// Restaurant Information Step
export function RestaurantInfoStep({ firstRef }) {
  const { values } = useFormikContext();
  const selectedCountry = values.country;

  return (
    <FormSection title="">
      {/* Restaurant Name - Full width on big screens */}
      <div className={styles.fieldGridSingle}>
        <InputField
          name="restaurantName"
          label={FORM_LABELS.restaurantName}
          placeholder={FORM_PLACEHOLDERS.restaurantName}
          inputRef={firstRef}
          required
        />
      </div>
      {/* Website and Logo - Same line on big screens */}
      <div className={styles.fieldGrid}>
        <InputField
          name="website"
          label={FORM_LABELS.website}
          placeholder={FORM_PLACEHOLDERS.website}
          type="url"
        />
        <FileUploadField name="logo" label="Restaurant logo" accept="image/*" />
      </div>

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

      <TextareaField
        name="description"
        label={FORM_LABELS.description}
        placeholder={FORM_PLACEHOLDERS.description}
        rows={3}
      />
    </FormSection>
  );
}
