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
