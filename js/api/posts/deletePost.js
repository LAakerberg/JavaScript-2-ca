const btnDelete = document.querySelector("#btn-delete");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

import { authFetch } from "../authFetch.js";

const apiUrl = "https://nf-api.onrender.com/";
const apiDeletePost = `api/v1/social/posts/` + id;

const action = "/posts";
const method = "delete";

// async function for the API call to login.
export async function deletePost(id) {
  try {
    //
    const deleteUrl = `${apiUrl}${apiDeletePost}`;
    const response = await authFetch(deleteUrl, {
      method,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// deletePost(id);

// console.log(deletePost);
