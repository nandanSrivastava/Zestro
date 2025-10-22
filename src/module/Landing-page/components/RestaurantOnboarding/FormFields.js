import styles from "../../styles/RestaurantOnboardingModal.module.css";
import { useField, useFormikContext } from "formik";

/**
 * Reusable input field component for restaurant onboarding form
 */
export function InputField({
  name,
  label,
  placeholder,
  type = "text",
  inputMode,
  inputRef,
  required = false,
  min,
  max,
}) {
  const [field, meta] = useField(name);
  return (
    <label className={styles.label} htmlFor={name}>
      <span className={styles.labelText}>
        {label} {required && <span className={styles.required}>*</span>}
      </span>
      <input
        id={name}
        ref={inputRef}
        {...field}
        type={type}
        className={styles.input}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-label={label}
        required={required}
        min={min}
        max={max}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </label>
  );
}

/**
 * Reusable select field component for restaurant onboarding form
 */
export function SelectField({ name, label, options, required = false }) {
  const [field, meta, helpers] = useField(name);
  return (
    <label className={styles.label} htmlFor={name}>
      <span className={styles.labelText}>
        {label} {required && <span className={styles.required}>*</span>}
      </span>
      <select
        id={name}
        {...field}
        className={styles.select}
        onChange={(e) => helpers.setValue(e.target.value)}
        required={required}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </label>
  );
}

/**
 * Reusable textarea field component for restaurant onboarding form
 */
export function TextareaField({
  name,
  label,
  placeholder,
  rows = 3,
  required = false,
}) {
  const [field, meta] = useField(name);
  return (
    <label className={styles.label} htmlFor={name}>
      <span className={styles.labelText}>
        {label} {required && <span className={styles.required}>*</span>}
      </span>
      <textarea
        id={name}
        {...field}
        className={styles.textarea}
        placeholder={placeholder}
        rows={rows}
        aria-label={label}
        required={required}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </label>
  );
}

/**
 * Reusable time input field component for restaurant onboarding form
 */
// Special: support nested field names like 'operatingHours.from'
export function TimeInputField({ name, label, required = false }) {
  const [field, meta] = useField(name);
  return (
    <label className={styles.label} htmlFor={name}>
      <span className={styles.labelText}>
        {label} {required && <span className={styles.required}>*</span>}
      </span>
      <input
        id={name}
        {...field}
        type="time"
        className={styles.input}
        required={required}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </label>
  );
}

/**
 * Reusable checkbox field component for restaurant onboarding form
 */
export function CheckboxField({ name, label }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name, type: "checkbox" });
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        {...field}
        onChange={(e) => setFieldValue(name, e.target.checked)}
        className={styles.checkbox}
      />
      <span>{label}</span>
    </label>
  );
}

/**
 * File upload field (supports image preview). Stores File object in Formik state.
 */
export function FileUploadField({ name, label, accept = "image/*" }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFieldValue(name, file || null);
  };

  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className={styles.input}
      />
      {field.value && typeof field.value === "object" && field.value.name ? (
        <div className={styles.fileInfo}>{field.value.name}</div>
      ) : null}
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </label>
  );
}
