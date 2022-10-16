const subjectPost = document.querySelector('#subjectPost');
const tagsPost = document.querySelector('#tagsPost');
const mediaPost = document.querySelector('#mediaPost');
const descriptionPost = document.querySelector('#descriptionPost');
const postForm = document.querySelector('#post-form');
const displayError = document.querySelector('#error');

import { redirect } from '../../function.mjs';
import { errorMessage } from '../../components/message.mjs';

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = 'https://nf-api.onrender.com/';
const apiCreatePost = 'api/v1/social/posts';

export function sendPostToAPI() {
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the value from the login form on login.html pag

    const createdPost = {
      title: subjectPost.value,
      body: descriptionPost.value,
      tags: [`${tagsPost.value}`],
      media: mediaPost.value,
    };

    /**
     * This function will send the values in the form for creations of uniques posts
     * to the API.
     * @param {*} apiUrl inserts the API link
     * @param {*} data Inserts the data/values from the form
     * @returns
     */
    async function sendPost(apiUrl, data) {
      try {
        const myAccessToken = localStorage.getItem('myAccessToken');
        const postData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myAccessToken}`,
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(apiUrl, postData);
        const json = await response.json();

        // Redirect the user when the post is created.
        redirect(response);

        return json;
      } catch (error) {
        displayError.innerHTML = errorMessage(
          'The post was not created, please try again later!'
        );
      } finally {
      }
    }
    sendPost(`${apiUrl}${apiCreatePost}`, createdPost);
  });
}
