var io;
/*  
Första personen som ser det här som:
    Inte heter något av följande namn:
        - Jesper
        - Griffin
        - Simon
        -Tim
    Inte ser det här på någon annans skärm

Får 10 kr av Griffin (Grufkork)
*/

var songs = [
    "Det börjar värka kärlek banne mig", //0
    "Dansa i neon", //1
    "Fångad av en stormvind", //2
    "Kom och ta mig", //3
    "Give me your love", //4
    "Sing for me", //5
    "Hero", //6 
    "Moving on", //7
    "Manboy", //8 
    "Hello goodbye", //9
    "You", //10
    "Heroes", //11
    "Bada nakna", //12
    "If I were sorry", //13
    "Hold on" //14
];

var a = 0; //Because foreach is cooler than for
songs.forEach(function(value) {
    a++;
    var option = document.createElement("option");
    option.innerHTML = (a) + ". " + value;
    document.getElementById("songList").add(option);
});
//document.getElementById("songList").selectedIndex = "1";

const serverAddress = /*"https://voting-gryphyx.c9users.io";*/"https://139.59.209.179:8080";

document.getElementById("connect").onclick = function() {
    /*var socket = io.connect("https://voting-gryphyx.c9users.io:8080");
    socket.on("connect", function(){
        socket.emit("code", document.getElementById());
    });*/
    //if (document.getElementById("code").value == ){
    hide("login");
    show("waiting");
    document.getElementById("status").innerHTML = "Ansluter till Servern...";
    hide("ok");
    var socket = io.connect(serverAddress);

    socket.on("connect", function() {
        document.getElementById("status").innerHTML = "Skickar kod...";
        socket.emit("credentials", document.getElementById("code").value);
        
        socket.on("votingNotOpen", function(){
            document.getElementById("status").innerHTML = "Slussarna är inte öppna ännu";
            setClick(function(){
                hide("waiting");
                show("login");
            });
        });
        
        socket.on("codeReply", function(data) {
            if (data.status == 1) {
                document.getElementById("status").innerHTML = "Kod OK";
                setClick(function() {
                    hide("waiting");
                    show("vote");
                    document.getElementById("votesLeft").innerHTML = "Röster kvar: " + data.uses;
                });
            }else if(data.status == 2){
                document.getElementById("status").innerHTML = "Alla röster ladgda!";
                setClick(function() {
                    hide("waiting"); 
                    show("login");
                });
            }
            else {
                //socket.disconnect();
                document.getElementById("status").innerHTML = "Ogiltlig kod";
                setClick(function() {
                    hide("waiting");
                    show("login");
                });
            }
            socket.disconnect();
        });
    });
    //show("songSelect");
    //}
};

function show(id) {
    document.getElementById(id).style.display = "block";
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

document.getElementById("sendVote").onclick = function() {
    if (document.getElementById("songList").selectedIndex == 0) return;

    var socket = io.connect(serverAddress);
    socket.on("connect", function() {
        socket.emit("vote", { code: document.getElementById("code").value, vote: document.getElementById("songList").selectedIndex - 1 });
        hide("vote");
        show("waiting");
        document.getElementById("status").innerHTML = "Skickar röst...";
        socket.on("codeReply", function(data) {
            if (data.status == 1) {
                document.getElementById("status").innerHTML = "Röst registrerad!";
                setClick(function() {
                    hide("waiting");
                    show("vote");
                    document.getElementById("votesLeft").innerHTML = "Röster kvar: " + data.uses;
                });
            }
            else {
                document.getElementById("status").innerHTML = "Ogiltlig kod";
                setClick(function() {
                    hide("waiting");
                    show("login");
                });
            }
            socket.disconnect();
        });
    });
};

function setClick(func){
    show("ok");
    document.getElementById("ok").onclick=func;
}