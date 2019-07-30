const jumpArea =  document.getElementById("jumpArea");
const scenery = jumpArea.getContext("2d");
const gravity = 1.5;
const JumoMax = 3;
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
 const obstacles = {
    obstacle: [],
    color: ["#cc9900","#ccff33","#ffcc66","#ff99cc", "#660066"],
    time: 0,

    create: function() {
        this.obstacle.push({
             positionX: jumpArea.width,
             width: 20 + Math.floor(30 * Math.random()),
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
            objs.positionX -= 5; 

            if(objs.positionX <= -objs.width) {
                this.obstacle.splice(obj,1);
                obj--;
            }
        }
    }
 }
const block = {
    positionX: 10,
    positionY:10,
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
    block.update();
    obstacles.update();
}

function drawObjects() {
    scenery.fillStyle = "#3399ff";
    scenery.fillRect(0,0, jumpArea.width, jumpArea.height);
    floor.draw();
    obstacles.draw();
    block.draw();
}

function click() {
    block.jump();
}

main();