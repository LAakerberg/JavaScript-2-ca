export function renderPost(postsToRender) {
  const postsBox = document.querySelector('#posts');

  postsBox.innerHTML = '';

  /*
  The posts that's is requested from getPosts will be rendered here so the content
  will be search able. It's will also be adding the posts to the main page.
  */
  postsToRender.forEach(function (requestedPosts) {
    const dateRequested = new Date(`${requestedPosts.created}`);
    // Formats the date from the request to be more user friendly and readable
    const dateFormatted = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const newFormat = dateRequested.toLocaleDateString('en-GB', dateFormatted);

    if (requestedPosts.author.avatar === '') {
      requestedPosts.author.avatar =
        'https://static.thenounproject.com/png/2884221-200.png';
    }

    const importCard = `    <a class="post-link p-1 m-1" href="/pages/posts/details/?id=${requestedPosts.id}">
<div class="w-auto card text-white bg-lightpurple mb-3 hover-card">
  <div class="w-auto card-header d-flex">
    <div class="w-auto p-1 text-dark profileImg text-break"><img class="profile-thumbnail" src="${requestedPosts.author.avatar}" alt="Picture of ${requestedPosts.name}" /></div>
    <div class="w-auto d-flex flex-column flex-fill">
      <div class="w-auto p-1 text-dark flex-fill author-name text-break">${requestedPosts.author.name}</div>
      <div class="w-auto p-1 text-dark date-posted">${newFormat}</div>
    </div>
    <div class=""><button class="icon"><span class="material-symbols-outlined icon p-2">
    read_more
    </span></button></div>
  </div>
    <div class="w-auto card-body text-dark">
      <h4 class="w-auto card-title text-break">${requestedPosts.title}</h4>
      <div class="w-auto p-1 text-dark"><p class="card-text text-break">${requestedPosts.body}</p></div>
    </div>
    <div class="w-auto card-body text-dark">Comment</div>
</div></a>`;

    postsBox.innerHTML += `${importCard}`;
  });
}
