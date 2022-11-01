var painter = document.getElementById("c").getContext("2d")
drawBackround();
var big = 10;
var small = 4;
for (var r = 0; r < 400/big; ++r){
    for(var c = 0; c < 400/big; ++c) {
        var x = 0 + c*big;
        var y = 0 + r*big;
        if ((c+r)%2 ==0 ){
            var color = "#555555";
        } else {
            var color = "#BBBBBB";
        }
        drawSquare(color, x, y, big);
    }
}

for (var r = 0; r < 400/big -1; ++r){
    for(var c = 0; c < 400/big -1; ++c) {
        var x = 0 + c*big + big-small/2;
        var y = 0 + r*big + big - small/2;
        if ((c+r)%2 ==0 ){
            var color = "#000000";
        } else {
            var color = "#FFFFFF";
        }
        if (r > 1/4 * 400/big && r<3/4 * 400/ big &&
        c > 1/4 * 400/big && c<3/4 * 400/ big) {
            if(color == "#000000")
            color = "#FFFFFF";
            else
            color = "#000000";
        }
    
        drawSquare(color, x, y, small);
    }
}

function drawBackround(){
painter.fillStyle = "#000000";
painter.fillRect(0, 0, 400, 400);// x, y, w, h 
}

function drawSquare(color, x, y, size){
painter.fillStyle = color;
painter.fillRect(x, y, size, size);// x, y, w, h 
}



