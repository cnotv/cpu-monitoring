import { cpuLogSize, cpuThresholdTime, cpuThresholdValue, getNewLogs } from "./Cpu";

export const initCpuStats: CpuStats = {
  current: 0,
  logs: {
    cpu: Array(cpuLogSize).fill({}), // Initialize log for visual purposes
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

export const getCpuStats = async ({ cpu, heavy, recovered }: CpuLogs): Promise<CpuStats> => {
  return getCpu().then(
    value => {
      let isHeavy;
      let isRecovered;
      const newLog = { value, time: new Date().toLocaleString() };
      cpu = getNewLogs(cpu, newLog, cpuLogSize);

      const higher = value > cpuThresholdValue;
      const latestLogs = cpu.slice(0, cpuThresholdTime);

      if (higher) {
        isRecovered = false;
        const isHeavyActive = latestLogs.every(log => log.value > cpuThresholdValue);
        if (isHeavyActive) {
          heavy = [...heavy, newLog]
          isHeavy = true;
        }
      } else {
        isHeavy = false;
        const isRecoveredActive = latestLogs.every(log => log.value < cpuThresholdValue);
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
  );
}