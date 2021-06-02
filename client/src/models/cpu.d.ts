interface CpuLogs {
  cpu: ChartValues[];
  heavy: ChartValues[];
  recovered: ChartValues[];
}

interface CpuConfig {
  logSize: number;
  thresholdSize: number;
  thresholdValue: number;
}

interface CpuStats {
  current: number;
  logs: CpuLogs;
  isHeavy: boolean;
  isRecovered: boolean;
}
