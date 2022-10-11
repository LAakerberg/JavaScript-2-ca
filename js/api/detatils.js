const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const postsBox = document.querySelector('#posts');
const postTitle = document.querySelector('#post-top');
const mediaClass = document.querySelector('#media');

console.log(postTitle);

import { deletePost } from './posts/deletePost.js';

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiSpecificPost is the API call to login auth
 */

const author = `_author`;
const comments = `_comments`;
const reactions = `_reactions`;
const tru = `=true`;

const apiUrl = 'https://nf-api.onrender.com/';
const apiGetPosts = `api/v1/social/posts/` + id + `?` + author + tru;

async function uniquePost(url) {
  try {
    const myAccessToken = localStorage.getItem('myAccessToken');
    const getPostsData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myAccessToken}`,
      },
    };
    const responsePosts = await fetch(url, getPostsData);
    console.log(responsePosts);
    const json = await responsePosts.json();
    const requestedPosts = json;

    console.log(requestedPosts);

    // Gets the date from the post and format it to new format
    const dateRequested = new Date(`${requestedPosts.created}`);
    const month = dateRequested.getMonth() + 1;
    const date = dateRequested.getDate(2, `0`);
    const year = dateRequested.getFullYear();

    const dateCreated = date + `.` + month + `.` + year;

    // Gets the time from the post and format it to new format
    const timeRequested = new Date(`${requestedPosts.created}`);
    const hours = timeRequested.getHours();
    const minutes = timeRequested.getMinutes();

    const timeCreated = hours + `:` + minutes;

    if (responsePosts.ok === true) {
      postTitle.innerHTML += `
        <h2 class="card-title title-text p-0">${json.title}</h2>
        `;
      postsBox.innerHTML += `

          <div class="w-100 col-1 border-top border-bottom border-dark">
            <div class="w-100"><span class="card-text">${json.body}</span></div>
            <div id="media" class="w-100 pt-5 text-center">
            <figure class="media">
            <img src="${json.media}" class="media-image border rounded" alt="Picture uploaded by: ${json.author.name}"/>
            <figcaption>Picture uploaded by: ${json.author.name}</figcaption>
            </figure>
            </div>
          </div>
          <div class="w-100"><span class="card-text">Posted by: ${json.author.name}</span></div>
          <div class="w-100"><span class="card-text">Created: ${dateCreated} ${timeCreated}</span></div>
          <div class="w-100"><span class="card-text">Tags: ${json.tags}</span></div>
          
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

const modal = document.querySelector('#register-modal');
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
};

// deletePost(2039);
