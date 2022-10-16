// Request profiles that's is showing up on the sidebar
import { getProfiles } from './feed.mjs';

// Import the posts to the index page
import { requestPost } from './posts/getPosts.mjs';

import { logOutUser } from '../function.mjs';

logOutUser();
