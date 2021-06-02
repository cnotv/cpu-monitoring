/**
 * Calculate size of the log based on the amount of entries for a definite time
 */

export const cpuCheckInterval = 10; // seconds
export const cpuHistoryLength = 10; // minutes
export const cpuConsideredLength = 2; // minutes
export const cpuLogSize = cpuHistoryLength * 60 / cpuCheckInterval; // (60 logs)
export const cpuThresholdSize = cpuConsideredLength * 60 / cpuCheckInterval; // (12 logs)
export const cpuThresholdValue = 1;

export const cpuConfig: CpuConfig = {
  logSize: cpuLogSize,
  thresholdSize: cpuThresholdSize,
  thresholdValue: cpuThresholdValue,
}

/**
 * Return a new log based on log value and new retrieved value
 * (it's basically an immutable splice which you can get from other libraries)
 * @param logs
 * @param newLog 
 * @returns 
 */
export function getNewLogs<T>(logs: T[], newLog: T, delimiter: number): T[] {
  if (delimiter === 0) {
    return []
  }

  return [
    newLog,
    ...logs.slice(0, delimiter - 1),
  ]
}