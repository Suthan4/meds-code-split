import { lazy } from 'react';

// Lazy load heavy components
export const LazyPatientDashboard = lazy(() => import('./PatientDashboard'));
export const LazyCaretakerDashboard = lazy(() => import('./CaretakerDashboard'));
export const LazyAuthentication = lazy(() => import('../features/auth/components/Authentication'));
export const LazyOnboarding = lazy(() => import('./Onboarding'));
export const LazyMedicationForm = lazy(() => import('./MedicationForm'));
export const LazyAdherenceStats = lazy(() => import('./AdherenceStats'));
export const LazyNotificationSettings = lazy(() => import('./NotificationSettings'));