
"use strict";


// Function to get all posts via fetch()
function getAllPosts() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };


  // Fetch posts
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com" + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      // Display posts on the page
      displayPosts(posts);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}


// Function to display posts on the page
function displayPosts(posts) {
  const mainElement = document.querySelector("main");


  // Clear existing content
  mainElement.innerHTML = "";


  // Check if there are posts to display
  if (posts && posts.length > 0) {
    // Iterate through posts and create HTML elements
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");


      // Author, time, and content
      const authorElement = document.createElement("p");
      authorElement.textContent = `Author: ${post.username}`; // Change from post.author to post.username
      const timeElement = document.createElement("p");
      timeElement.textContent = `Time: ${post.createdAt}`; // Change from post.time to post.createdAt
      const contentElement = document.createElement("p");
      contentElement.textContent = `Content: ${post.text}`; // Change from post.content to post.text


      // Append elements to the post container
      postElement.appendChild(authorElement);
      postElement.appendChild(timeElement);
      postElement.appendChild(contentElement);


      // Append post container to the main element
      mainElement.appendChild(postElement);
    });
  } else {
    // Display a message if no posts are available
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = "No posts available.";
    mainElement.appendChild(noPostsMessage);
  }
}


// Function to load profile information
function loadProfileInfo() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
  };


  // Fetch profile information
  fetch(apiBaseURL + "/api/users/" + loginData.username, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // You can customize this part to update the profile information on the page
      // For example:
      document.getElementById("fullName").innerText = data.fullName;
      document.getElementById("username").innerText = `@${data.username}`;
      document.getElementById("bio").innerText = data.bio;
    });
}


// Load profile information and posts when the page is loaded
window.onload = function () {
  if (isLoggedIn()) {
    loadProfileInfo();
    getAllPosts();
  } else {
    // Redirect to login page if not logged in
    window.location.replace("/");
  }
};

