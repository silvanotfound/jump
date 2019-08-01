const players = [ "Jackson", "Garcia", "Catuto", "AMIGO DO LUCIANO BY GOLIADO",
                  "Negão", "Ney", "Silva", "Primo", "Macaco", "Yuri",
                  "Ricardinho", "Carlos", "Robson","Boliva"];
let teamWhite = [];
let teamBlack = [];
let teamSelection = false;

function randomTeam() {
    let id = Math.floor(players.length * Math.random());
    let playerSelect = players[id];
    
    if (players.length != 0) {        
        if(!teamSelection){
            teamSelection = true;
            teamWhite.push(playerSelect);
        }
        else {
            teamSelection = false;
            teamBlack.push(playerSelect);
        }
        players.splice(id,1);        
    }
    else {
        return;
    }
    
    randomTeam();
}

randomTeam();
console.log(" ")
console.log("----- Time Branco -----")
for (team in teamWhite) {
    console.log(teamWhite[team]);
    
}
console.log("--------------X--------------");

console.log("----- Time Preto -----")
for (team in teamBlack) {
    console.log(teamBlack[team]);
}