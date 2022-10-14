const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const postsBox = document.querySelector('#posts');
const postTitle = document.querySelector('#post-top');
const mediaClass = document.querySelector('#media');

console.log(postTitle);

import { deletePost } from '../deletePost.js';

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiSpecificPost is the API call to login auth
 */

const author = `_author`;
const tru = `=true`;

const apiUrl = 'https://nf-api.onrender.com/';
const apiGetPosts = `api/v1/social/posts/` + id + `?` + author + tru;

import { authFetch } from '../../auth/authFetch.mjs';
import { headers } from '../../auth/authFetch.mjs';

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
    console.log(requestedPosts.author.avatar);

    const dateTime = requestedPosts.created;

    // Gets the date from the post and format it to new format
    const dateRequested = new Date(dateTime);
    const month = dateRequested.getMonth() + 1;
    const date = dateRequested.getDate(2, `0`);
    const year = dateRequested.getFullYear();

    const dateCreated = date + `.` + month + `.` + year;

    // Gets the time from the post and format it to new format
    const timeRequested = new Date(dateTime);
    const hours = timeRequested.getHours();
    const minutes = timeRequested.getMinutes();

    const timeCreated = hours + `:` + minutes;

    if (response.ok === true) {
      postTitle.innerHTML += `
        <h2 class="card-title title-text text-white title-container text-center">${requestedPosts.title}</h2>
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
          <div class="d-flex flex-row h-auto post-footer">
          <div class="p-1 text-dark profileImg text-break"><img class="profile-thumbnail" src="${requestedPosts.author.avatar}" alt="Picture of ${requestedPosts.author.name}" /></div>
          <div class="w-auto d-flex flex-column">
          <div class="w-100"><span class="card-text">Posted by: ${requestedPosts.author.name}</span></div>
          <div class="w-100"><span class="card-text">Created: ${dateCreated} - ${timeCreated}</span></div>
          <div class="w-100"><span class="card-text">Tags: ${requestedPosts.tags}</span></div>
          </div>
          </div>
          
          `;
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

uniquePost(`${apiUrl}${apiGetPosts}`);

// deletePost(2039);
