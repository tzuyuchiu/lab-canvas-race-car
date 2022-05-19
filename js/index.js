window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};

//load road image
const carRaceroard = new Image();
carRaceroard.src = 'images/road.png';
//load car image
const carBlue = new Image();
carBlue.src = 'images/car.png';
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
class Car {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    carBlue.addEventListener('load', () => {
      context.drawImage(carBlue, this.x, this.y, 40, 80);
    });
    this.draw();
  }
  draw() {
    context.drawImage(carBlue, this.x, this.y, 40, 80);
  }
  moveLeft() {
    this.x -= 20;
  }
  moveRight() {
    this.x += 20;
  }
}
class Road {
  constructor() {
    this.x = 20;
    this.y = 0;
    carRaceroard.addEventListener('load', () => {
      context.drawImage(carRaceroard, this.x, this.y, 500, 500);
    });
    this.draw();
  }
  draw() {
    context.drawImage(carRaceroard, this.x, this.y, 500, 500);
  }
}

class Obstacles {
  constructor() {
    this.height = 10;
    (this.width = Math.floor(canvas.width * 0.1)),
      (this.x = canvas.width * Math.random() * 0.7) + 20,
      (this.y = canvas.height * 0.1),
      this.draw();
  }
  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
  }
  moveOne() {
    // if (this.y < canvas.height / 3)
    this.y += 1;
  }
}

function startGame() {
  const myRoad = new Road();
  const myCar = new Car();
  const myObstacles = new Obstacles();
  let obstacles = [];
  document.addEventListener('keydown', (event) => {
    console.log('code', event.key);

    if (event.code === 'ArrowLeft') {
      myCar.moveLeft();
      myCar.draw();
    } else if (event.code === 'ArrowRight') {
      myCar.moveRight();
      myCar.draw();
    }
  });
  setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    myRoad.draw();
    myCar.draw();
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].draw();
      obstacles[i].moveOne();
    }
  }, 100 / 60);

  setInterval(() => {
    const newObstacles = new Obstacles();
    obstacles.push(newObstacles);
    // for (let i = 0; i < obstacles.length; i++) {
    //   obstacles[i].draw();
    //   obstacles[i].moveOne();
    // }
  }, 1000);
}
