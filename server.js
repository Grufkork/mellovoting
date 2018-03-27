"use strict";

var votingOpen = true;

const socketIo = require("socket.io"),
	fs = require("fs"),
	http = require("http"),
	networkSettings = {
		port: 8080,
		ip: "0.0.0.0"
	};

console.log("loading current votes");
var songs;
try {
	songs = JSON.parse(fs.readFileSync("./data/votes.json"));
}
																									catch (e) {//JESPER TYCKER DET HÄR VAR EN BRA IDÉ
	songs = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0 };
																												}//Ännu bättre idé...
/*class Code {
	constructor(code, uses) {
		this.code = code;
		this.uses = uses;
	}
}*/

/*var codes = [
	[1, Infinity],
	[2, Infinity]
];*/

console.log("Loading codes.json");
var codes = JSON.parse(fs.readFileSync("./data/codes.json")).codes;

var httpServer = http.createServer();
httpServer.listen(networkSettings.port, networkSettings.ip);
var io = socketIo.listen(httpServer);

io.sockets.on("connection", function(socket) {
	if(!votingOpen){
		socket.emit("votingNotOpen");
		return;
	}
	console.log("Connection");
	socket.on("credentials", function(data) {
		var ok = false;
		console.log(data);
		for (var i = 0; i < codes.length; i++) {
			if (codes[i][0] == data.toLowerCase()) {
				ok = true;
				socket.loginCodeIndex = i;
				socket.emit("codeReply", { status: 1, uses: codes[i][1] });
				i = codes.length;
			}

		}
		if (!ok) {
			socket.emit("codeReply", { status: 0 });
		}
	});

	socket.on("vote", function(data) {
		var codeOk = false;
		var codeIndex = 0;
		for (var i = 0; i < codes.length; i++) {
			if (codes[i][0] == data.code.toLowerCase()) {
				if (codes[i][1] > 0) {
					codeOk = true;
					codeIndex = i;
					i = codes.length;
				}
				else {
					socket.emit("codeReply", { status: 2 });
				}
			}
		}

		if (!codeOk) {
			socket.emit("codeReply", { status: 0 });
			return;
		}
		else {
			codes[codeIndex][1]--;
			songs[data.vote]++;
			socket.emit("codeReply", { status: 1, uses: codes[codeIndex][1] });
			console.log("Voted: " + data.vote);
		}
	});
});

console.log("Started");

setInterval(function() {
	fs.writeFile("./data/votes.json", JSON.stringify(songs));
	fs.writeFile("./data/codes.json", JSON.stringify({ codes: codes }));
}, 10000);
