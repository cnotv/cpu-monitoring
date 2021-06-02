import { getCpu, getCpuStats } from "./Api";

describe('FX: getCpu', () => {
  it('should return the average number', async () => {
    const expectation = 0;
    const mockSuccessResponse = {
      average: expectation
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    }) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const result = await getCpu();

    expect(result).toEqual(expectation)
  })
})

describe('FX: updateDashboard', () => {
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