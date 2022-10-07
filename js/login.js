const emailForm = document.querySelector("#floatingInput");
const pwdForm = document.querySelector("#floatingPassword");
const formLogin = document.querySelector("#form");

import { redirect } from "./function.js";

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = "https://nf-api.onrender.com/";
const apiLogin = "api/v1/social/auth/login";

/**
 *
 * @param formLogin is a addEventListener for the submit button on the login form
 */

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the value from the login form on login.html page

  const userLoginValue = {
    email: emailForm.value,
    password: pwdForm.value,
  };

  // async function for the API call to login.
  async function loginUserRequest(apiUrl, data) {
    try {
      const postLoginData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(apiUrl, postLoginData);
      const json = await response.json();
      const accessToken = json.accessToken;
      const myAccessToken = accessToken;
      localStorage.setItem("myAccessToken", myAccessToken);
      console.log(response.ok);
      console.log(json);
      redirect(response);
      return json;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  loginUserRequest(`${apiUrl}${apiLogin}`, userLoginValue);
});
