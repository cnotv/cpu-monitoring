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
  it('should set recovered false, if latest value is high', async () => {
    const logs = {
      cpu: [],
      heavy: [],
      recovered: [],
    } as CpuLogs;

    const { isRecovered } = await getCpuStats(logs);

    expect(isRecovered).toBe(false);
  })

  it('should set high load false, if latest value is low', async () => {
    const logs = {
      cpu: [],
      heavy: [],
      recovered: [],
    } as CpuLogs;

    const { isHeavy } = await getCpuStats(logs);

    expect(isHeavy).toBe(false);
  })

  it('should alert for recovered and log, if passed the threshold', async () => {
    const logs = {
      cpu: [],
      heavy: [],
      recovered: [],
    } as CpuLogs;

    const { isRecovered } = await getCpuStats(logs);

    expect(isRecovered).toBe(true);
  })

  it('should alert for high alert and log, if passed the threshold', async () => {
    const logs = {
      cpu: [],
      heavy: [],
      recovered: [],
    } as CpuLogs;

    const { isHeavy } = await getCpuStats(logs);

    expect(isHeavy).toBe(true);
  })
})