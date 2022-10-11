const postsBox = document.querySelector('#posts');
// See line 24 - const searchForPost = document.querySelector('#searchPost');
const newestPostFilter = document.querySelector('#newestPost');
const oldestPostFilter = document.querySelector('#oldestPost');

/**
 * API calls
 * @param apiURL is the base API base call imported from apiBase
 * @param apiGetPosts is the API call to gets posts, imported from apiBase
 */

import { apiUrl } from '../apiBase.js';
import { apiGetPosts } from '../apiBase.js';
import { sortCreatedDesc } from '../apiBase.js';
import { sortCreatedAsc } from '../apiBase.js';

// Import auth for the API call incl the local storage token.

import { authFetch } from '../authFetch.js';
import { headers } from '../authFetch.js';

const method = 'GET';

// Search function for Posts - No working right now so just comment this one out for now

/* searchForPost.addEventListener('input', (e) => {
  const value = e.target.value;
  console.log(value);
}); */

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

        if (!json[i].author.avatar) {
          continue;
        }


        const implanted = `
        <a class="post-link border border-dark rounded p-1 m-1" href="/pages/posts/details.html?id=${postId}"
        <div class="small-postcard border border-dark">
                <div class="card-body"><img class="thumbnail-img" src="${json[i].author.avatar}" alt="Picture of ${postAuthor}" /></div>
                <div class="card-body"><span class="card-title title-text"> ${postTitle}</h5></div>
                <div class="card-body"><span class="text-muted">Posted by:</span> <span class="author-name">${postAuthor}</span></div>
                <div class="card-body"><span class="text-muted">Posted by:</span> <span class="author-name">${dateCreated}</span></div>
        </div>
        </a>`;

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
  
      <div class="error-card col-1 border border-danger rounded-1 text-center"><p class="error-text">Could not load the data! Please try again.</p>
      </div>
      
      `;
    }
  } catch (error) {
    console.log(error);
  }
}
