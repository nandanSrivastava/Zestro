import { useFormikContext } from "formik";
import PropTypes from "prop-types";
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
import { getCountryByName } from "../../../../../config/countries";

// Restaurant Information Step
export function RestaurantInfoStep({ firstRef }) {
  const { values } = useFormikContext();
  const selectedCountry = values.country;
  const countryConfig = getCountryByName(selectedCountry);

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
      {countryConfig && countryConfig.taxField && (
        <InputField
          name={countryConfig.taxField}
          label={countryConfig.taxFieldLabel}
          placeholder={countryConfig.taxFieldPlaceholder}
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

RestaurantInfoStep.propTypes = {
  firstRef: PropTypes.object,
};
