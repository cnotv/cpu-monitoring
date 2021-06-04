import { getCpuStats, getNewLogs } from "./Cpu"

describe('FX: getNewLogs', () => {
  it(`should return a list with defined entries`, () => {
    const list = [1];
    const value = 2

    const result = getNewLogs(list, value, 2);

    expect(result.length).toBe(2)
  })

  it(`should remove exceeding entries`, () => {
    const list = [1, 2];
    const value = 2

    const result = getNewLogs(list, value, 2);

    expect(result.length).toBe(2)
  })

  it(`should return an empty list if delimiter is 0`, () => {
    const list = [1, 2, 3];
    const value = 1
    const delimiter = 0;

    const result = getNewLogs(list, value, delimiter);

    expect(result.length).toBe(delimiter)
  })
})

describe('FX: getCpuStats', () => {
  it('should set recovered false, if latest value is high', () => {
    const logs = {
      cpu: [],
      heavy: [],
      recovered: [],
    } as CpuLogs;
    const config: CpuConfig = {
      logSize: 1,
      thresholdSize: 1,
      thresholdValue: 0,
    }
    const value = 1;

    const { isRecovered } = getCpuStats(value, logs, config);

    expect(isRecovered).toBe(false);
  })

  it('should set high load false, if latest value is low', () => {
    const logs = {
      cpu: [],
      heavy: [],
      recovered: [],
    } as CpuLogs;
    const config: CpuConfig = {
      logSize: 1,
      thresholdSize: 1,
      thresholdValue: 1,
    }
    const value = 0;

    const { isHeavy } = getCpuStats(value, logs, config);

    expect(isHeavy).toBe(false);
  })

  it('should alert for recovered and log, if passed the threshold from overloaded', () => {
    const logs = {
      cpu: [],
      heavy: [{ value: 0, time: '123123' }],
      recovered: [],
    } as CpuLogs;
    const config: CpuConfig = {
      logSize: 1,
      thresholdSize: 1,
      thresholdValue: 1,
    }
    const value = 0;

    const { isRecovered, logs: { recovered } } = getCpuStats(value, logs, config);

    expect(isRecovered).toBe(true);
  expect(recovered.length).toBe(1);
  })

  it('should alert for high load and log, if passed the threshold', () => {
    const logs = {
      cpu: [],
      heavy: [],
      recovered: [],
    } as CpuLogs;
    const config: CpuConfig = {
      logSize: 1,
      thresholdSize: 1,
      thresholdValue: 0,
    }
    const value = 1;

    const { isHeavy, logs: { heavy } } = getCpuStats(value, logs, config);

    expect(isHeavy).toBe(true);
    expect(heavy.length).toBe(1);
  })
})