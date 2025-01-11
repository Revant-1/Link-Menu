// src/lib/utils.ts

// Import required libraries
import { clsx } from "clsx"; // For conditional class merging
import { twMerge } from "tailwind-merge"; // For Tailwind CSS conflict resolution

/**
 * Combines class names intelligently, handling conflicts for Tailwind CSS.
 * 
 * @param inputs - Array of class names or conditional class objects
 * @returns A single merged class name string
 */
export function cn(...inputs: Array<string | undefined | null | boolean | Record<string, boolean>>) {
  return twMerge(clsx(inputs));
}
