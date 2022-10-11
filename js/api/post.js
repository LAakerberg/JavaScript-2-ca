import { requestPost } from './posts/getPosts.js';

import { apiUrl } from './apiBase.js';
import { apiGetPosts } from './apiBase.js';
import { sortCreatedDesc } from './apiBase.js';
import { sortCreatedAsc } from './apiBase.js';

requestPost(`${apiUrl}${apiGetPosts}${sortCreatedDesc}&_author=true&limit=500`);
