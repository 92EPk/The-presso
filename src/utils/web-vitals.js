'use client'; // Marks this as a Client Component in Next.js
import { useReportWebVitals } from 'next/web-vitals'; // Import the useReportWebVitals hook from Next.js

// WebVitals component to log performance metrics
export function WebVitals() {
  // Use the useReportWebVitals hook to capture and log web vitals metrics
  useReportWebVitals((metric) => {
    console.log(metric); // Log the metric to the console
  });
}