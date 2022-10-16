import { errorMessage } from './components/message.mjs';

/**
 * This is a redirection functions that's will be triggered on several other
 * functions just to redirect the user to another page if the operation was successful.
 * @param {boolean} response checks if the response is true or false
 * @returns the user will be redirected to the home/start page.
 */
export function redirect(response) {
  if (response.ok == true) {
    window.location.replace('/pages/profile/');
  } else {
    return errorMessage('');
  }
}

/**
 * This function will redirect the user after they have deleted one of there
 * owns posts.
 * @param redirectDelete is a specific redirection after deleting a post.
 */
export function redirectDelete() {
  window.location.replace('/pages/profile/');
}

/**
 * This function will redirect the user after they have deleted one of there
 * owns posts.
 * @param redirectDelete is a specific redirection after deleting a post.
 */
export function redirectRegister() {
  if (response.ok == true) {
    window.location.replace('/index.html');
  } else {
    return errorMessage('Was not able to create an account, please try again!');
  }
}

/**
 * This function will log-out the user when they hit the log out button in the navBar.
 * It's will remove all the information in the localStorage. There is no specific
 * data/information that's need to be saved so the .clear() will delete all.
 * @param logOutUser when the button log out is pressed the function will be triggered.
 * @param alert will trigger an pop-up with information that's the user us logged out.
 * @return The user is sent back to the login page.
 */
export function logOutUser() {
  const logOut = document.querySelector('#logout');

  logOut.onclick = function () {
    localStorage.clear();
    alert('You will now be logged out, welcome back!');
    setTimeout(() => {
      window.location.replace('/index.html');
    }, 2000);
  };
}
