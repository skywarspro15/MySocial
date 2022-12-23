const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");

const fs = require('fs');
const envfile = require('envfile');
const sourcePath = '.env';

const app = express();
const port = 8080;

app.use(express.static('public'))

function userExists(name) {
  if (fs.existsxistsSync("users/" + name + ".json")) {
    return true;
  } else {
    return false;
  }
}

function authenticateUser(name, password) {
  if (!userExists(name)) {
    return "User doesn't exist";
  }
  let rawJSON = fs.readFileSync("users/" + name + ".json", "utf-8");
  let user = JSON.parse(rawJSON);
  let res = bcrypt.compareSync(password, String(user["auth"]).trim());

  if (res) {
    return "Authentication successful";
  } else {
    return "Authentication failed";
  }

}

function addUser(name, password) {
  if (userExists(name)) {
    return "User already exists";
  }
  bcrypt.hash(password, 10, function(err, hash) {
    let userData = {};
    userData["auth"] = hash;
    userData["bio"] = "No bio yet";
    userData["followers"] = "0";
    userData["following"] = "0";
    userData["followList"] = [];
    fs.writeFileSync("users/" + name + ".json", JSON.stringify(userData));
  });
  return "Successfully created account";
}

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
})

app.get("/login", (req, res) => {
  res.sendFile("views/login.html", { root: __dirname });
})

app.get("/signup", (req, res) => {
  res.sendFile("views/signup.html", { root: __dirname });
})

app.get("/createAccount", (req, res) => {
  if (req.headers["x-mysocial-username"] && String(req.headers["x-mysocial-username"]).trim() != "" && req.headers["x-mysocial-auth"] && String(req.headers["x-mysocial-auth"]).trim() != "") {
    res.send(addUser(String(req.headers["x-mysocial-username"]).trim(), String(req.headers["x-mysocial-auth"]).trim()))
  } else {
    res.send("Please provide a username and password.")
  }
})

app.get("/authenticateAccount", (req, res) => {
  if (req.headers["x-mysocial-username"] && String(req.headers["x-mysocial-username"]).trim() != "" && req.headers["x-mysocial-auth"] && String(req.headers["x-mysocial-auth"]).trim() != "") {
    res.send(authenticateUser(String(req.headers["x-mysocial-username"]).trim(), String(req.headers["x-mysocial-auth"]).trim()))
  } else {
    res.send("Please provide a username and password.");
  }
})

app.get("/feed", (req, res) => {
  res.sendFile("views/feed.html", { root: __dirname });
})

app.listen(port, () => {
  console.log("MySocial servers started");
})
