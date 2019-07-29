const jumpArea =  document.getElementById("jumpArea");
const scenery = jumpArea.getContext("2d");
let _frame = 0;
document.getElementById("jumpArea").addEventListener("mousedown", click);

const floor = {
    positionX: 0,
    positionY:250,
    height:50,
    color: "#ffff99",

    draw: function() {
        scenery.fillStyle = this.color;
        scenery.fillRect(this.positionX, this.positionY, jumpArea.width, this.height);            
    }
};

const block = {
    positionX: 10,
    positionY:10,
    height:40,
    width:40,
    color: "#ff6600",

    draw: function() {
        scenery.fillStyle = this.color;
        scenery.fillRect(this.positionX, this.positionY, this.width, this.height);            
    }
};

function main() {
    start();
}

function start(){
    updateState();
    drawObjects();
    window.requestAnimationFrame(start);
}

function updateState(){
    _frame++;
}

function drawObjects() {
    scenery.fillStyle = "#3399ff";
    scenery.fillRect(0,0, jumpArea.width, jumpArea.height);
    floor.draw();
    block.draw();
}

function click() {
    console.log("opa!");
}

main();