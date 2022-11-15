var painter = document.getElementById("c").getContext("2d");
var button = document.getElementById("b");
var x = 190;
var y = 0;
var dx = 20;
var g = 0.5;
var dy = 10;
var jump = -10; 


var isLeft = false;
var isRight = false;
var isUp = false;
var allowJump = false;

document.addEventListener ('keydown' , onKeyDown);
document.addEventListener ('keyup' , onKeyUp);

button.addEventListener('click' , onClick);
drawBackground();
drawSquare( x, y );

function onKeyUp (e) {
 if (e.key === 'ArrowLeft'){
  isLeft = false;
} else if (e.key === 'ArrowRight') {
    isRight = false;
} else if (e.key === 'ArrowUp'){
    isUp = false;
} 
}

function onKeyDown (e) {
    if (e.key === 'ArrowLeft'){
     isLeft = true;
   } else if (e.key === 'ArrowRight') {
       isRight = true;
   } else if (e.key === 'ArrowUp'){
       isUp = true;
   } 
   }


   function onClick(){
    setInterval(onTick, 20);
}

function onTick(){

    if(isUp && allowJump) {
        dy += jump;
        allowJump = false;
    }


    dy += g;
    y+=dy;

    if(isLeft) {
        x -= dx;
    }
    if(isRight) {
        x += dx;
    }
   

if (y > 400 - 20){
    y = 400 - 20;
    dy = 0;
    allowJump = true;
} if ( x <= - 20){
    x = 400 - 20;
}
if ( x >= 400){
    x = 0 ;
}

    drawBackground();
    drawSquare ( x, y );
}

function drawSquare(x, y){
    painter.fillStyle = "#FF0000";
    if (x <0 && x > -20 ) {
        painter.fillRect (0, y, 20+x , 20 );
        painter.fillRect(400 + x, y, -x, 20 );
    }
    
    if (x > 400 - 20 && x < 400) {
        painter.fillRect (x, y, 400 - x , 20 );
        painter.fillRect(0, y, 20 + x - 400 , 20);
    }

    painter.fillRect( x, y, 20, 20 );
}

function drawBackground(){
    painter.fillStyle = "#AAAAAA";
    painter.fillRect(0, 0, 400, 400);
}
