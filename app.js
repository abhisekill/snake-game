const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');

pen.fillStyle = 'yellow';
pen.font ='40px sans-serif';


let cell_size = 67;
let canvas_w = 1200;
let canvas_h = 735;
let food = null;
let score = 0;

const snake = {

        // initial length of the snake
        init_len: 1,

        // cells contain all {x,y} of each cell of snake
        cells: [],

        // initial direction of movement of snake
        direction: 'right',

        createSnake: function(){

            for(let i=0; i<this.init_len ; i++){

                this.cells.push({
                    x:i,
                    y:0,
                })
            }
        },


        drawSnake: function(){

            for(let cell of this.cells){

                pen.fillRect(cell.x*cell_size ,cell.y*cell_size ,cell_size-2 ,cell_size-2);
            }
        },


        updateSnake: function(){

            //getting the head of snake means last node of cells
            let headX = this.cells[this.cells.length-1].x;
            let headY = this.cells[this.cells.length-1].y;

            // food and head of snake are colliding
            if(headX === food.x && headY === food.y){
                food = getfood();
                score++;
            }else{

                // removing the tail of snake means the first node of cells
                this.cells.shift();
            }

            // here we are moving the head of snake 
            let nextX, nextY;

            if(this.direction == 'up'){
                nextX = headX;
                nextY = headY-1;

                if(nextY * cell_size < 0){

                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText('Game Over',50,100);
                }

            }else if(this.direction == 'down'){
                nextX = headX;
                nextY = headY+1;

                if(nextY * cell_size >= canvas_h){

                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText('Game Over',50,100);
                }

            }else if(this.direction == 'left'){
                nextX = headX-1;
                nextY = headY;

                if(nextX * cell_size < 0){

                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText('Game Over',50,100);
                }
            }else{
                nextX = headX + 1;
                nextY = headY;

                if(nextX * cell_size >= canvas_w){

                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText('Game Over',50,100);
                }
            }

            // adding new head to snake
            this.cells.push({
                x: nextX,
                y: nextY
            })
            
        }

}

// initialize
function init(){

    snake.createSnake();
    pen.fillText(`Score ${score}`,50,50);

    food = getfood();

    function keypressed(e){

        if(e.key === 'ArrowUp'){
            snake.direction = 'up';
        }else if(e.key === 'ArrowDown'){
            snake.direction = 'down';
        }else if (e.key === 'ArrowLeft'){
            snake.direction = 'left';
        }else{
            snake.direction = 'right';
        }

        console.log(snake.direction);
    }

    document.addEventListener('keydown', keypressed);
}

// draw
function draw(){

    pen.clearRect(0,0, canvas_w ,canvas_h);
    pen.fillText(`Score ${score}`,50,50);

    pen.fillStyle = 'blue';
    pen.fillRect(food.x*cell_size, food.y*cell_size, cell_size-2, cell_size-2);

    pen.fillStyle = 'yellow'
    snake.drawSnake();
    

}

// update
function update(){

    snake.updateSnake();
}

// Game Loop

function gameLoop(){
    draw();
    update();
}


// generating the food for snake
function getfood(){

    const foodX = Math.floor((Math.random() * (canvas_w-cell_size)) / cell_size);
    const foodY = Math.floor((Math.random() *(canvas_h-cell_size))/ cell_size);

    const food = {
        x:foodX,
        y:foodY
    }

    return food;
}

//calling the initialize function
init();
const id = setInterval(gameLoop,100);


