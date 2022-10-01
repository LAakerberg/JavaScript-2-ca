const postsBox = document.querySelector("#posts");

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = "https://nf-api.onrender.com/";
const apiGetPosts = "api/v1/social/posts/";

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
        console.log(`${apiUrl}${apiGetPosts}${postId}`);
        if (i <= 5) {
          postsBox.innerHTML += `
          <a href="/logins/posts/details.html?id=${postId}"
          <div class="small-postcard col-1 border">
                  <div class="card-body col-2"><span class="card-title title-text"> ${json[i].title}</h5></div>
                  <div class="card-body col-1"><span class="card-text">${json[i].body}</span></div>
          </div>
          </a>
          `;
        }
      }
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

getPosts(`${apiUrl}${apiGetPosts}`);
