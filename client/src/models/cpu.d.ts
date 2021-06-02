interface CpuLogs {
  cpu: ChartValues[];
  heavy: ChartValues[];
  recovered: ChartValues[];
}

interface CpuStats {
  current: number;
  logs: CpuLogs,
  isHeavy: boolean;
  isRecovered: boolean;
}

