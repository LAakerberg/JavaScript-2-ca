import { API_PROFILE_URL } from '../auth/apiBase.mjs';
import { load } from '../storage/index.mjs';

const action = '/posts';

export async function createPosts(postData) {
  const createPostURL = API_PROFILE_URL;
  const token = load('token');
  const response = await fetch(createPostURL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
}
