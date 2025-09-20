/**
 * TypeScript type definitions for the Zestro application
 * This file contains shared types and interfaces used throughout the app
 */

// Waitlist related types
export interface WaitlistEntry {
  id?: string;
  email: string;
  name?: string;
  createdAt?: Date;
  position?: number;
  status?: 'pending' | 'confirmed' | 'invited';
}

export interface WaitlistSubmission {
  email: string;
  name?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  position?: number;
  totalCount?: number;
}

// Component props types
export interface CountdownProps {
  targetDate: Date | string;
  onComplete?: () => void;
  autoStart?: boolean;
  className?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

// Form related types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface FormValidationRule {
  required?: boolean;
  requiredMessage?: string;
  validator?: (value: any) => boolean;
  message?: string;
}

export interface FormValidationRules {
  [fieldName: string]: FormValidationRule;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: { [fieldName: string]: string };
}

// API related types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  status: number;
  statusText: string;
  message: string;
  data?: any;
}

// Pricing related types
export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  description?: string;
}

// Feature related types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

// Utility types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;