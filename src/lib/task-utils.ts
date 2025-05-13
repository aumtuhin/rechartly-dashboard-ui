
import { cn } from "@/lib/utils";

/**
 * Returns the Fibonacci sequence commonly used for story points
 */
export const getStoryPointsOptions = (): number[] => {
  return [1, 2, 3, 5, 8, 13];
};

/**
 * Converts story points to a visual representation with proper styling
 */
export const getStoryPointsBadgeClass = (points: number | undefined): string => {
  if (!points) return "bg-gray-100 text-gray-500";
  
  if (points <= 3) return "bg-green-100 text-green-800";
  if (points <= 8) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};
