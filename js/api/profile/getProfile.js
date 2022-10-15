const allProfilePosts = document.querySelector('#profile-post');
const profileImage = document.querySelector('#profile-img');
const profileStats = document.querySelector('#profile-stats');

export function profileData(data) {
  const { name, _count, avatar } = data;
}

// import { deletePost } from '../posts/deletePost';

import { apiUrl } from '../auth/apiBase.js';
import { apiGetProfile } from '../auth/apiBase.js';
import { sortCreatedDesc } from '../auth/apiBase.mjs';
import { sortCreatedAsc } from '../auth/apiBase.mjs';
import { authFetch } from '../auth/authFetch.mjs';
import { headers } from '../auth/authFetch.mjs';
import { logOutUser } from '../../function.mjs';

const method = 'GET';

const profileName = localStorage.getItem('name');
const profileAvatar = localStorage.getItem('avatar');
const profileEmail = localStorage.getItem('email');

export async function fetchProfile(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await response.json();
    const profile = json;
    const profileData = profile._count;
    const profilePosted = profile.posts;
    console.log(profileData);
    console.log(profilePosted);

    if (localStorage.getItem('avatar') === '') {
      localStorage.setItem(
        'avatar',
        'https://static.thenounproject.com/png/2884221-200.png'
      );
    }

    profileImage.innerHTML += `<img src="${profileAvatar}" alt="Profile picture of ${profileName}" class="profile-pic rounded" />`;
    profileStats.innerHTML += `<div>Total posts: ${profileData.posts} Following: ${profileData.following} Followers: ${profileData.followers}</div>`;

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
                <a class="post-link p-1 m-1" href="/pages/posts/details/edit/?id=${postId}"><div><button><span class="material-symbols-outlined edit-icon">edit </span></button></div></a>
              </div>
                <div class="w-auto card-body text-dark">
                  <h4 class="w-auto card-title">${profilePosted[i].title}</h4>
                  <div class="w-auto p-1 text-dark"><p class="card-text">${profilePosted[i].body}</p></div>
                  <div id="media" class="w-100 pt-5 text-center media">
                    <figure class="">
                        <img src="${profilePosted[i].media}" class="media-image border rounded" alt="Picture uploaded by: ${profilePosted[i].owner}"/>
                        <figcaption>Picture uploaded by: ${profilePosted[i].owner}</figcaption>
                    </figure>
                    </div>
                    <div>Tags: ${profilePosted[i].tags}</div>
                </div>
                <div class="w-auto card-body text-dark">Comment</div>
            </div>
            `;

      allProfilePosts.innerHTML += `${implanted}`;
    }

    /*         profilePosted.forEach(profilePost => {

            console.log(profilePost)
        }); */
  } catch (error) {
    console.log(error);
  }
}

fetchProfile(
  `${apiUrl}${apiGetProfile}/${profileName}?_posts=true&${sortCreatedDesc}`
);

console.log(
  `${apiUrl}${apiGetProfile}/${profileName}?_posts=true&${sortCreatedAsc}`
);

logOutUser();
