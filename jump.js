const jumpArea =  document.getElementById("jumpArea");
const scenery = jumpArea.getContext("2d");
const gravity = 1.6;
const JumoMax = 3;
let _frame = 0;
let gameState;
let score = 0;
let record = 0;
document.getElementById("jumpArea").addEventListener("mousedown", click);

const states = {
    run: 0,
    pause: 1,
    lose: 2
}

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
 const obstacles = {
    obstacle: [],
    color: ["#cc9900","#ccff33","#ffcc66","#ff99cc", "#660066"],
    time: 0,

    create: function() {
        this.obstacle.push({
             positionX: jumpArea.width,
             width: 50,
             height: 30 + Math.floor(100 * Math.random()),
             color: this.color[Math.floor(5 * Math.random())]
         });

        this.time = 30 + Math.floor(21 * Math.random());
     },

    draw: function() {
        for(let obj=0; obj < this.obstacle.length; obj++) {
            let objs = this.obstacle[obj];
            scenery.fillStyle = objs.color;
            scenery.fillRect(objs.positionX, floor.positionY - objs.height, objs.width, objs.height);
        }
    },

    update: function(){
        if(this.time == 0){
            this.create();
        }else{
            this.time--
        }

        for(let obj=0; obj < this.obstacle.length; obj++) {
            let objs = this.obstacle[obj];
            objs.positionX -= 6; // 

            if (block.positionX < objs.positionX + objs.width && 
                block.positionX + block.width >= objs.positionX &&
                block.positionY + block.height >= floor.positionY - objs.height) {
                
                gameState = states.lose;
            }
            
            if(objs.positionX <= -objs.width) {
                this.obstacle.splice(obj,1);
                obj--;
            }
        }
    },

    clear: function() {
        this.obstacle = [];
    }
 }
const block = {
    positionX: 10,
    positionY:30,
    height:40,
    width:40,
    color: "#ff6600",
    weight: 5,
    force: 20.6,
    countJump: 0,

    update: function() {
        this.weight += gravity;
        this.positionY += this.weight;

        if (this.positionY > floor.positionY - this.height) {
            this.positionY = floor.positionY - this.height;
            this.countJump = 0;
        }
    },

    jump: function() {
        if(this.countJump < JumoMax) {
            this.weight = -this.force;
            this.countJump++
        }
    },
    
    reset: function() {
        this.positionY = 30;
        this.weight = 6;
    },

    draw: function() {
        scenery.fillStyle = this.color;
        scenery.fillRect(this.positionX, this.positionY, this.width, this.height);            
    }
};

function main() {
    gameState = states.pause;
    start();
}

function start(){
    updateState();
    drawObjects();
    window.requestAnimationFrame(start);
}

function updateState(){
    _frame++;
    if(gameState == states.run){
        block.update();
        obstacles.update();
        score++;
    }
}

function drawObjects() {
    scenery.fillStyle = "#3399ff";
    scenery.fillRect(0,0, jumpArea.width, jumpArea.height);
        
    scenery.font = "25px VT323";
    scenery.fillStyle = "#fff";
    scenery.fillText(`Score:${score}` , 10, 20);

    scenery.font = "25px VT323";
    scenery.fillStyle = "#fff";
    scenery.fillText(`Record:${record}` , jumpArea.width/2 -45, 20);    
    
    floor.draw();
    obstacles.draw();    
    block.draw();

    if(gameState == states.lose){
        scenery.font = "25px VT323";
        scenery.fillStyle = "#fff";
        scenery.fillText(`You lose!` , jumpArea.width/2 -45, jumpArea.height / 2 - 30);

        scenery.font = "35px VT323";
        scenery.fillStyle = "#fff";
        scenery.fillText(`click to start!` , jumpArea.width/2 -110, jumpArea.height / 2);        
    }else if(gameState == states.pause){
        scenery.font = "50px VT323";
        scenery.fillStyle = "#fff";
        scenery.fillText(`Play` , jumpArea.width/2 -40, jumpArea.height / 2 - 15);
    }
}

function click() {
    if(gameState == states.run){
        block.jump();
    }else if(gameState == states.pause) {
        gameState = states.run;
    }else if(gameState == states.lose) {
        gameState = states.pause;
        obstacles.clear();    
        block.reset();
        record = score > record ? score: record;
        score = 0;
    }
}

main();