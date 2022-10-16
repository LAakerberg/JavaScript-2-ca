const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

import { API_SOCIAL_URL } from '../auth/apiBase.mjs';
import { authFetch } from '../auth/authFetch.mjs';

const method = 'delete';

/**
 * This function will delete the unique post by ID.
 * The ID is collected by the request.
 * @param {number} id
 * @returns When the delete button is clicked the page will be reloading.
 */
export async function deletePost(id) {
  try {
    //
    const deleteUrl = `${API_SOCIAL_URL}` + id;
    const response = await authFetch(deleteUrl, {
      method,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
