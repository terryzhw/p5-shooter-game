class Health
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
  }
 display()
  {
    push();
    fill('white');
    circle(this.x, this.y,20)    
    pop();
    
    push();
    fill('red');
    rect(this.x-10, this.y-3, 20,5,10)
    rect(this.x-2.5, this.y-10, 5,20,10)
    pop();
  }
}