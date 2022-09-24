// const formRegistration = document.querySelector("form");

/* formRegistration.addEventListener("submit", (prevent) => {
  prevent.preventDefault();
  const formData = new formData(formRegistration);
}); */

const url = "https://nf-api.onrender.com/api/v1/social/auth/register";

fetch(url, {
  method: "POST",
  body: JSON.stringify({
    name: "linus_aakerberg",
    email: "Linaak24002@stud.noroff.no",
    password: "ThinkPad2022",
    avatar: "https://img.service.com/avatar.jpg",
    banner: "https://img.service.com/banner.jpg",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
