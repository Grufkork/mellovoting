"use strict";
const fs = require("fs"),
    chars = "abcdefghijklmnopqrstuvwxyz0123456789";

var numberOfCodes = 400;
var codeLength = 5;

var codes = [];
for (var i = 0; i < numberOfCodes; i++) {
    var code = "";
    for (var x = 0; x < codeLength; x++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    /*for (var y = 0; y <= codes.length; y++) {
        if (code == codes[y]) {
            i--;
            console.log("Duplicate");
        }
        else {
            codes.push([code, 3]);
            console.log(code);
        }
    }*/

    //if(!codes.indexOf(code)) ;
    codes.indexOf(code)<0?codes.push([code, 3]):i--; //EN RAD, 25 TECKEN :D

    /*
    if (codes.indexOf(code) != -1) {
        i--;
        continue;
    }
    codes.push(code);
    */

    /* Det går också att göra så här: Lika många rader men jag tycker den ovanför ^ är snyggare. Färre brackets med, man slipper else
    if(codes.indexOf(code) != -1){
        i--;
    }else{
        codes.push(code);
    }
    */

    //var code = Math.floor(Math.random() * codeLength);

}
//console.log(codes);
fs.writeFileSync("./data/codes.json", JSON.stringify({ codes: codes}));

process.exit(0);