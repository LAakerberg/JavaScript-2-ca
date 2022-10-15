const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const postsBox = document.querySelector('#posts');
const postTitle = document.querySelector('#post-top');
const mediaClass = document.querySelector('#media');
const editPost = document.querySelector('#edit-post');

import { API_SOCIAL_URL } from '../../auth/apiBase.mjs';
import { authFetch } from '../../auth/authFetch.mjs';
import { headers } from '../../auth/authFetch.mjs';
import { deletePost } from '../deletePost.js';
import { redirect } from '../../../function.mjs';

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiSpecificPost is the API call to login auth
 */

const author = `_author`;
const tru = `=true`;

const method = 'GET';

export async function uniquePost(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await response.json();
    const requestedPosts = json;

    const dateRequested = new Date(`${requestedPosts.created}`);
    const dateFormatted = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const newFormat = dateRequested.toLocaleDateString('en-GB', dateFormatted);

    if (response.ok === true) {
      postTitle.innerHTML += `
        <h2 class="card-title title-text text-white p-0">${requestedPosts.title}</h2>
        `;
      postsBox.innerHTML += `

          <div class="w-100 col-1 border-top border-bottom border-dark">
            <div class="w-100"><span class="card-text">${requestedPosts.body}</span></div>
            <div id="media" class="w-100 pt-5 text-center">
            <figure class="media">
            <img src="${requestedPosts.media}" class="media-image border rounded" alt="Picture uploaded by: ${requestedPosts.author.name}"/>
            <figcaption>Picture uploaded by: ${requestedPosts.author.name}</figcaption>
            </figure>
            </div>
          </div>
          <div class="w-100"><span class="card-text">Posted by: ${requestedPosts.author.name}</span></div>
          <div class="w-100"><span class="card-text">Created: ${newFormat}</span></div>
          <div class="w-100"><span class="card-text">Tags: ${requestedPosts.tags}</span></div>
          
          `;
      console.log(response);
      console.log(response.ok);
      console.log(requestedPosts);
    } else {
      console.log('Could load data');
      postsBox.innerHTML += `
  
      <div class="error-card col-1 border border-danger rounded-1 text-center"><p>Could not find this post!!!</p>
      </div>
      
      `;
    }
  } catch (error) {
    console.log(error);
  }
}

const modal = document.querySelector('#register-modal');
const btn = document.querySelector('#open-delete');
const btnClose = document.querySelector('#btn-close');
const btnDelete = document.querySelector('#btn-delete');

btn.onclick = function () {
  modal.style.display = 'block';
};

btnClose.onclick = function () {
  modal.style.display = 'none';
};

btnDelete.onclick = function () {
  deletePost(id);
  redirect();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
uniquePost(API_SOCIAL_URL + id + `?` + author + tru);

// deletePost(2039);
