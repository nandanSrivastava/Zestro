import { RestaurantInfoStep } from "./RestaurantInfoStep";
import { LocationStep } from "./LocationStep";
import { OwnerStep } from "./OwnerStep";

// Define the form steps configuration
export const FORM_STEPS = [
  {
    id: "restaurant",
    title: "Basic Information",
    component: RestaurantInfoStep,
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
  restaurant: ["restaurantName", "website", "logo", "description"],
  location: ["address", "city", "state", "postalCode", "country"],
  owner: ["ownerName", "email", "phone"],
};
