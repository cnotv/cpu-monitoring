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

/**
 * Parse CPU value and define stats, including all the logs and alert statuses
 * @param value 
 * @param param1 
 * @param param2 
 * @returns 
 */
 export const getCpuStats = (
  value: number,
  { cpu, heavy, recovered }: CpuLogs,
  { logSize, thresholdValue, thresholdSize }: CpuConfig
): CpuStats => {
  let isHeavy = false;
  let isRecovered = false;
  const newLog = { value, time: new Date().toLocaleString() };
  cpu = getNewLogs(cpu, newLog, logSize);

  const higher = value > thresholdValue;
  // Analyze the latest logs, defined in amount of logs through time computation
  const latestLogs = cpu.slice(0, thresholdSize);

  // Avoid multiple computation
  if (higher) {
    const isHeavyActive = latestLogs.every(log => log.value > thresholdValue);
    if (isHeavyActive) {
      heavy = [...heavy, newLog]
      isHeavy = true;
    }
  } else {
    const isRecoveredActive = latestLogs.every(log => log.value < thresholdValue);
    // Set it recovered, only if it has been an heavy load
    if (isRecoveredActive && heavy.length) {
      recovered = [...recovered, newLog]
      isRecovered = true;
    }
  }

  return {
    current: value,
    logs: {
      cpu,
      heavy,
      recovered,
    },
    isHeavy,
    isRecovered
  } as CpuStats
}
