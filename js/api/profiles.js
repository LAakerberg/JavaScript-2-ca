const profileBox = document.querySelector("#profiles");

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = "https://nf-api.onrender.com/";
const apiGetProfile = "api/v1/social/profiles";

/**
 *
 * @param getProfiles calls the API with profiles information
 */

async function getProfiles(url) {
  try {
    const myAccessToken = localStorage.getItem("myAccessToken");
    const getProfilesData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myAccessToken}`,
      },
    };
    const responseProfile = await fetch(url, getProfilesData);
    console.log(responseProfile);
    const json = await responseProfile.json();
    const requestedProfiles = json;
    console.log(requestedProfiles);

    // IF Statement checks if the response.ok is return true
    // (This will be my check if localStorage is successful and acting as "You are Online state")
    if (responseProfile.ok === true) {
      for (let i = 0; i < requestedProfiles.length; i++) {
        if (i <= 7) {
          profileBox.innerHTML += `
  
          <div class="thumbnail-card col-1">
                  <div class="thumbnail-img"><img src="/img/michael-dam-mEZ3PoFGs_k-unsplash.jpg" class="" alt="Profile picture of ${json[i].name}"></div>
                  <div class="card-body"><p class="card-title">${json[i].name}</p></div>
          </div>
          
          `;
        }
      }
    } else {
      console.log("Could load data");
      profileBox.innerHTML += `
  
      <div class="thumbnail-card col-1"><p>You are not online</p>
      </div>
      
      `;
    }
  } catch (error) {
    console.log(error);
    console.log("Could load the API");
  }
}

getProfiles(`${apiUrl}${apiGetProfile}`);
