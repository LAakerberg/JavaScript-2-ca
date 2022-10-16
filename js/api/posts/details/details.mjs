const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const postsBox = document.querySelector('#posts');
const postTitle = document.querySelector('#post-top');
const specificTitle = document.querySelector('#specific-title');
const mediaClass = document.querySelector('#media');

const author = `_author`;
const tru = `=true`;

import { API_SOCIAL_URL } from '../../auth/apiBase.mjs';
import { authFetch } from '../../auth/authFetch.mjs';
import { headers } from '../../auth/authFetch.mjs';
import { errorMessage } from '../../../components/message.mjs';
import { logOutUser } from '../../../function.mjs';

const method = 'GET';

/**
 * This functions call the API the get the unique post that's is requested by the ID
 * to an specific/detailed page. This page is an readonly for the user.
 * @param {*} url Insert the API link to the json.
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

    const json = await response.json(API_SOCIAL_URL);
    const requestedPosts = json;

    // Requests the date/time from the JSON
    const dateTime = requestedPosts.created;
    // Format the date to an more user friendly and readable date.
    const dateRequested = new Date(`${dateTime}`);
    const dateFormatted = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const newFormat = dateRequested.toLocaleDateString('en-GB', dateFormatted);

    /* This IF statement will check if the user have an avatar added. If not it will add an
   image to the request to make it more user friendly displayed.
 */
    if (response.ok === true) {
      if (requestedPosts.author.avatar === '') {
        requestedPosts.author.avatar =
          'https://static.thenounproject.com/png/2884221-200.png';
      }
      /* If the user not have added an image to the posts it will just shown an No image picture.
This just for make it more user friendly. 
*/
      if (requestedPosts.media === '') {
        requestedPosts.media =
          'https://static.thenounproject.com/png/2884221-200.png';
      }

      specificTitle.innerHTML += `
      Posted by: ${requestedPosts.author.name}
      `;

      postTitle.innerHTML += `
        <h3 class="card-title title-text text-white title-container text-center">${requestedPosts.title}</h3>
        `;
      postsBox.innerHTML += `

          <div class="w-100 col-1 border-top border-bottom border-dark">
            <div class="w-100"><span class="card-text">${requestedPosts.body}</span></div>
            <div id="media" class="w-100 pt-5 text-center">
            <figure>
            <img src="${requestedPosts.media}" class="media-image border rounded" alt="Picture uploaded by: ${requestedPosts.author.name}"/>
            <figcaption>Picture uploaded by: ${requestedPosts.author.name}</figcaption>
            </figure>
            </div>
          </div>
          <div class="d-flex flex-row h-auto post-footer">
          <div class="p-1 text-dark profileImg text-break"><img class="profile-thumbnail" src="${requestedPosts.author.avatar}" alt="Picture of ${requestedPosts.author.name}" /></div>
          <div class="w-auto d-flex flex-column">
          <div class="w-100"><span class="card-text">Posted by: ${requestedPosts.author.name}</span></div>
          <div class="w-100"><span class="card-text">Created: ${newFormat}</span></div>
          <div class="w-100"><span class="card-text">Tags: ${requestedPosts.tags}</span></div>
          </div>
          </div>
          
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

uniquePost(`${API_SOCIAL_URL}` + id + `?` + author + tru);

logOutUser();
