async function signUp() {
  let name = document.getElementById("name").value;
  let pwd = document.getElementById("pwd").value;

  let lblName = document.getElementById("lblName");
  let lblPwd = document.getElementById("lblPwd");

  let button = document.getElementById("signUp");

  button.innerText = "Signing up...";
  lblName.innerText = "username";
  lblPwd.innerText = "password";

  let res = await fetch(window.location.origin + "/createAccount", {
    method: 'GET',
    headers: {
      'X-MySocial-Username': name,
      'X-MySocial-Auth': pwd,
    },
  })

  let authStatus = await res.text();
  console.log(authStatus);

  if (authStatus == "Please provide a username and password.") {
    lblName.innerText = "username (Please enter a username.)";
    lblPwd.innerText = "password (Please enter a password.)";
  }

  if (authStatus == "User already exists") {
    lblName.innerText = "username (This name is already taken.)";
  }

  if (authStatus == "Successfully created account") {
    window.location.href = "/feed";
  }
  button.innerText = "Sign up";
}

async function logIn() {
  let name = document.getElementById("name").value;
  let pwd = document.getElementById("pwd").value;

  let lblName = document.getElementById("lblName");
  let lblPwd = document.getElementById("lblPwd");

  let button = document.getElementById("logIn");

  button.innerText = "Logging in...";
  lblName.innerText = "username";
  lblPwd.innerText = "password";

  let res = await fetch(window.location.origin + "/authenticateAccount", {
    method: 'GET',
    headers: {
      'X-MySocial-Username': name,
      'X-MySocial-Auth': pwd,
    },
  })

  let authStatus = await res.text();
  console.log(authStatus);

  if (authStatus == "Please provide a username and password.") {
    lblName.innerText = "username (Please enter a username.)";
    lblPwd.innerText = "password (Please enter a password.)";
  }

  if (authStatus == "User doesn't exist") {
    lblName.innerText = "username (This user doesn't exist.)";
  }

  if (authStatus == "Authentication failed") {
    lblPwd.innerText = "password (Incorrect password.)";
  }

  if (authStatus == "Authentication successful") {
    window.location.href = "/feed";
  }
  button.innerText = "Log in";
}