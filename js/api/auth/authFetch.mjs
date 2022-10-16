import { load } from '../storage/index.mjs';

/**
 * This function will send the correct headers with accessToken to through the API
 * @returns
 */
export function headers() {
  const token = load('token');
  //const accessToken = localStorage.getItem('myAccessToken');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

/**
 * This async function is made for the API call an is used on all most all
 * API calls on this site. This will alls call the headers();
 * @param {*} url Set's in the API link
 * @param {*} option What ever else that's is add will be sorted
 * @returns
 */
export async function authFetch(url, option) {
  return fetch(url, {
    ...option,
    headers: headers(),
  });
}
