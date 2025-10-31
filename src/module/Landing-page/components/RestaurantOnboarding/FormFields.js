import { memo } from "react";
import styles from "../../styles/RestaurantOnboardingModal.module.css";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";

// Custom hook for field state
const useFieldState = (name, type) => {
  const [field, meta] = useField(type ? { name, type } : name);
  return {
    field,
    meta,
    hasError: meta.touched && meta.error,
    error: meta.error,
  };
};

// Common field wrapper component
const FieldWrapper = ({ name, label, required, children, error }) => (
  <label className={styles.label} htmlFor={name}>
    <span className={styles.labelText}>
      {label} {required && <span className={styles.required}>*</span>}
    </span>
    {children}
    {error && <div className={styles.error}>{error}</div>}
  </label>
);

// Base field component factory
const createField = (Component, defaultProps = {}) =>
  memo((props) => {
    const { field, hasError, error } = useFieldState(props.name);
    const {
      name,
      label,
      required = false,
      ...rest
    } = { ...defaultProps, ...props };

    return (
      <FieldWrapper
        name={name}
        label={label}
        required={required}
        error={hasError && error}
      >
        <Component field={field} name={name} required={required} {...rest} />
      </FieldWrapper>
    );
  });

// Individual field components
const Input = ({
  field,
  name,
  type = "text",
  placeholder,
  inputMode,
  inputRef,
  required,
  min,
  max,
}) => (
  <input
    id={name}
    ref={inputRef}
    {...field}
    type={type}
    className={styles.input}
    placeholder={placeholder}
    inputMode={inputMode}
    aria-label={name}
    required={required}
    min={min}
    max={max}
  />
);

const Textarea = ({ field, name, placeholder, rows = 3, required }) => (
  <textarea
    id={name}
    {...field}
    className={styles.textarea}
    placeholder={placeholder}
    rows={rows}
    required={required}
  />
);

const FileInput = ({ name, accept = "image/*" }) => {
  const { setFieldValue } = useFormikContext();
  const { field } = useFieldState(name);

  return (
    <>
      <input
        type="file"
        accept={accept}
        onChange={(e) => setFieldValue(name, e.target.files?.[0] || null)}
        className={styles.input}
      />
      {field.value?.name && (
        <div className={styles.fileInfo}>{field.value.name}</div>
      )}
    </>
  );
};

// Exported field components
export const InputField = createField(Input);
export const TextareaField = createField(Textarea);
export const FileUploadField = createField(FileInput);

// PropTypes
const baseProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
const fieldProps = { ...baseProps, required: PropTypes.bool };

FieldWrapper.propTypes = {
  ...fieldProps,
  children: PropTypes.node,
  error: PropTypes.string,
};
InputField.propTypes = {
  ...fieldProps,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  inputRef: PropTypes.object,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
TextareaField.propTypes = {
  ...fieldProps,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};
FileUploadField.propTypes = { ...baseProps, accept: PropTypes.string };
