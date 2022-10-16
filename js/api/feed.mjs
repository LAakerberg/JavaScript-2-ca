const profileBox = document.querySelector('#profiles');

import { API_PROFILE_URL } from './auth/apiBase.mjs';
import { authFetch } from './auth/authFetch.mjs';
import { headers } from './auth/authFetch.mjs';
import { errorMessage } from '../components/message.mjs';

const method = 'GET';

/**
 * This function will make a API call to fetch the first 50 user/profile with name and avatar image
 * on the start page.
 * @param {*} url the API link need to be inserted
 * @return return the 50 first user/profiles in the sidebar
 */

export async function getProfiles(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );
    const json = await response.json(API_PROFILE_URL);
    const requestedProfiles = json;
    console.log(response);
    console.log(requestedProfiles);

    // IF Statement checks if the response.ok is return true

    if (response.ok === true) {
      for (let i = 0; i < requestedProfiles.length; i++) {
        if (requestedProfiles[i].avatar === '') {
          requestedProfiles[i].avatar =
            'https://static.thenounproject.com/png/2884221-200.png';
        }
        const authorName = requestedProfiles[i].name;
        const authorAvatar = requestedProfiles[i].avatar;
        profileBox.innerHTML += `

        <div class="thumbnail-card col-1 text-break">
                <div class=""><img src="${authorAvatar}" class="thumbnail-profile-img" alt="Profile picture of ${authorName}"></div>
                <div class="card-body"><p class="card-title author-name">${authorName}</p></div>
        </div>
        
        `;
      }
    } else {
      profileBox.innerHTML = errorMessage(
        'Not able to load the user/profile content. Please try again later!'
      );
    }
  } catch (error) {
    profileBox.innerHTML = errorMessage(
      'Not able to load the user/profile content. Please try again later!'
    );
  }
}

getProfiles(`${API_PROFILE_URL}?limit=50`);
