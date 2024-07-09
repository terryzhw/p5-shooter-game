class Enemybullet
  {
    constructor(x,y,speed)
    {
      this.x = x;
      this.y = y;
      this.speed = 5;
    }
    
    
    display()
    {
      push();
      fill('cyan');
      rect(this.x,this.y, 20, 10,10)
      pop();
    }
    
    moveSide()
    {
      this.x += this.speed;
    }
    
  }