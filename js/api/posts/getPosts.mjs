const postsBox = document.querySelector('#posts');
const newestPostFilter = document.querySelector('#newestPost');
const oldestPostFilter = document.querySelector('#oldestPost');

import { apiUrl } from '../auth/apiBase.mjs';
import { apiGetPosts } from '../auth/apiBase.mjs';
import { sortCreatedDesc } from '../auth/apiBase.mjs';
import { sortCreatedAsc } from '../auth/apiBase.mjs';
import { renderPost } from './filterPost.mjs';
import { searchPost } from './searchPost.mjs';

// Import auth for the API call incl the local storage token.

import { authFetch } from '../auth/authFetch.mjs';
import { headers } from '../auth/authFetch.mjs';

const method = 'GET';

export async function requestPost(url) {
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

    renderPost(requestedPosts);
    searchPost(requestedPosts);

    newestPostFilter.onclick = function () {
      const newAPI = `${apiUrl}${apiGetPosts}?${sortCreatedDesc}&_author=true&limit=50`;
      requestPost(newAPI);
      console.log(newAPI);
    };

    oldestPostFilter.onclick = function () {
      const oldAPI = `${apiUrl}${apiGetPosts}?${sortCreatedAsc}&_author=true&limit=50`;
      requestPost(oldAPI);
      console.log(oldAPI);
    };
  } catch (error) {
    console.log(error);
  }
}

requestPost(`${apiUrl}${apiGetPosts}?${sortCreatedDesc}&_author=true&limit=50`);
