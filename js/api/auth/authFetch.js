import { load } from '../storage/index.mjs';

export function headers() {
  const accessToken = localStorage.getItem('myAccessToken');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function authFetch(url, option) {
  return fetch(url, {
    ...option,
    headers: headers(),
  });
}
