const apiUrl = "https://nf-api.onrender.com/";
const apiGetProfile = "api/v1/social/profiles";
const apiGetPosts = "api/v1/social/posts";

async function requestedData(url) {
  try {
    const myAccessToken = localStorage.getItem("myAccessToken");
    const getToken = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myAccessToken}`,
      },
    };
    const data = await fetch(url, getToken);
    const json = await data.json();
    console.log(data);
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function requestedCombinedData() {
  const data = await Promise.all([
    requestedData(`${apiUrl}${apiGetProfile}`),
    requestedData(`${apiUrl}${apiGetPosts}`),
  ]);
}

requestedCombinedData();

function getProfile() {}

function getPost() {}
