//
export const API_HOST = `https://nf-api.onrender.com/`;
export const API_SOCIAL_MEDIA = `api/v1/social/posts/`;
export const API_PROFILE_DATA = `api/v1/social`;

export const API_SOCIAL_URL = `${API_HOST}${API_SOCIAL_MEDIA}`; // Get posts and specifics post by ID `https://nf-api.onrender.com/api/v1/social/posts/`;
export const API_PROFILE_URL = `${API_HOST}${API_PROFILE_DATA}`; // Get profile information + Login token + Register form `https://nf-api.onrender.com/api/v1/social`;

// Base URL
export const apiUrl = `https://nf-api.onrender.com/`;
//
// Get posts
export const apiGetPosts = `api/v1/social/posts/`;
//
// Get profile
export const apiGetProfile = `api/v1/social/profiles`;
//
// Get author + comments + reactions
export const author = `_author`;
export const comments = `_comments`;
export const reactions = `_reactions`;
//
// true
export const tru = `=true`;
//
// Sort by date or title
export const sortCreatedDesc = `?sort=created&sortOrder=desc`;
export const sortCreatedAsc = `?sort=created&sortOrder=asc`;
export const sortTitleDesc = `?sort=title&sortOrder=desc`;
export const sortTitleAsc = `?sort=title&sortOrder=asc`;

// /posts?sort=created&sortOrder=desc
// /posts?sort=title&sortOrder=asc
