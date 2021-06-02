import { cpuConfig, cpuLogSize, getNewLogs } from "./Cpu";

export const initCpuStats: CpuStats = {
  current: 0,
  logs: {
    cpu: Array(cpuLogSize).fill({}), // Initialize log, exclusively for visual purposes
    heavy: [],
    recovered: [],
  },
  isHeavy: false,
  isRecovered: false
}

export const getCpu = async (): Promise<number> => {
  const url = `/api/cpu`;

  return fetch(url)
    .then(response => response.json().then(({ average }) => average))
    .catch(() => 0);
}

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
  const latestLogs = cpu.slice(0, thresholdSize);

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
