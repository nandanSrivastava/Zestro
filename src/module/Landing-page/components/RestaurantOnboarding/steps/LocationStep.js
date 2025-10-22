import styles from "../../../styles/RestaurantOnboardingModal.module.css";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../../../../../utils/restaurantOnboardingData";
import { InputField, TextareaField, FormSection } from "../index";

// Location Details Step
export function LocationStep() {
  return (
    <FormSection title="">
      <TextareaField
        name="address"
        label={FORM_LABELS.address}
        placeholder={FORM_PLACEHOLDERS.address}
        rows={2}
        required
      />
      <div className={styles.fieldGrid}>
        <InputField
          name="city"
          label={FORM_LABELS.city}
          placeholder={FORM_PLACEHOLDERS.city}
          required
        />
        <InputField
          name="state"
          label={FORM_LABELS.state}
          placeholder={FORM_PLACEHOLDERS.state}
        />
      </div>
      <div className={styles.fieldGrid}>
        <InputField
          name="postalCode"
          label={FORM_LABELS.postalCode}
          placeholder={FORM_PLACEHOLDERS.postalCode}
          required
        />
        <InputField
          name="country"
          label={FORM_LABELS.country}
          placeholder={FORM_PLACEHOLDERS.country}
        />
      </div>
    </FormSection>
  );
}
