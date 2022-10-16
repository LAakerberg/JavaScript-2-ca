let title = document.querySelector('title');
const postsBox = document.querySelector('#posts');
const newestPostFilter = document.querySelector('#newestPost');
const oldestPostFilter = document.querySelector('#oldestPost');

import { API_SOCIAL_URL } from '../auth/apiBase.mjs';
import { sortCreatedDesc } from '../auth/apiBase.mjs';
import { sortCreatedAsc } from '../auth/apiBase.mjs';
import { renderPost } from './filterPost.mjs';
import { searchPost } from './searchPost.mjs';

// Import auth for the API call incl the local storage token.

import { authFetch } from '../auth/authFetch.mjs';
import { headers } from '../auth/authFetch.mjs';
import { errorMessage } from '../../components/message.mjs';

const method = 'GET';

/**
 * This function will call the API and request the last 50 posts
 * They are then exported in to filterPost.mjs so the post are searchable
 * through the searchbar
 * @param {*} url
 */
export async function requestPost(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await response.json(API_SOCIAL_URL);
    const requestedPosts = json;

    title.innerHTML = `SoMe One | Post feed`;

    // sends the request/json to filterPost and searchPost.
    renderPost(requestedPosts);
    searchPost(requestedPosts);

    /*
    Filter function that's will filter the post by descending
    */
    newestPostFilter.onclick = function () {
      const newAPI = `${API_SOCIAL_URL}?${sortCreatedDesc}&_author=true&limit=50`;
      requestPost(newAPI);
      console.log(newAPI);
    };

    /*
    Filter function that's will filter the post by ascending
    */
    oldestPostFilter.onclick = function () {
      const oldAPI = `${API_SOCIAL_URL}?${sortCreatedAsc}&_author=true&limit=50`;
      requestPost(oldAPI);
      console.log(oldAPI);
    };
  } catch (error) {
    postsBox.innerHTML = errorMessage(
      'Could not load the post feed, please try again later!'
    );
    console.log(error);
  }
}

requestPost(`${API_SOCIAL_URL}?${sortCreatedDesc}&_author=true&limit=50`);
