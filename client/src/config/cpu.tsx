/**
 * Calculate size of the log based on the amount of entries for a definite time
 */

export const cpuCheckInterval = 10; // seconds
export const cpuHistoryLength = 10; // minutes
export const cpuConsideredLength = 2; // minutes
export const cpuThresholdValue = 1;

// Compute log sizes, based on time computation
export const cpuConfig: CpuConfig = {
  logSize: cpuHistoryLength * 60 / cpuCheckInterval, // (60 logs)
  thresholdSize: cpuConsideredLength * 60 / cpuCheckInterval, // (12 logs)
  thresholdValue: cpuThresholdValue,
}

/**
 * Initialize CPU stat for rendering purpose
 */
export const initCpuStats: CpuStats = {
  current: 0,
  logs: {
    cpu: Array(cpuConfig.logSize).fill({}), // Initialize log, exclusively for visual purposes
    heavy: [],
    recovered: [],
  },
  isHeavy: false,
  isRecovered: false
}
