const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const updateSubject = document.querySelector(`#subjectEditPost`);
const updateTag = document.querySelector(`#tagsEditPost`);
const updateMedia = document.querySelector(`#mediaEditPost`);
const updateBody = document.querySelector(`#descriptionEditPost`);
const editPostForm = document.querySelector(`#edit-post`);

/* import { authFetch } from '../../auth/authFetch.mjs'; */
// import { uniquePost } from './details.mjs';

import { API_SOCIAL_URL } from '../../auth/apiBase.mjs';
import { authFetch } from '../../auth/authFetch.mjs';
import { headers } from '../../auth/authFetch.mjs';

const method = 'GET';

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

    /*     const getCreatedPost = {
      title: getPost.title,
      body: getPost.body,
      tags: [`${getPost.tags}`],
      media: getPost.media,
    }; */

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

editPostForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const editCreatedPost = {
    title: subjectEditPost.value,
    body: descriptionEditPost.value,
    tags: [`${tagsEditPost.value}`],
    media: mediaEditPost.value,
  };

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
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  updateValue(`${API_SOCIAL_URL}` + id);
});
