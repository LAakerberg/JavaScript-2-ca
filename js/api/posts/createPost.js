// export async function createPost(postData) {}

const subjectPost = document.querySelector('#subjectPost');
const tagsPost = document.querySelector('#tagsPost');
const mediaPost = document.querySelector('#mediaPost');
const descriptionPost = document.querySelector('#descriptionPost');
const postForm = document.querySelector('#post-form');

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = 'https://nf-api.onrender.com/';
const apiCreatePost = 'api/v1/social/posts';

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the value from the login form on login.html pag

  const createdPost = {
    title: subjectPost.value,
    body: descriptionPost.value,
    tags: [`${tagsPost.value}`],
    media: mediaPost.value,
  };

  // async function for the API call to login.
  async function sendPost(apiUrl, data) {
    try {
      const myAccessToken = localStorage.getItem('myAccessToken');
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myAccessToken}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(apiUrl, postData);
      const json = await response.json();
      console.log(response.ok);
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  sendPost(`${apiUrl}${apiCreatePost}`, createdPost);
});
