/**
 * Retrieve CPU from the endpoint
 * @returns 
 */
export const getCpu = async (): Promise<number> => {
  const url = `/api/cpu`;

  return fetch(url)
    .then(response => response.json().then(({ average }) => average))
    .catch(() => 0);
}
