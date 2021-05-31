export const getCpu = async (): Promise<number> => {
  const url = 'http://localhost:3002/api/cpu'

  return fetch(url)
    .then(response => response.json().then(({ average }) => average))
    .catch(() => 0);
}