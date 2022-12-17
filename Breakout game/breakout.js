const cvs = document.getElementById("breakOut");

const ctx = cvs.getContext("2d");

 

cvs.style.border = "1px solid #0ff"

 

//game start




var leftArrow = false;

var rightArrow = false;

 

//game var and const

const PADDLE_WIDTH = 100;

const PADDLE_HEIGHT = 20;

const PADDLE_MARGIN_BOTTOM = 50;

const BALL_RADIUS = 8;

let SCORE = 0;

let GAME_OVER = false;

let yikes = "Game Over!"

 

const paddle = {

    x : cvs.width/2 - PADDLE_WIDTH/2,

    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,

    width : PADDLE_WIDTH,

    height: PADDLE_HEIGHT,

    dx : 5

}

 

function drawBackground(){

    ctx.fillStyle = "#FFBBAA"

    ctx.fillRect(0,0,400,500)

}

 

function drawPaddle(){

    ctx.fillStyle = "#2e3548"

    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)

}

 

//control paddle

document.addEventListener('keydown', onkeydown)

document.addEventListener('keyup', onkeyup)

function onkeydown(e) {

if(e.key === 'ArrowLeft'){

    leftArrow = true;

} else if(e.key === 'ArrowRight'){

    rightArrow = true;

}

}

function onkeyup(e) {

    if(e.key === 'ArrowLeft'){

        leftArrow = false;

    } else if(e.key === 'ArrowRight'){

        rightArrow = false;

    }

    }

 //move paddle

function movePaddle(){

    if(rightArrow && paddle.x + paddle.width < cvs.width){

        paddle.x += paddle.dx;

    } else if(leftArrow && paddle.x > 0){

        paddle.x -= paddle.dx

    }

}

 

//create ball

const ball = {

    x : cvs.width/2,

    y : paddle.y - BALL_RADIUS,

    radius : BALL_RADIUS,

    speed : 4,

    dx : 3 * (Math.random() * 2-1),

    dy : -3

}

 

//draw ball

function drawBall(){

    ctx.beginPath();

 

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);

    ctx.fillStyle = "#00FFBB"

    ctx.fill();

 

    ctx.strokeStyle = "#2e3548";

    ctx.stroke();

 

    ctx.closePath();

}

 

//move ball

function moveBall(){

    ball.x += ball.dx;

    ball.y += ball.dy;

}

 

//ballwall collision

function ballWallCollision(){

    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){

        ball.dx = -ball.dx;

    }

    if(ball.y - ball.radius < 0){

        ball.dy = -ball.dy

    }

    if(ball.y + ball.radius > cvs.height){

        GAME_OVER = true;

    }

}

 

//reset ball

function resetBall(){

    ball.x = cvs.width/2;

    ball.y = paddle.y - BALL_RADIUS;

    ball.dx = 3 * (Math.random() * 2-1);

    ball.dy = -3;

}

 

//ball and paddle collision

function ballPaddleCollision(){

    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){

       

            let collidePoint = ball.x - (paddle.x + paddle.width/2);

            collidePoint = collidePoint / (paddle.width/2);

 

            let angle = collidePoint * Math.PI/3;

 

        ball.dx = ball.speed * Math.sin(angle);

        ball.dy = -ball.speed * Math.cos(angle);

    }

}

 

//create bricks

const brick = {

    row : 3,

    column : 5,

    width: 55,

    height : 20,

    offSetLeft : 20,

    offSetTop : 20,

    marginTop : 40,

    fillColor : "#2e3548"

}

 

let bricks = [];

 

function createBricks(){

    for(let r = 0; r < brick.row; r++){

        bricks[r] = [];

        for(let c = 0; c < brick.column; c++){

            bricks[r][c] = {

                x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft,

                y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,

                status : true

            }

        }

    }

}

 

createBricks();

 

//draw bricks

function drawBricks(){

    for(let r = 0; r < brick.row; r++){

        for(let c = 0; c < brick.column; c++){

            let b = bricks[r][c];

            if(b.status){

                ctx.fillStyle = brick.fillColor;

                ctx.fillRect(b.x, b.y, brick.width, brick.height);

            }

        }

    }

}

 

//brick collision

function ballBrickCollision(){

    for(let r = 0; r < brick.row; r++){

        for(let c = 0; c < brick.column; c++){

            let b = bricks[r][c];

            if(b.status){

                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){

                    ball.dy = -ball.dy;

                    b.status = false;

                    SCORE += 1

                }

            }

        }

    }

}

 

//show score

function showScore(text,textX,textY){

    ctx.fillStyle = "#000000";

    ctx.font = "25px Germania One";

    ctx.fillText(text,textX,textY)

}

 

function overText(text,textX,textY){

    ctx.fillStyle = "#000000";

    ctx.font = "70px Germania One";

    ctx.fillText(text,textX,textY);

}

 

function gameOver() {

    if(SCORE >= 15)

    GAME_OVER = true;

}

 

function draw(){

    drawPaddle();

    drawBall();

    drawBricks();

    showScore(SCORE,35,25);

 

}

 

function update(){

movePaddle();

 

moveBall();

 

ballWallCollision();

 

ballPaddleCollision();

 

ballBrickCollision();

 

gameOver();

}

 

function loop(){

 

    drawBackground();

 

    draw();

 

    update();

 

    if(GAME_OVER){

       

        overText(yikes,40,250);

    }

    if(! GAME_OVER){

        requestAnimationFrame(loop)

    }

   

}

loop();