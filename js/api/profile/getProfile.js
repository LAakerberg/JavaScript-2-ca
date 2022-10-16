const allProfilePosts = document.querySelector('#profile-post');
const profileImage = document.querySelector('#profile-img');
const profileStats = document.querySelector('#profile-stats');

/* export function profileData(data) {
  const { name, _count, avatar } = data;
} */

// import { deletePost } from '../posts/deletePost';

import { API_PROFILE_URL } from '../auth/apiBase.mjs';
import { sortCreatedDesc } from '../auth/apiBase.mjs';
import { sortCreatedAsc } from '../auth/apiBase.mjs';
import { authFetch } from '../auth/authFetch.mjs';
import { headers } from '../auth/authFetch.mjs';
import { logOutUser } from '../../function.mjs';
import { errorMessage } from '../../components/message.mjs';

const method = 'GET';

const profileName = localStorage.getItem('name');
const profileAvatar = localStorage.getItem('avatar');
const profileEmail = localStorage.getItem('email');

/**
 * This function call the API to include the posts data from the user/profile
 * It's will also include the data from localStorage instead of call the information.
 * Data as username, user avatar and email. Email is not in use for now.
 * @param {*} url The API will be inserted
 */
export async function fetchProfile(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await response.json(API_PROFILE_URL);
    const profile = json;
    const profileData = profile._count;
    const profilePosted = profile.posts;

    if (localStorage.getItem('avatar') === '') {
      localStorage.setItem(
        'avatar',
        'https://static.thenounproject.com/png/2884221-200.png'
      );
    }

    profileImage.innerHTML += `<img src="${profileAvatar}" alt="Profile picture of ${profileName}" class="profile-pic rounded" />`;
    profileStats.innerHTML += `<div class="">
    <span class="material-symbols-outlined text-dark p-2">
    forum
    </span>: ${profileData.posts} <span class="material-symbols-outlined text-dark p-2">
    person
    </span>: ${profileData.following} <span class="material-symbols-outlined text-dark p-2">
    group
    </span>: ${profileData.followers}
    </div>`;

    for (let i = 0; i < profilePosted.length; i++) {
      const dateRequested = new Date(`${profilePosted[i].created}`);
      const dateFormatted = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      const newFormat = dateRequested.toLocaleDateString(
        'en-GB',
        dateFormatted
      );

      const postId = profilePosted[i].id;

      const implanted = `

            <div class="w-auto card text-white bg-lightpurple mb-3">
              <div class="w-auto card-header d-flex">
                <div class="w-auto p-1 text-dark profileImg"><img class="profile-thumbnail" src="${profile.avatar}" alt="Picture of ${profilePosted[i].owner}" /></div>
                <div class="w-auto d-flex flex-column flex-fill">
                  <div class="w-auto p-1 text-dark author-name">${profilePosted[i].owner}</div>
                  <div class="w-auto p-1 text-darkpurple date-posted">${newFormat}</div>
                </div>
                <a class="post-link p-1 m-1" href="/pages/posts/details/edit/?id=${postId}"><div><button class="icon"><span class="material-symbols-outlined icon p-2">edit </span></button></div></a>
              </div>
                <div class="w-auto card-body text-dark">
                  <h2 class="w-auto card-title">${profilePosted[i].title}</h2>
                  <div class="w-auto p-1 text-dark"><p class="card-text">${profilePosted[i].body}</p></div>
                  <div id="media" class="w-100 pt-5 text-center media">
                    <figure class="">
                        <img src="${profilePosted[i].media}" class="media-image border rounded" alt="Picture uploaded by: ${profilePosted[i].owner}"/>
                        <figcaption>Picture uploaded by: ${profilePosted[i].owner}</figcaption>
                    </figure>
                    </div>
                    <div>Tags: ${profilePosted[i].tags}</div>
                </div>
                <div class="w-auto card-body text-dark"></div>
            </div>
            `;

      allProfilePosts.innerHTML += `${implanted}`;
    }
  } catch (error) {
    allProfilePosts.innerHTML += errorMessage(
      'Not able to load the profile and posts information. Please try again later!'
    );
  }
}

fetchProfile(`${API_PROFILE_URL}${profileName}?_posts=true&${sortCreatedDesc}`);

logOutUser();
