export function redirect(response) {
  setTimeout(function () {
    if (response.ok == true) {
      window.location.replace("/pages/index.html");
    } else {
      console.log("Try again");
    }
  }, 2000);
}
