import { useFormikContext } from "formik";
import styles from "../../../styles/RestaurantOnboardingModal.module.css";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../../../../../utils/restaurantOnboardingData";
import { InputField, SelectField, TextareaField, FormSection } from "../index";

// Location Details Step
export function LocationStep() {
  const { values } = useFormikContext();

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
          required
        />
      </div>
      <div className={styles.fieldGrid}>
        <InputField
          name="postalCode"
          label={FORM_LABELS.postalCode}
          placeholder={FORM_PLACEHOLDERS.postalCode}
          required
        />
        {/* Country field - auto-filled from first step and read-only */}
        <div className={styles.label}>
          <span className={styles.labelText}>{FORM_LABELS.country}</span>
          <input
            name="country"
            value={values.country || ""}
            readOnly
            className={`${styles.input} ${styles.readOnlyInput}`}
            style={{ backgroundColor: "#f9fafb", cursor: "not-allowed" }}
          />
        </div>
      </div>
    </FormSection>
  );
}
