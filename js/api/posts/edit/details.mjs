let title = document.querySelector('title');
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
import { logOutUser, redirectDelete } from '../../../function.mjs';
import { errorMessage } from '../../../components/message.mjs';

const author = `_author`;
const tru = `=true`;

const method = 'GET';

/**
 * This functions call the API the get the unique post that's is requested by the ID
 * to an specific/detailed page. Within this page the user have access to edit/delete the posts
 * but only if you are the owner.
 * @param {url} url insert the API link
 */
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
    // Requests the date/time from the JSON
    const dateRequested = new Date(`${requestedPosts.created}`);
    // Format the date to an more user friendly and readable date.
    const dateFormatted = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const newFormat = dateRequested.toLocaleDateString('en-GB', dateFormatted);

    title.innerHTML = `SoMe One | Edit post: ${requestedPosts.title}`;
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
    } else {
      console.log('Could load data');
      postsBox.innerHTML += errorMessage(
        'Could not load this post from the server, please try again!'
      );
    }
  } catch (error) {
    console.log(error);
    postsBox.innerHTML += errorMessage(
      'Could not find this post, please try again!'
    );
  }
}

const modal = document.querySelector('#register-modal');
const btn = document.querySelector('#open-delete');
const btnClose = document.querySelector('#btn-close');
const btnDelete = document.querySelector('#btn-delete');

/**
 * This function will open the modal for be able to edit/delete post
 */
btn.onclick = function () {
  modal.style.display = 'block';
};

/**
 * This function will close the modal if the Cancel button is clicked
 */
btnClose.onclick = function () {
  modal.style.display = 'none';
};

/**
 * This is a delete button that's will delete to post.
 */
btnDelete.onclick = function () {
  deletePost(id);
  redirectDelete();
};

/**
 * This function will close the modal if the user click outside the modal
 */
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
uniquePost(API_SOCIAL_URL + id + `?` + author + tru);

logOutUser();
