import { requestPost } from './posts/getPosts.js';

import {
  apiUrl,
  apiGetPosts,
  sortCreatedDesc
} from './apiBase.js';

requestPost(`${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=200`);
