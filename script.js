let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");

let box = 32;

let snake = [];


snake[0] = {
  x: 8 * box,
  y: 8 * box,
}

let comida = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

let velocidade = 100;
let direction = "right";

function criarBG(){
  context.fillStyle = "lightBlue";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function drawFood(){
  context.fillStyle = "red";
  context.fillRect(comida.x, comida.y,  box, box);
}

function criarCobrinha(){
  for(let i = 0; i < snake.length; i++) {
    context.fillStyle = "blue"
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

document.addEventListener('keydown',update);

function update(event) {
  if (event.keyCode === 37 && direction !== "right"){
    direction = "left";
  } if (event.keyCode === 38 && direction !== "down"){
    direction = "up";
  } if (event.keyCode === 39 && direction !== "left"){
    direction = "right";
  } if (event.keyCode === 40 && direction !== "up"){
    direction = "down";
  }
}


function iniciarJogo(){



  if (snake[0].x > 15 * box && direction == "right"){
    snake[0].x = 0;
    
  }else if (snake[0].y > 15 * box && direction == "down"){
    snake[0].y = 0;
  }else if (snake[0].x < 0 * box && direction == "left"){
    snake[0].x = 15 * box;
  }else if (snake[0].y < 0 * box && direction == "up"){
    snake[0].y = 15 * box;
  }


  for(let i = 1; i < snake.length; i++){
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      clearInterval(jogo)
      alert('Fim de jogo :(')
    }
  }


  criarBG();
  criarCobrinha();
  drawFood();
  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right"){
    snakeX += box;
  } if (direction === "left"){
    snakeX -= box;
  }  if (direction === "up"){
    snakeY -= box;
  } if (direction === "down"){
    snakeY += box;
  }

  if (snakeX !== comida.x || snakeY !== comida.y){

    snake.pop();
  }else{
    comida.x = Math.floor(Math.random() * 15 + 1) * box;
    comida.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,y: snakeY
  }
  snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, velocidade);
