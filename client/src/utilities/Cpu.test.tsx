import { getNewLogs } from "./Cpu"

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
