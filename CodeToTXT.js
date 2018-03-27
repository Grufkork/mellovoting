const fs = require("fs");

var codes = JSON.parse(fs.readFileSync("data/codes.json")).codes;

var empty = "";
for (var i = 0; i < codes.length; i++){
    
        empty += codes[i][0] + " ";
}
fs.writeFileSync("data/codes.txt", empty);

process.exit(0);