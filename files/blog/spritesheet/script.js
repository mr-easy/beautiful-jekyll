var canvas1, canvas2, canvas3, context1, context2, context3;

//GameObject constructor
function GameObject(spritesheet, x, y, width, height, timePerFrame, numberOfFrames) {
    this.spritesheet = spritesheet;             //the spritesheet image
    this.x = x;                                 //the x coordinate of the object
    this.y = y;                                 //the y coordinate of the object
    this.width = width;                         //width of spritesheet
    this.height = height;                       //height of spritesheet
    this.timePerFrame = timePerFrame;           //time in(ms) given to each frame
    this.numberOfFrames = numberOfFrames || 1;  //number of frames(sprites) in the spritesheet, default 1

    //current frame index pointer
    this.frameIndex = 0;

    //time the frame index was last updated
    this.lastUpdate = Date.now();

    //to update
    this.update = function() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    //to draw on the canvas, parameter is the context of the canvas to be drawn on
    this.draw = function(context) {
        context.drawImage(this.spritesheet,
                          this.frameIndex*this.width/this.numberOfFrames,
                          0,
                          this.width/this.numberOfFrames,
                          this.height,
                          x,
                          y,
                          this.width/this.numberOfFrames,
                          this.height);
    }
}

//our hero
var hero;
var heroSpritesheet = new Image();
heroSpritesheet.src = imgSrc;
//characters in last canvas
var red, green, blue, orange;
var redSprite = new Image();
redSprite.src = redSpriteSrc;
var blueSprite = new Image();
blueSprite.src = blueSpriteSrc;
var greenSprite = new Image();
greenSprite.src = greenSpriteSrc;
var orangeSprite = new Image();
orangeSprite.src = orangeSpriteSrc;

window.onload = function() {
    canvas1 = document.getElementById("canvas1");
    context1 = canvas1.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    context2 = canvas2.getContext("2d");
    canvas3 = document.getElementById("canvas3");
    context3 = canvas3.getContext("2d");

    hero = new GameObject(heroSpritesheet, 0, 0, 1536, 256, 90, 6);

    var j = canvas3.width/4;
    var i = 70;
    red = new GameObject(redSprite, j-i, 80, 95, 15, 150, 6);
    blue = new GameObject(blueSprite, 2*j-i, 80, 112, 16, 150, 7);
    green = new GameObject(greenSprite, 3*j-i, 80, 94, 16, 150, 6);
    orange = new GameObject(orangeSprite, 4*j-i, 80, 96, 16, 150, 6);

    orange.update = green.update = blue.update = red.update = function() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame && this.frameIndex != 0) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }
    orange.draw = green.draw = blue.draw = red.draw = function(context) {
        context.drawImage(this.spritesheet,
                          this.frameIndex*this.width/this.numberOfFrames,
                          0,
                          this.width/this.numberOfFrames,
                          this.height,
                          this.x,
                          this.y,
                          2 * this.width/this.numberOfFrames,
                          2 * this.height);
    }

    canvas3.onmouseup = mouseClick;

    //call the game loop
    loop();
}

function mouseClick(event) {
    red.frameIndex = 1;
    red.lastUpdate = Date.now();
    blue.frameIndex = 1;
    blue.lastUpdate = Date.now();
    green.frameIndex = 1;
    green.lastUpdate = Date.now();
    orange.frameIndex = 1;
    orange.lastUpdate = Date.now();
}

//The Game Loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

//update function to update all the GameObjects
function update() {
    hero.update();
    red.update();
    blue.update();
    green.update();
    orange.update();
}

//draw method for drawing everything on canvas
function draw() {
    context1.clearRect(0,0,canvas1.width, canvas1.height);
    hero.draw(context1);
    hero.draw(context2);

    //last canvas
    context3.clearRect(0,0,canvas3.width, canvas3.height);
    red.draw(context3);
    blue.draw(context3);
    green.draw(context3);
    orange.draw(context3);
    context3.font = '30px Courier New';
    context3.fillStyle = "#000000";
    context3.textAlign = 'center';
    context3.fillText("CLICK", canvas3.width/2, canvas3.height - 50);
}
