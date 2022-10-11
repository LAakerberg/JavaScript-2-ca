const postsBox = document.querySelector('#posts');
const searchForPost = document.querySelector('#searchPost');
const newestPostFilter = document.querySelector('#newestPost');
const oldestPostFilter = document.querySelector('#oldestPost');

/**
 * API calls
 * @param apiURL is the base API base call imported from apiBase
 * @param apiGetPosts is the API call to gets posts, imported from apiBase
 */

import { apiUrl } from './apiBase.js';
import { apiGetPosts } from './apiBase.js';
import { sortCreatedDesc } from './apiBase.js';
import { sortCreatedAsc } from './apiBase.js';

// Import auth for the API call incl the local storage token.

import { authFetch } from './authFetch.js';
import { headers } from './authFetch.js';

const method = 'GET';

export async function requestPost(url) {
  try {
    const responsePosts = await authFetch(
      url,
      {
        method,
      },
      headers()
    );
    console.log(responsePosts);
    const json = await responsePosts.json();
    const requestedPosts = json;
    console.log(requestedPosts);

    // IF Statement checks if the response.ok is return true
    // (This will be my check if localStorage is successful and acting as "You are Online state")

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

        if (!json[i].author.avatar) {
          continue;
        }
        const implanted = `
        <a class="post-link p-1 m-1" href="/pages/posts/details.html?id=${postId}">
        <div class="w-auto card text-white bg-lightpurple mb-3">
          <div class="w-auto card-header d-flex">
            <div class="w-auto p-1 text-dark profileImg"><img class="profile-thumbnail" src="${json[i].author.avatar}" alt="Picture of ${postAuthor}" /></div>
            <div class="w-auto d-flex flex-column flex-fill">
              <div class="w-auto p-1 text-dark flex-fill author-name">${postAuthor}</div>
              <div class="w-auto p-1 text-dark date-posted">${dateCreated}</div>
            </div>
          </div>
            <div class="w-auto card-body text-dark">
              <h4 class="w-auto card-title">${postTitle}</h4>
              <div class="w-auto p-1 text-dark"><p class="card-text">${postBody}</p></div>
            </div>
            <div class="w-auto card-body text-dark">Comment</div>
        </div></a>`;

        postsBox.innerHTML += `${implanted}`;

        newestPostFilter.onclick = function () {
          const newAPI = `${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=5500`;
          postsBox.innerHTML = `${implanted}`;
          requestPost(newAPI);
        };

        oldestPostFilter.onclick = function () {
          const oldAPI = `${apiUrl}${apiGetPosts}${sortCreatedAsc}&_author=true&limit=5500`;
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

requestPost(
  `${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=5500`
);
