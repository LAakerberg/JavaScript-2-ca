const postsBox = document.querySelector("#posts");

// import { deletePost } from "./posts/deletePost.js";

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = "https://nf-api.onrender.com/";
const apiGetPosts = "api/v1/social/posts/" + "?_author=true&limit=600";

async function getPosts(url) {
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
    console.log(requestedPosts[0].id);

    // IF Statement checks if the response.ok is return true
    // (This will be my check if localStorage is successful and acting as "You are Online state")

    if (responsePosts.ok === true) {
      for (let i = 0; i < requestedPosts.length; i++) {
        const postId = requestedPosts[i].id;

        if (!json[i].author.avatar) {
          continue;
        }

        postsBox.innerHTML += `
        <a class="post-link border border-dark rounded p-1 m-1" href="/pages/posts/details.html?id=${postId}"
        <div class="small-postcard border border-dark">
                <div class="card-body"><img class="thumbnail-img" src="${json[i].author.avatar}" alt="Picture of ${json[i].author.name}" /></div>
                <div class="card-body"><span class="text-muted">Posted by:</span> <span class="author-name">${json[i].author.name}</span></div>
                <div class="card-body"><span class="card-title title-text"> ${json[i].title}</h5></div>
        </div>
        </a>
        `;
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

getPosts(`${apiUrl}${apiGetPosts}`);
