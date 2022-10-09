// GET /api/v1/social/posts?sort=created&sortOrder=desc
// GET /api/v1/social/posts?sort=title&sortOrder=asc

const profileFilter = document.querySelector("#profile-selection");
const newestPostFilter = document.querySelector("#newestPost");
const oldestPostFilter = document.querySelector("#oldestPost");

/**
 * API calls
 * @param apiURL is the base API base call imported from apiBase
 * @param apiGetPosts is the API call to gets posts, imported from apiBase
 */

import { apiUrl, sortCreatedDesc } from "../apiBase.js";
import { apiGetPosts } from "../apiBase.js";
import { sortCreated } from "../apiBase.js";

import { authFetch } from "../authFetch.js";

const action = "";
const method = "GET";

export async function filterByDate() {
  try {
    const filterURL = `${apiUrl}${apiGetPosts}${sortCreatedDesc}`;
    const response = await authFetch(filterURL, {
      method,
    });
    console.log(response);
    console.log(filterURL);

    return await response.json();
  } catch {
  } finally {
  }
}

filterByDate();

/* profileFilter.innerHTML += `
<option value="3">Hello</option>

`; */

newestPostFilter.onclick = function () {
  const newAPI = `${apiUrl}${apiGetPosts}${sortCreatedAsc}`;
};

oldestPostFilter.onclick = function () {
  const newAPI = `${apiUrl}${apiGetPosts}${sortCreatedDesc}`;
};

/* perPage.onchange = function (event) {
  const newUrl = link + `?per_page=${event.target.value}` + keyCombine2 + key;
  contentJacket.innerHTML = ``;
  getProducts(newUrl);
};

checkForDate.onchange = function (event) {
    newestPostFilter.onclick = function (event) {
    const newAPI = `${apiUrl}${apiGetPosts}${sortCreatedAsc}`;
  };
};

checkForDate.forEach(function (buttonDate) {
  buttonDate.onclick = function (event) {
    let newUrl;
    if (event.target.id === "featured") {
      newUrl = link + `?featured=true` + keyCombine2 + key;
    } else {
      const categorySpecific = event.target.value;
      newUrl = link + `?category=${categorySpecific}` + keyCombine2 + key;
    }
    contentJacket.innerHTML = ``;
    getProducts(newUrl);
  };
});
 */

newestPostFilter.onclick = function () {
  const newAPI = `${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=1000`;
  postsBox.innerHTML = `
            <a class="post-link border border-dark rounded p-1 m-1" href="/pages/posts/details.html?id=${postId}"
            <div class="small-postcard border border-dark">
                    <div class="card-body"><img class="thumbnail-img" src="${json[i].author.avatar}" alt="Picture of ${author}" /></div>
                    <div class="card-body"><span class="card-title title-text"> ${json[i].title}</h5></div>
                    <div class="card-body"><span class="text-muted">Posted by:</span> <span class="author-name">${author}</span></div>
            </div>
            </a>
            `;
  getPosts(newAPI);
};

oldestPostFilter.onclick = function () {
  const oldAPI = `${apiUrl}${apiGetPosts}${sortCreatedAsc}&_author=true&limit=1000`;
  postsBox.innerHTML = `
            <a class="post-link border border-dark rounded p-1 m-1" href="/pages/posts/details.html?id=${postId}"
            <div class="small-postcard border border-dark">
                    <div class="card-body"><img class="thumbnail-img" src="${json[i].author.avatar}" alt="Picture of ${author}" /></div>
                    <div class="card-body"><span class="card-title title-text"> ${json[i].title}</h5></div>
                    <div class="card-body"><span class="text-muted">Posted by:</span> <span class="author-name">${author}</span></div>
            </div>
            </a>
            `;
  getPosts(oldAPI);
};
