export default {};

const postsBox = document.querySelector("#posts");
const newestPostFilter = document.querySelector("#newestPost");
const oldestPostFilter = document.querySelector("#oldestPost");

// import { deletePost } from "./posts/deletePost.js";

/**
 * API calls
 * @param apiURL is the base API base call imported from apiBase
 * @param apiGetPosts is the API call to gets posts, imported from apiBase
 */

import { apiUrl } from "../apiBase.js";
import { apiGetPosts } from "../apiBase.js";
import { sortCreatedDesc } from "../apiBase.js";
import { sortCreatedAsc } from "../apiBase.js";

const method = "GET";

export async function getPosts(url) {
  try {
    const myAccessToken = localStorage.getItem("myAccessToken");
    const getPostsData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myAccessToken}`,
      },
    };
    const responsePosts = await fetch(url, getPostsData);
    console.log(responsePosts);
    const json = await responsePosts.json();
    const requestedPosts = json;
    console.log(requestedPosts);

    // IF Statement checks if the response.ok is return true
    // (This will be my check if localStorage is successful and acting as "You are Online state")

    if (responsePosts.ok === true) {
      for (let i = 0; i < requestedPosts.length; i++) {
        const postId = requestedPosts[i].id;
        const author = requestedPosts[i].author.name;
        const datePost = requestedPosts[i].created;

        if (!json[i].author.avatar) {
          continue;
        }

        const implanted = `
        <a class="post-link border border-dark rounded p-1 m-1" href="/pages/posts/details.html?id=${postId}"
        <div class="small-postcard border border-dark">
                <div class="card-body"><img class="thumbnail-img" src="${json[i].author.avatar}" alt="Picture of ${author}" /></div>
                <div class="card-body"><span class="card-title title-text"> ${json[i].title}</h5></div>
                <div class="card-body"><span class="text-muted">Posted by:</span> <span class="author-name">${author}</span></div>
                <div class="card-body"><span class="text-muted">Posted by:</span> <span class="author-name">${datePost}</span></div>
        </div>
        </a>`;

        postsBox.innerHTML += `${implanted}`;

        newestPostFilter.onclick = function () {
          const newAPI = `${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=2500`;
          postsBox.innerHTML = `${implanted}`;
          getPosts(newAPI);
        };

        oldestPostFilter.onclick = function () {
          const oldAPI = `${apiUrl}${apiGetPosts}${sortCreatedAsc}&_author=true&limit=2500`;
          postsBox.innerHTML = `${implanted}`;
          getPosts(oldAPI);
        };
      }
    } else {
      console.log("Could load data");
      postsBox.innerHTML += `
  
      <div class="error-card col-1 border border-danger rounded-1 text-center"><p>Could not load the data!!</p>
      </div>
      
      `;
    }
  } catch (error) {
    console.log(error);
  }
}

getPosts(`${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=1500`);
