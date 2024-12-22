import utils from './utils'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
})

// Objects
function Star(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: 0,
      y: 3
    }
    this.friction = 0.8;
    this.gravity = 1;
  }

  Star.prototype.draw = function() {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.shadowColor = '#E3EAEF';
    context.shadowBlur = 20;
    context.fill();
    context.closePath();
    context.restore();
  };

  Star.prototype.update = function() {
    this.draw();

    // When ball hits the bottom of screen
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter();
    } else {
      this.velocity.y += this.gravity;
    }

    this.y += this.velocity.y;
  }

  Star.prototype.shatter = function() {
    this.radius -= 3;
    for (let i = 0; i < 8; i++) {
      miniStars.push(new MiniStar(this.x, this.y, 2, ));
    }
  }

  function MiniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color);
    this.velocity = {
      x: utils.randomIntFromRange(-5, 5),
      y: utils.randomIntFromRange(-15, 15)
    }
    this.friction = 0.8;
    this.gravity = 0.1;
    this.ttl = 100;
    this.opacity = 1;
  }

  MiniStar.prototype.draw = function() {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = `rgba(227, 234, 239, ${this.opacity = this.ttl / 100})`;
    context.shadowColor = '#E3EAEF';
    context.shadowBlur = 20;
    context.fill();
    context.closePath();
    context.restore();
  }

  MiniStar.prototype.update = function() {
    this.draw();

    // When ball hits the bottom of screen
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y = -this.velocity.y * this.friction;
    } else {
      this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1;
  }

  function createMountainRange(mountainAmount, height, color) {
    for (let i = 0; i < mountainAmount; i++) {
      const mountainWidth = canvas.width / mountainAmount;
      context.beginPath();
      context.moveTo(i * mountainWidth, canvas.height);
      context.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
      context.lineTo(i * mountainWidth + mountainWidth / 2 , canvas.height - height);
      context.lineTo(i * mountainWidth - 325, canvas.height);
      context.fillStyle = color;
      context.fill();
      context.closePath();
    }
  }

// Implementation
const backgroundGrad = context.createLinearGradient(0, 0, 0, canvas.height);
backgroundGrad.addColorStop(0, '#171e26');
backgroundGrad.addColorStop(1, '#3f586b');
let stars;
let miniStars;
let backgroundStars;
let ticker = 0;
let randomSpawnRate =  75;
function init() {
  stars = [];
  miniStars = [];
  backgroundStars = [];

  // for (let i = 0; i < 1; i++) {
  //   stars.push(new Star(canvas.width / 2, 30, 30, '#E3EAEF'));
  // }

  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3;
    backgroundStars.push(new Star(x, y, radius, 'white'));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = backgroundGrad;
  context.fillRect(0, 0, canvas.width, canvas.height);

   backgroundStars.forEach(backgroundStar => {
    backgroundStar.draw();
   });

   createMountainRange(1, canvas.height - 50, '#384551');
   createMountainRange(2, canvas.height - 100, '#2b3843');
   createMountainRange(3, canvas.height - 300, '#26333e');

   stars.forEach((star, index) => {
    star.update();
    if(star.radius == 0) {
      stars.splice(index, 1)
    }
   });

   miniStars.forEach((miniStar, index) => {
    miniStar.update();
    if(miniStar.ttl == 0) {
      miniStars.splice(index, 1)
    }
   });

   ticker++;

   if (ticker % randomSpawnRate == 0) {
    const x = Math.random() * canvas.width;
    stars.push(new Star(x, -100, 12, 'white'));
    randomSpawnRate = utils.randomIntFromRange(75, 200);
   }
}

init();
animate();
