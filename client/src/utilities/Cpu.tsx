/**
 * Calculate size of the log based on the amount of entries for a definite time
 */

export const cpuCheckInterval = 10; // seconds
export const cpuHistoryLength = 10; // minutes
export const cpuConsideredLength = 2; // minutes
export const cpuLogSize = cpuHistoryLength * 60 / cpuCheckInterval;
export const cpuThreshold = cpuConsideredLength * 60 / cpuCheckInterval;

/**
 * Return a new log based on log value and new retrieved value
 * (it's basically an immutable splice which you can get from other libraries)
 * @param log 
 * @param value 
 * @returns 
 */
export function getNewLogs<T>(log: T[], value: T, delimiter: number): T[] {
  if (delimiter === 0) {
    return []
  };

  return [
    value,
    ...log.slice(0, delimiter -1),
  ]
}