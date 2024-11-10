const addBall = document.querySelector('#addBall');
const containerElement = document.querySelector('#container');


// Declare balls array outside of any function so it's globally accessible
const balls = [];


const container = {
    clientWidth: 600,
    clientHeight: 400,
    xPos : 0,
    yPos : 0
}


function Ball (x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = randomColor();
    this.xPos = x;
    this.yPos = y;
    this.xVelocity = Math.random() * 10 - 5; 
    this.yVelocity = Math.random() * 10 - 5;
    this.intervalID = null; 
    this.element = null;
}
Ball.prototype.draw = function(){
    const ball = document.createElement('div');
    ball.style.width = this.radius * 2 + 'px';
    ball.style.height = this.radius * 2 + 'px';
    ball.style.backgroundColor = this.color;
    ball.style.borderRadius = '50%';
    ball.style.position = 'absolute';
    ball.style.left = (this.x - this.radius)  + 'px';
    ball.style.top = (this.y - this.radius)  + 'px';
    containerElement.appendChild(ball);
    this.element = ball;
}
Ball.prototype.moveWithin = function(container){
    const ballTop = this.yPos - this.radius;
    const ballBottom = this.yPos + this.radius;
    const ballLeft = this.xPos - this.radius;
    const ballRight = this.xPos + this.radius;
    if(ballTop < 0 || ballBottom > container.clientHeight){
        container.yPos += this.yVelocity;  // Move container
        this.yVelocity = -this.yVelocity;
    }

    if(ballLeft < 0 || ballRight > container.clientWidth){
        container.xPos += this.xVelocity;  // Move container
        this.xVelocity = -this.xVelocity;
    }

    this.yPos += this.yVelocity;
    this.xPos += this.xVelocity;

    // Update ball's visual position using its own element reference
    if (this.element) {
        this.element.style.left = (this.xPos - this.radius) + 'px';
        this.element.style.top = (this.yPos - this.radius) + 'px';
    }

}
Ball.prototype.startMoving = function(container) {
    if (this.intervalID === null) {  // Ensure we don't start multiple intervals for the same ball
        this.intervalID = setInterval(function(){
            this.moveWithin(container);
        }.bind(this), 20);  // Adjust the speed of the interval as desired
    }
}

function randomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function randomSize(){
    const size = Math.floor(Math.random() * 41) + 10;  // Random number between 10 and 50
    return size;
}
    











addBall.addEventListener('click', function(){
    const newBall = new Ball(container.clientWidth / 2 , container.clientHeight / 2 , randomSize());
    balls.push(newBall);
    
    newBall.draw();
    newBall.startMoving(container);
})




