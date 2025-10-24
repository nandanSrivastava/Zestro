import React, { memo } from "react";
import styles from "../../styles/RestaurantOnboardingModal.module.css";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";

/**
 * Reusable input field component for restaurant onboarding form
 */
export const InputField = memo(function InputField({
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
});

/**
 * Reusable select field component for restaurant onboarding form
 */
export const SelectField = memo(function SelectField({
  name,
  label,
  options,
  required = false,
}) {
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
});

/**
 * Reusable textarea field component for restaurant onboarding form
 */
export const TextareaField = memo(function TextareaField({
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
});

/**
 * Reusable time input field component for restaurant onboarding form
 */
// Special: support nested field names like 'operatingHours.from'
export const TimeInputField = memo(function TimeInputField({
  name,
  label,
  required = false,
}) {
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
});

/**
 * Reusable checkbox field component for restaurant onboarding form
 */
export const CheckboxField = memo(function CheckboxField({ name, label }) {
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
});

/**
 * File upload field (supports image preview). Stores File object in Formik state.
 */
export const FileUploadField = memo(function FileUploadField({
  name,
  label,
  accept = "image/*",
}) {
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
});

// PropTypes for all form field components
InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  inputRef: PropTypes.object,
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};

TextareaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  required: PropTypes.bool,
};

TimeInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

FileUploadField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  accept: PropTypes.string,
};
