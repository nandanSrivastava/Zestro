import { useCallback, useEffect, useRef, useState } from "react";
import {
  INITIAL_FORM_STATE,
  toApiPayload,
} from "../../../utils/restaurantOnboardingData";

import useQuery from "../../../services/useQuery";

/**
 * Custom hook for managing restaurant onboarding form state and logic
 */
export function useRestaurantOnboarding() {
  const { data, error, isLoading } = useQuery();
}
