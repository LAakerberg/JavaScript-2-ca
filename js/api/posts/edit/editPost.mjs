const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const editPostForm = document.querySelector(`#edit-post`);

/* import { authFetch } from '../../auth/authFetch.mjs'; */
// import { uniquePost } from './details.mjs';

import { API_SOCIAL_URL } from '../../auth/apiBase.mjs';
import { authFetch } from '../../auth/authFetch.mjs';
import { headers } from '../../auth/authFetch.mjs';
import { redirect } from '../../../function.mjs';

const method = 'GET';

/**
 * This function will call the unique post with ID
 * and will add the value from the response in to the form so the user
 * can be able to update the post with new information.
 * @param {*} url Inserts the API link
 */
export async function getUniquePost(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await response.json();
    const getPost = json;

    // Collect the existing information and add it to the form
    editPostForm.title.value = getPost.title;
    editPostForm.body.value = getPost.body;
    editPostForm.tags.value = getPost.tags;
    editPostForm.media.value = getPost.media;

    const updateCreatedPost = {
      title: editPostForm.title.value,
      body: editPostForm.body.value,
      tags: [`${editPostForm.tags.value}`],
      media: editPostForm.media.value,
    };

    console.log();

    updateValue(updateCreatedPost);
  } catch {}
}

getUniquePost(API_SOCIAL_URL + id);

/**
 * This is addEventListener will update the post when the Update button is clicked.
 */
editPostForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const editCreatedPost = {
    title: subjectEditPost.value,
    body: descriptionEditPost.value,
    tags: [`${tagsEditPost.value}`],
    media: mediaEditPost.value,
  };

  /**
   * This will send the new information from the update form when the user
   * is updating the post with new values
   * @param {*} API_SOCIAL_URL insert the API link
   * @returns The new values in the form will be updated
   */
  async function updateValue(API_SOCIAL_URL) {
    try {
      const myAccessToken = localStorage.getItem('myAccessToken');
      const postData = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myAccessToken}`,
        },
        body: JSON.stringify(editCreatedPost),
      };
      const response = await authFetch(API_SOCIAL_URL, postData);
      const json = await response.json();
      console.log(response);
      console.log(json);
      if (response.ok == true) {
        redirect(response);
      } else {
        alert('An error have occurred, try again');
      }
      return json;
    } catch (error) {
      console.log(error);
      alert('An error have occurred, try again');
    }
  }

  updateValue(`${API_SOCIAL_URL}` + id);
});
