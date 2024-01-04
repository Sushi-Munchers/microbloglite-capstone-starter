/* Posts Page JavaScript */

"use strict";

// Function to get all users via fetch()
function getAllUsers() {
  // GET /api/users
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  // note: the api variable is defined in auth.js
  fetch(api + "/api/posts", options)
    .then((response) => response.json())
    .then((users) => {
      // Do something with the users array...
      console.log(users);
    });
}

// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.

function loadProfileInfo() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
  };
  fetch(
    "https://microbloglite.herokuapp.com/" + "api/users/" + loginData.username,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fullName.innerText = data.fullName;
      username.innerText = `@${data.username}`;
      bio.innerText = data.bio;
    });
}


function unhiddenEditForm() {
  editForm.style.display = "block";
}

function hideEditForm() {
  editForm.style.display = "none";
}

function editProfile(event) {
  event.preventDefault();
  const loginData = getLoginData();

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("/"); // redirect back to landing page
    });
}
