class Bullet
  {
    constructor(x,y)
    {
      this.x = x;
      this.y = y;
    }
    
    move()
    {
      this.y -= 10;
    }
    
    display()
    {
      fill('#FFE500');
      circle(this.x, this.y, 10);
    }
    
    
  }