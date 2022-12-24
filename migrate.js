const fs = require("fs");
const path = require("path");
const dir = "users/";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

function migrateOld() {
  fs.readdir(dir, function(err, files) {
    files.forEach(function(file, index) {
      curFile = path.join(dir, file);
      var rawJSON = fs.readFileSync(curFile);
      var userData = JSON.parse(rawJSON);
      delete userData["followList"];
      userData["followingList"] = [];
      userData["followerList"] = [];
      fs.writeFileSync(curFile, JSON.stringify(userData));
    }
    )
  })
}

migrateOld();