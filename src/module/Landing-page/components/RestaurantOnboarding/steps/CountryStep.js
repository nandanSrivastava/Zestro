import { useFormikContext } from "formik";
import Image from "next/image";
import styles from "../../../styles/RestaurantOnboardingModal.module.css";
import { FormSection } from "../index";

// Country Selection Step
export function CountryStep() {
  const { values, setFieldValue } = useFormikContext();

  const countries = [
    {
      code: "IN",
      name: "India",
      flag: "/images/india.png",
    },
    {
      code: "NP",
      name: "Nepal",
      flag: "/images/nepal.png",
    },
  ];

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
          {countries.map((country) => (
            <div
              key={country.code}
              className={`${styles.countryCard} ${
                values.country === country.name
                  ? styles.countryCardSelected
                  : ""
              }`}
              onClick={() => handleCountrySelect(country.name)}
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
      </div>
    </FormSection>
  );
}
