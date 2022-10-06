const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postsBox = document.querySelector("#posts");
const postTitle = document.querySelector("#post-top");

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiSpecificPost is the API call to login auth
 */

const author = `_author`;
const comments = `_comments`;
const reactions = `_reactions`;
const tru = `=true`;

const apiUrl = "https://nf-api.onrender.com/";
const apiSpecificPost = `api/v1/social/posts/` + id + `?` + author + tru;

console.log(apiUrl);
console.log(apiSpecificPost);

async function uniquePost(url) {
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
      postTitle.innerHTML += `
        <h2 class="card-title title-text p-0">${json.title}</h2>
        `;
      postsBox.innerHTML += `

          <div class="w-100 col-1 border-top border-bottom border-dark">
            <div class="w-100"><span class="card-text">${json.body}</span></div>
          </div>
          <div class="w-100"><span class="card-text">Posted by: ${json.author.name}</span></div>
          <div class="w-100"><span class="card-text">Date: ${json.created}</span></div>
          <div class="w-100"><span class="card-text">Tags: ${json.tags}</span></div>
          
          `;
    } else {
      console.log("Could load data");
      postsBox.innerHTML += `
  
      <div class="thumbnail-card col-1"><p>You are not online</p>
      </div>
      
      `;
    }
  } catch (error) {
    console.log(error);
  }
}

uniquePost(`${apiUrl}${apiSpecificPost}`);

const modal = document.querySelector("#register-modal");
const btn = document.querySelector("#open-register");
const btnClose = document.querySelector("#btn-close");

btn.onclick = function () {
  modal.style.display = "block";
};

btnClose.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
