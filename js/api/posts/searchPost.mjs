import { renderPost } from './filterPost.mjs';

/**
 * This is a search function. The search is only working on the main page and
 * is able to detect user name / title of a post & the body text in a post.
 * @param {*} posts The data that's is being requested.
 */
export function searchPost(posts) {
  const search = document.querySelector('#search');

  // register the key's that's is press in the searchbar
  search.onkeyup = function (event) {
    // Format the values to lower case, just the get an correct match
    const searchValue = event.target.value.trim().toLowerCase();
    // Using the .filter() function to search trough the values.
    // Values is set to be lower case
    const filteredPost = posts.filter(function (post) {
      if (
        post.title.toLowerCase().startsWith(searchValue) ||
        post.body.toLowerCase().startsWith(searchValue) ||
        post.author.name.toLowerCase().startsWith(searchValue)
      ) {
        return true;
      }
    });

    renderPost(filteredPost);
  };
}
