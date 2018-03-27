const fs = require("fs");

var alternatives = 15;
//var votes = JSON.parse(fs.readFileSync("data/votes.json"));
//var votes = fs.readFileSync("./data/votes.json");

var votes = {};

for (var i = 0; i < alternatives; i++) {
    votes[i] = 0;
}

fs.writeFileSync("data/votes.json", JSON.stringify(votes));
