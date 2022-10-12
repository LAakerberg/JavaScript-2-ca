const postsBox = document.querySelector('#posts');
const newestPostFilter = document.querySelector('#newestPost');
const oldestPostFilter = document.querySelector('#oldestPost');

import { apiUrl } from './auth/apiBase.js';
import { apiGetPosts } from './auth/apiBase.js';
import { sortCreatedDesc } from './auth/apiBase.js';
import { sortCreatedAsc } from './auth/apiBase.js';
import { logOutUser } from '../function.js';

// Import auth for the API call incl the local storage token.

import { authFetch } from './auth/authFetch.js';
import { headers } from './auth/authFetch.js';

const method = 'GET';

/**
 * API calls
 * @param url The API url to call
 */
export async function requestPost(url) {
  try {
    const responsePosts = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await responsePosts.json();
    const requestedPosts = json;

    // IF Statement checks if the response.ok is return true

    if (responsePosts.ok === true) {
      for (let i = 0; i < requestedPosts.length; i++) {
        // Gets the date from the post and format it to new format
        const dateRequested = new Date(`${requestedPosts[i].created}`);
        const month = dateRequested.getMonth() + 1;
        const date = dateRequested.getDate(2, `0`);
        const year = dateRequested.getFullYear();

        const dateCreated = date + `.` + month + `.` + year;

        const postId = requestedPosts[i].id;
        const postAuthor = requestedPosts[i].author.name;
        const postTitle = requestedPosts[i].title;
        const postBody = requestedPosts[i].body;

        if (json[i].author.avatar === '') {
          json[i].author.avatar =
            'https://static.thenounproject.com/png/2884221-200.png';
        }
        const implanted = `
        <a class="post-link p-1 m-1" href="/pages/posts/details/?id=${postId}">
        <div class="w-auto card text-white bg-lightpurple mb-3">
          <div class="w-auto card-header d-flex">
            <div class="w-auto p-1 text-dark profileImg text-break"><img class="profile-thumbnail" src="${json[i].author.avatar}" alt="Picture of ${postAuthor}" /></div>
            <div class="w-auto d-flex flex-column flex-fill">
              <div class="w-auto p-1 text-dark flex-fill author-name text-break">${postAuthor}</div>
              <div class="w-auto p-1 text-dark date-posted">${dateCreated}</div>
            </div>
          </div>
            <div class="w-auto card-body text-dark">
              <h4 class="w-auto card-title text-break">${postTitle}</h4>
              <div class="w-auto p-1 text-dark"><p class="card-text text-break">${postBody}</p></div>
            </div>
            <div class="w-auto card-body text-dark">Comment</div>
        </div></a>`;

        postsBox.innerHTML += `${implanted}`;

        newestPostFilter.onclick = function () {
          const newAPI = `${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=10`;
          postsBox.innerHTML = `${implanted}`;
          requestPost(newAPI);
        };

        oldestPostFilter.onclick = function () {
          const oldAPI = `${apiUrl}${apiGetPosts}${sortCreatedAsc}&_author=true&limit=10`;
          postsBox.innerHTML = `${implanted}`;
          requestPost(oldAPI);
        };
      }
    } else {
      console.log('Could load data');
      postsBox.innerHTML += `
  
      <div class="error-card col-1 border border-danger rounded-1 text-center"><p>Could not load the data!!</p>
      </div>
      
      `;
    }
  } catch (error) {
    console.log(error);
  }
}

requestPost(`${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=80`);

logOutUser();
