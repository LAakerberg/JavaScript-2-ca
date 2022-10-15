import { renderPost } from './filterPost.mjs';

export function searchPost(posts) {
  const search = document.querySelector('#search');

  search.onkeyup = function (event) {
    // console.log(event);

    const searchValue = event.target.value.trim().toLowerCase();

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
