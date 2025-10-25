import { CountryStep } from "./CountryStep";
import { BasicInformationStep } from "./BasicInformationStep";
import { LocationStep } from "./LocationStep";
import { OwnerStep } from "./OwnerStep";
import { Basic } from "next/font/google";

// Define the form steps configuration
export const FORM_STEPS = [
  {
    id: "country",
    title: "Choose Country",
    component: CountryStep,
  },
  {
    id: "restaurant",
    title: "Basic Information",
    component: BasicInformationStep,
  },
  {
    id: "location",
    title: "Location Details",
    component: LocationStep,
  },
  {
    id: "owner",
    title: "Owner Information",
    component: OwnerStep,
  },
];

// Step field validation mapping
export const STEP_FIELDS = {
  country: ["country"],
  restaurant: [
    "restaurantName",
    "website",
    "logo",
    "description",
    "gstin",
    "vat",
  ],
  location: ["address", "city", "state", "postalCode"],
  owner: ["ownerName", "email", "phone"],
};
