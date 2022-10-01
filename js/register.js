const registerName = document.querySelector("#floatingInputName");
const registerEmail = document.querySelector("#floatingInputEmail");
const registerPwd = document.querySelector("#floatingPasswordRegister");
const registerForm = document.querySelector("#register-form");

const url = "https://nf-api.onrender.com/api/v1/social/auth/register";

/**
 * API calls
 * @param apiURL is the base API call
 * @param apiLogin is the API call to login auth
 */
const apiUrl = "https://nf-api.onrender.com/";
const apiRegister = "api/v1/social/auth/register";

/**
 *
 * @param registerUser is a addEventListener for the submit button on the login form
 */

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the value from the login form on login.html page

  const registerUserValue = {
    name: registerName.value,
    email: registerEmail.value,
    password: registerPwd.value,
  };

  async function registerNewUser(apiURL, data) {
    try {
      const registerData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(apiURL, registerData);
      console.log(response);
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {}
  }

  registerNewUser(`${apiUrl}${apiRegister}`, registerUserValue);
});

/**
 *
 * @param modal open the register modal when clicks on btn
 * @param btn A button that's is click able
 * @param span is the close button inside the register form.
 * @param window close the register when click outside the window
 */

const modal = document.querySelector("#register-modal");
const btn = document.querySelector("#open-register");
const span = document.querySelector(".close");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
