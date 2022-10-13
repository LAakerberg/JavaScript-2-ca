const allProfilePosts = document.querySelector('#profile-post');
const profileImage = document.querySelector('#profile-img');

export function profileData(data) {
  const { name, _count, avatar } = data;
}

// import { deletePost } from '../posts/deletePost';

import { apiUrl } from '../auth/apiBase.js';
import { apiGetProfile } from '../auth/apiBase.js';
import { authFetch } from '../auth/authFetch.js';
import { headers } from '../auth/authFetch.js';
import { logOutUser } from '../../function.mjs';

const method = 'GET';

const profileName = localStorage.getItem('name');
const profileAvatar = localStorage.getItem('avatar');
const profileEmail = localStorage.getItem('email');
console.log(profileName, profileAvatar, profileEmail);

async function fetchProfile(url) {
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
    console.log(response);
    console.log(profile.avatar);

    profileImage.innerHTML += `<img src="${profile.avatar}" alt="Profile picture of ${profile.name}" class="profil-pic rounded" />`;

    const profileData = profile;
    const profilePosted = profile.posts;
    console.log(profilePosted);
    // console.log(profilePosted[0].created);

    for (let i = 0; i < profilePosted.length; i++) {
      /*       if (profilePosted[i].media === '') {
        let element = document.querySelector('#media');
        element.classList.remove('media');
        element.classList.add('media-hide');
        console.log(profilePosted[0].media);
        console.log(profilePosted[1].media);
        console.log(profilePosted[2].media);
      } */

      const postId = profilePosted[i].id;

      const dateRequested = new Date(profilePosted[i].created);
      const month = dateRequested.getMonth() + 1;
      const date = dateRequested.getDate(2, `0`);
      const year = dateRequested.getFullYear();

      const dateCreated = date + `.` + month + `.` + year;

      const implanted = `

            <div class="w-auto card text-white bg-lightpurple mb-3">
              <div class="w-auto card-header d-flex">
                <div class="w-auto p-1 text-dark profileImg"><img class="profile-thumbnail" src="${profile.avatar}" alt="Picture of ${profilePosted[i].owner}" /></div>
                <div class="w-auto d-flex flex-column flex-fill">
                  <div class="w-auto p-1 text-dark author-name">${profilePosted[i].owner}</div>
                  <div class="w-auto p-1 text-darkpurple date-posted">${dateCreated}</div>
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

fetchProfile(`${apiUrl}${apiGetProfile}/${profileName}?_posts=true`);

/* const modal = document.querySelector('#register-modal');
const btn = document.querySelector('#open-register');
const btnClose = document.querySelector('#btn-close');
const btnDelete = document.querySelector('#btn-delete');

btn.onclick = function () {
  modal.style.display = 'block';
};

btnClose.onclick = function () {
  modal.style.display = 'none';
};

btnDelete.onclick = function () {
  deletePost(id);
  alert('The post was successful deleted, you will now be redirected to start');
  setTimeout(() => {
    window.location.replace('/pages/posts/');
  }, 2000);
};

console.log(btnDelete);

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}; */

logOutUser();
