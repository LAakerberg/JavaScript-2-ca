/**
 * This will save the accessToken to the localStorage.
 * The token is used to access information on the site and be able to create/update/delete posts.
 * @param {*} key the key of access token
 * @param {*} value the value of the access token
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * This will load the accessToken when a function need it.
 * @param {string} key the key of the accessToken
 * @returns
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}
/**
 * This will remove the token from the localStorage
 * @param {*} key the key of the accessToken
 */
export function remove(key) {
  localStorage.removeItem(key);
}
