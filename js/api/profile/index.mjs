// Load data from Local storage and latest created posts from the API.
import { fetchProfile } from '../profile/getProfile.js';

// Import the create post possibility
import { sendPostToAPI } from '../posts/createPost.js';
sendPostToAPI();
