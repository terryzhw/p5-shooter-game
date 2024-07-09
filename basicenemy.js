class Enemy1 
  {
    constructor(x,y,speed,dir,chance, health, maxHealth)
    {
      this.x = x;
      this.y = y;
      this.speed = 3;
      this.dir = random(-1,1);
      this.chance = 0.02;
      this.health = 10;
      this.maxHealth = 10;
    }
    
    display()
    {
      push();
      fill('green');
      rect(this.x-15, this.y-15, 20, 20)   
      pop();
      
      
      push();
      fill('white');
      circle(this.x, this.y, 5)   
      circle(this.x-10, this.y, 5)  
      pop();
      
      
    }
    
    move()
    {
      this.x += this.speed * this.dir;


      if (this.x > width - 15 || this.x < 15) 
      {
        this.dir *= -1; 
      }


      if (random() < this.chance) 
      {
        this.dir *= -1;
      }

    }
  }