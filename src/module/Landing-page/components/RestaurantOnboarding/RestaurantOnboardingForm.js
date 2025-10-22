import styles from "../../styles/RestaurantOnboardingModal.module.css";
import {
  CUISINE_TYPES,
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  SEATING_CAPACITY_LIMITS,
} from "../../../../utils/restaurantOnboardingData";
import {
  InputField,
  SelectField,
  TextareaField,
  TimeInputField,
  CheckboxField,
  FileUploadField,
  FormSection,
  ActionRow,
} from "./index";

/**
 * Restaurant Onboarding Form Component
 * Contains all form sections and fields for restaurant onboarding
 */
export function RestaurantOnboardingForm({
  onSubmit,
  onCancel,
  loading,
  error,
  firstRef,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormSection title="Restaurant Information">
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
          <FileUploadField
            name="logo"
            label="Restaurant logo"
            accept="image/*"
          />
        </div>
        <TextareaField
          name="description"
          label={FORM_LABELS.description}
          placeholder={FORM_PLACEHOLDERS.description}
          rows={3}
        />
      </FormSection>

      <FormSection title="Location Details">
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

      <FormSection title="Owner Information">
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
      </FormSection>

      {/* Operating Details removed per request */}

      {error && <div className={styles.error}>{error}</div>}

      <ActionRow onCancel={onCancel} loading={loading} />
    </form>
  );
}
