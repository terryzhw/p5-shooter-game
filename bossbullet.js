class Bossbullet
  {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
  }

  move() {
    this.y += this.speed;
  }

  display() {
    fill('cyan');
    rect(this.x,this.y, 10, 20,10)
  }
  }