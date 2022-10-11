export function redirect(response) {
  setTimeout(function () {
    if (response.ok == true) {
      window.location.replace('/pages/profile/');
    } else {
      console.log('Try again');
    }
  }, 2000);
}

export function logOutUser() {
  const logOut = document.querySelector('#logout');
  console.log(logOut);

  logOut.onclick = function () {
    localStorage.clear();
    alert('You will now be logged out, welcome back!');
    setTimeout(() => {
      window.location.replace('/index.html');
    }, 2000);
  };
}

/* // Gets the date from the post and format it to new format
const dateRequested = new Date(`${requestedPosts.created}`);
const month = dateRequested.getMonth() + 1;
const date = dateRequested.getDate(2, `0`);
const year = dateRequested.getFullYear();

export const dateCreated = date + `.` + month + `.` + year;

// Gets the time from the post and format it to new format
const timeRequested = new Date(`${requestedPosts.created}`);
const hours = timeRequested.getHours();
const minutes = timeRequested.getMinutes();

export const timeCreated = hours + `:` + minutes;
 */
