import { useFormikContext } from "formik";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "../../../styles/RestaurantOnboardingModal.module.css";
import { FormSection } from "../index";
import { SUPPORTED_COUNTRIES } from "../../../../../config/countries";

// Country Selection Step
export function CountryStep() {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  const handleCountrySelect = (countryName) => {
    setFieldValue("country", countryName);
  };

  return (
    <FormSection title="">
      <div className={styles.countrySelection}>
        <p className={styles.countrySubtitle}>
          Select the country where your restaurant is located
        </p>

        <div className={styles.countryGrid}>
          {SUPPORTED_COUNTRIES.map((country) => (
            <div
              key={country.code}
              className={`${styles.countryCard} ${
                values.country === country.name
                  ? styles.countryCardSelected
                  : ""
              }`}
              onClick={() => handleCountrySelect(country.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCountrySelect(country.name);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={values.country === country.name}
              aria-label={`Select ${country.name} as your country`}
            >
              <div className={styles.countryFlag}>
                <Image
                  src={country.flag}
                  alt={`${country.name} flag`}
                  width={60}
                  height={40}
                  className={styles.flagImage}
                />
              </div>
              <div className={styles.countryName}>{country.name}</div>
            </div>
          ))}
        </div>

        {/* Show validation error for country field */}
        {touched.country && errors.country && (
          <div className={styles.error}>{errors.country}</div>
        )}
      </div>
    </FormSection>
  );
}

CountryStep.propTypes = {
  firstRef: PropTypes.object,
};
