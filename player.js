class Player
  {
    constructor(x,y,xSpeed,ySpeed,radius)
    {
      this.x = x;
      this.y = y;
      this.xSpeed = 3;
      this.ySpeed = 3;
      this.radius = 20;
    }
    
        
    display()
    {
      push();
      fill('rgb(70,171,236)');
      rect(this.x, this.y, 30, 30,10);
      pop();
      
      push();
      fill(('#E8BEAC'));
      circle(this.x+15, this.y+15, this.radius)
      pop();
      
      push();
      fill('#795548')
      rect(this.x+31, this.y+5, 10,20)
      pop();
      
      push();
      fill('black')
      rect(this.x+31, this.y+5, 10,5)
      pop();
    }
  }