interface LogStats {
  current: number;
  cpuData: ChartValues[];
  heavyLog: ChartValues[];
  recoveredLog: ChartValues[];
  isHeavy: boolean;
  isRecovered: boolean;
}