const postsBox = document.querySelector("#posts");

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = "https://nf-api.onrender.com/";
const apiGetPosts = "api/v1/social/posts";

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
    const response = await fetch(url, getPostsData);
    console.log(response);
    const json = await response.json();
    const requestedPosts = json;
    console.log(requestedPosts);

    for (let i = 0; i < requestedPosts.length; i++) {
      if (i <= 5) {
        postsBox.innerHTML += `

        <div class="thumbnail-card col-1 border">
                <div class="thumbnail-img col-2">${json[i].title}</div>
                <div class="thumbnail-img col-1">${json[i].body}</div>
        </div>
        
        `;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

getPosts(`${apiUrl}${apiGetPosts}`);
