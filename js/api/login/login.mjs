const emailForm = document.querySelector('#floatingInput');
const pwdForm = document.querySelector('#floatingPassword');
const formLogin = document.querySelector('#form');
const specificTitle = document.querySelector('#specific-title');
const loginTitle = document.querySelector('#specific-title');

import { API_HOST } from '../auth/apiBase.mjs';
import { API_LOGIN } from '../auth/apiBase.mjs';
import { redirect } from '../../function.mjs';
import { errorMessage } from '../../components/message.mjs';
import * as storage from '../storage/index.mjs';

loginTitle.innerHTML = ``;

/**
 * This is the login in function for the site.
 * when the login in button is pressed the process is started.
 * @param loginUser
 */
export function loginUser() {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the value from the login form

    const userLoginValue = {
      email: emailForm.value,
      password: pwdForm.value,
    };

    /**
     * This is a login in function, it's will collect the information from the login form
     * and send this with the API call.
     * @param {*} API_HOST inserts the API link to call
     * @param {*} data The data information thats is sent with the API
     * @returns It's return a response with information in a array if the login is correct.
     */
    async function loginUserRequest(API_HOST, data) {
      try {
        const postLoginData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(API_HOST, postLoginData);
        const json = await response.json();
        const accessToken = json.accessToken;

        // IF response sends true, proceed with the login
        if (response.ok === true) {
          // Save only the accessToken to the localStorage
          storage.save('token', accessToken);
          // Saves several values to the localStorage
          localStorage.setItem('myAccessToken', accessToken);
          localStorage.setItem('name', json.name);
          localStorage.setItem('avatar', json.avatar);
          localStorage.setItem('email', json.email);
          loginTitle.innerHTML = `<div class="success-card border border-success rounded-1 text-center p-2 px-4">Logged in is success, you will be redirected</div>`;
          redirect(response);
          return json;
        }
        // IF response sends false, stop the process with the login and show error
        else {
          loginTitle.innerHTML = `<div class="error-card border border-danger rounded-1 text-center p-2 px-4">Check your credential</div>`;
        }
      } catch (error) {
        loginTitle.innerHTML = errorMessage();
        console.log('You were not logged in, please check your credential');
      } finally {
      }
    }
    loginUserRequest(`${API_HOST}${API_LOGIN}`, userLoginValue);
  });
}
