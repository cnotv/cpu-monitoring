import { getCpu } from "./Api";

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
