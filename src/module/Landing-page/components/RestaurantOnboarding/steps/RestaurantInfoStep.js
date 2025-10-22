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
  return (
    <FormSection title="">
      <div className={styles.fieldGrid}>
        <InputField
          name="restaurantName"
          label={FORM_LABELS.restaurantName}
          placeholder={FORM_PLACEHOLDERS.restaurantName}
          inputRef={firstRef}
          required
        />
        <InputField
          name="website"
          label={FORM_LABELS.website}
          placeholder={FORM_PLACEHOLDERS.website}
          type="url"
        />
      </div>
      <div className={styles.fieldGrid}>
        <FileUploadField name="logo" label="Restaurant logo" accept="image/*" />
      </div>
      <TextareaField
        name="description"
        label={FORM_LABELS.description}
        placeholder={FORM_PLACEHOLDERS.description}
        rows={3}
      />
    </FormSection>
  );
}
