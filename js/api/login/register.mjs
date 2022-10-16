const registerName = document.querySelector('#floatingInputName');
const registerEmail = document.querySelector('#floatingInputEmail');
const registerPwd = document.querySelector('#floatingPasswordRegister');
const registerAvatar = document.querySelector('#floatingAvatarImage');
const registerBanner = document.querySelector('#floatingBannerImage');
const registerForm = document.querySelector('#register-form');
const registerTitle = document.querySelector('#register-title');

const url = 'https://nf-api.onrender.com/api/v1/social/auth/register';

import { API_HOST, API_REGISTER } from '../auth/apiBase.mjs';
import { redirectRegister } from '../../function.mjs';
import { errorMessage } from '../../components/message.mjs';

registerTitle.innerHTML = ``;

/**
 * This function will start the registration of an account with and addEventListener button.
 * @param registerForm trigged by the registration button.
 */
export function registerUser() {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // if the banner and avatar is missing, add an inserted avatar/banner with IF statement

    if (registerBanner.value === '') {
      registerBanner.value =
        'https://publicdomainarchive.com/wp-content/uploads/2017/09/free-stock-photos-public-domain-images-013-1000x667.jpg';
    }
    if (registerAvatar.value === '') {
      registerAvatar.value =
        'https://assets.reedpopcdn.com/little-nightmares-2s-free-enhanced-edition-update-out-now-for-pc-ps5-and-xbox-series-x-s-1629905869658.jpg/BROK/resize/690%3E/format/jpg/quality/75/little-nightmares-2s-free-enhanced-edition-update-out-now-for-pc-ps5-and-xbox-series-x-s-1629905869658.jpg';
    }

    const registerUserValue = {
      name: registerName.value,
      email: registerEmail.value,
      password: registerPwd.value,
      banner: registerBanner.value,
      avatar: registerAvatar.value,
    };

    /**
     * This is a registration function, it's will collect the information from the registration form
     * and send this with the API call.
     * @param {url} apiURL inserts the API link to call
     * @param data inserts the data and sends with the API to the database
     * @returns it's returns a response with successful registration.
     */
    async function registerNewUser(API_HOST, data) {
      try {
        const registerData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(API_HOST, registerData);

        const json = await response.json();

        // IF response sends true, show success message
        if (response.ok === true) {
          registerTitle.innerHTML = `<div class="success-card border border-success rounded-1 text-center p-2 px-4">Your account is now created, go to login page</div>`;
          return json;
        }
        // IF response sends false, show error message
        else {
          registerTitle.innerHTML = `<div class="error-card border border-danger rounded-1 text-center p-2 px-4">Not able to create account</div>`;
        }
      } catch (error) {
        registerTitle.innerHTML = errorMessage();
      }
    }

    registerNewUser(`${API_HOST}${API_REGISTER}`, registerUserValue);
  });

  const modal = document.querySelector('#register-modal');
  const btn = document.querySelector('#open-register');
  const span = document.querySelector('.close');

  btn.onclick = function () {
    modal.style.display = 'block';
  };

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}
