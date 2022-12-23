const fs = require("fs");
const dir = "users";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

function migrateOld() {
  let rawJSON = fs.readFileSync("users.json");
  let users = JSON.parse(rawJSON);

  console.log("Starting to migrate...");

  for (let user of Object.keys(users)) {
    console.log("Migrating user: " + user);
    let userData = {};
    userData["auth"] = users[user];
    userData["bio"] = "No bio yet";
    userData["followers"] = "0";
    userData["following"] = "0";
    userData["followList"] = [];
    fs.writeFileSync("users/" + user + ".json", JSON.stringify(userData));

  }

}

migrateOld();