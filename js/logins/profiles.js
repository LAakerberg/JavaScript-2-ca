const profileBox = document.querySelector("#profiles");

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = "https://nf-api.onrender.com/";
const apiGetProfile = "api/v1/social/profiles";

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
    const response = await fetch(url, getProfilesData);
    console.log(response);
    const json = await response.json();
    const requestedProfiles = json;
    console.log(requestedProfiles);

    for (let i = 0; i < requestedProfiles.length; i++) {
      if (i <= 7) {
        profileBox.innerHTML += `

        <div class="thumbnail-card col-1">
                <div class="thumbnail-img"><img src="/img/michael-dam-mEZ3PoFGs_k-unsplash.jpg" class="card-img-top" alt="Profile picture of Jenna Steam"></div>
                <div class="card-body"><p class="card-title">${json[i].name}</p></div>
        </div>
        
        `;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

getProfiles(`${apiUrl}${apiGetProfile}`);
