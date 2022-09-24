const emailForm = document.querySelector("#floatingInput");
const pwdForm = document.querySelector("#floatingPassword");
const formLogin = document.querySelector("#form");

const apiUrl = "https://nf-api.onrender.com/";
const apiLogin = "api/v1/social/auth/login";

formLogin.addEventListener("submit", (e) => {
  console.log(emailForm.value);
  console.log(pwdForm.value);
  e.preventDefault();

  const userLogin = {
    email: emailForm.value,
    password: pwdForm.value,
  };

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
      const getAccessToken = json.getAccessToken;
      localStorage.setItem("myAccessToken", getAccessToken);
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  loginUserRequest(`${apiUrl} + ${apiLogin}`);
});

// const loginForm = document.querySelector(".login-form");
//const emailForm = document.querySelector("#floatingInput");
//const pwdForm = document.querySelector("#floatingPassword");
//const formLogin = document.querySelector("#form");

const url = "https://nf-api.onrender.com";

formLogin.addEventListener("submit", (e) => {
  console.log(emailForm.value);
  console.log(pwdForm.value);
  e.preventDefault();

  const userLogin = {
    email: emailForm.value,
    password: pwdForm.value,
  };

  async function loginUser(url, data) {
    try {
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postData);
      console.log(response);
      const json = await response.json();
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      console.log(json);
      // Logs:
      // accessToken: "eyJhbGciOiJIuzI1NiIsInR...
      // avatar: ""
      // email: "test-account-a@noroff.no
      // name: "test_account_a"
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  loginUser(`${url}/api/v1/social/auth/login`, userLogin);
});

/* const loginUser = {
  email: emailForm,
  password: pwdForm,
};

async function loginRequest() {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: "emailForm.value",
        password: "pwdForm.value",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch {
  } finally {
  }
} */

// loginForm.innerHTML = ``;

/* fetch(url, {
  method: "POST",
  body: JSON.stringify({
    email: "",
    password: "",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json)); */
