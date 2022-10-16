export const API_HOST = `https://nf-api.onrender.com/`; // The main API host
export const API_SOCIAL_MEDIA = `api/v1/social/posts/`; // The social media /posts (route)
export const API_PROFILE_DATA = `api/v1/social/profiles/`; // The social media /profiles (route)
export const API_LOGIN = 'api/v1/social/auth/login'; // The social media /auth/login (route)
export const API_REGISTER = 'api/v1/social/auth/register'; // The social media /auth/register (route)

// Get post by this API combined -> `https://nf-api.onrender.com/api/v1/social/posts/`;
export const API_SOCIAL_URL = `${API_HOST}${API_SOCIAL_MEDIA}`;
// Get profile by this API combined -> `https://nf-api.onrender.com/api/v1/social/profiles`;
export const API_PROFILE_URL = `${API_HOST}${API_PROFILE_DATA}`;

// Sort by date descending or ascending
export const sortCreatedDesc = `sort=created&sortOrder=desc`;
export const sortCreatedAsc = `sort=created&sortOrder=asc`;
// Sort by title descending or ascending
export const sortTitleDesc = `?sort=title&sortOrder=desc`;
export const sortTitleAsc = `?sort=title&sortOrder=asc`;
