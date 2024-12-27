const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'gameContainer',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let car;
let cursors;
let speed = 200;

function preload() {
  // Load a placeholder track and car from a free CDN
  // (Alternatively, you can download your own images and host them in 'assets/')
  this.load.image('track', 'https://cdn.jsdelivr.net/gh/valeksan/artrepo@main/track640x480.png');
  this.load.image('car', 'https://cdn.jsdelivr.net/gh/valeksan/artrepo@main/car64x32.png');
}

function create() {
  // Add track as a background
  const bg = this.add.image(0, 0, 'track').setOrigin(0, 0);
  bg.displayWidth = this.cameras.main.width;
  bg.displayHeight = this.cameras.main.height;

  // Create the car sprite
  car = this.physics.add.sprite(400, 300, 'car');
  car.setCollideWorldBounds(true);

  // Scale down the car a bit
  car.setScale(0.5);

  // Set up arrow-key input
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Stop car movement each frame
  car.setVelocity(0);
  car.setAngularVelocity(0);

  // Up/Down movement (forward/backward)
  if (cursors.up.isDown) {
    // move forward in the direction the car is facing
    this.physics.velocityFromAngle(car.angle - 90, speed, car.body.velocity);
  } else if (cursors.down.isDown) {
    // move backward
    this.physics.velocityFromAngle(car.angle - 90, -speed, car.body.velocity);
  }

  // Left/Right turn
  if (cursors.left.isDown) {
    car.setAngularVelocity(-150);
  } else if (cursors.right.isDown) {
    car.setAngularVelocity(150);
  }
}

// Initialize the game
new Phaser.Game(config);