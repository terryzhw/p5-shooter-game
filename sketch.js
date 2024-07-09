var whichCanvas = 1;
var playerCount = 0;
var enemyCount1 = 0;

let health = 100;
const maxHealth = 100;
const barWidth = 75;
const barHeight = 7.5;

let experience = 0;
const maxExperience = 100;
const expbarWidth = 75;
const expbarHeight = 7.5;

let bossHealth = 100;
const maxBossHealth = 100;
const bossBarWidth = 75;
const bossBarHeight = 7.5;

var score = 0;
var level = 0;
var spawnBoss = false;


let shieldActive = false;
let shieldDuration = 5000; 
let shieldCooldown = 5000; 
let lastShieldActivation = 0;
let shieldRadius;
let shieldX;
let shieldY;





let bossX;
let bossY;
let bossSpeed;
let bossDirection;
let bossChangeChance = 0.02;

const enemy1barWidth = 30;
const enemy1barHeight = 7.5;


var gameStart = false;

let canvasWidth = 500;
let canvasHeight = 500;
let bgTileSize = 20;
let bgTilesX = Math.ceil(canvasWidth / bgTileSize) + 1;
let bgTilesY = Math.ceil(canvasHeight / bgTileSize) + 1;
let bgOffsetX;
let bgOffsetY;
let dungeonBrick;
let video;
let video2;

let player=[];
let bullet=[];
let healthPack=[];
let enemy1 = [];
let enemyBullet = [];
let bossBullet = [];

var healthAmount = 0;







function preload()
{
  myFont = loadFont("Seagram tfb.ttf");  
  dungeonBrick = loadImage('dungeonbrick.png');
  video = createVideo('spicegif.mp4', videoLoaded);
  video1 = createVideo('skull.mp4', videoLoaded2);
  video2 = createVideo('trophy.mp4', videoLoaded3);
  dungeonBack = loadImage('dungeonback.jpg');
  
}

function setup() {
  
  startButton = createButton("Play");
  startButton.mousePressed(start);
  startButton.position(200,300);
  startButton.style('textFont', myFont);
  startButton.style('background-color', 'rgb(251,194,5)');
  startButton.size(100,30);
  
  instructButton = createButton("Instructions");
  instructButton.mousePressed(instruction);
  instructButton.position(200,330);
  instructButton.style('textFont', myFont);
  instructButton.style('background-color', 'rgb(251,194,5)');
  instructButton.size(100,30);
  
  backButton = createButton("Back");
  backButton.mousePressed(back);
  backButton.position(200,330);
  backButton.style('textFont', myFont);
  backButton.style('background-color', 'rgb(251,194,5)');
  backButton.size(100,30);
  
  setInterval(timer1, 5000);
  setInterval(timer2, 5000);
  setInterval(timer3, 2000);
  
  bgOffsetX = 0;
  bgOffsetY = 0;
  
  bossX = width / 2;
  bossY = 50;
  bossSpeed = 3;
  bossDirection = random([-1, 1]);
  
}

function draw() {
  
  
  if(whichCanvas == 1)
  {
    canvas1();
  }
  if (whichCanvas == 2)
  {
    canvas2();
  } 
  if (whichCanvas == 3)
  {
    canvas3();

  } 
  if (whichCanvas == 4)
  {
    canvas4();

  } 
  if (whichCanvas == 5)
  {
    canvas5();

  } 
}

function timer1()
{
  if (enemyCount1 <= 4 && gameStart && spawnBoss == false)
  {
    enemy1.push(new Enemy1(random(50, 450), random(50, 200)));
    enemyCount1 += 1;
  }
}







function start()
{
  if (whichCanvas == 1)
  {
    whichCanvas += 1;
    gameStart = true;
  }
}

function instruction()
{
  if (whichCanvas == 1)
  {
    whichCanvas += 2;
  }
}

function back()
{
  if (whichCanvas == 3)
  {
    whichCanvas -= 2;
  }
}

function dead()
{
  if (whichCanvas == 2)
  {
    whichCanvas = 4;
  }
}
function win()
{
  if(whichCanvas == 2)
    {
      whichCanvas = 5;
    }
}

function videoLoaded() 
{
  video.play();
  video.loop();
  
}
function videoLoaded2() 
{
  video1.play();
  video1.loop();
}
function videoLoaded3() 
{
  video2.play();
  video2.loop();
}






function canvas1()
{
  clear();
  createCanvas(500,500);
  image(video, 0, 0, width, height);
  textFont(myFont);
  textSize(150);
  fill('white');
  push();
  stroke('black');
  strokeWeight(4);
  text("Spice", 90, 250);
  pop();
  startButton.show();
  instructButton.show();
  backButton.hide();
  video.hide();
  video1.hide();
  video2.hide();
}



function canvas2()
{
  video.hide();
  video1.hide();
  video2.hide();
  createCanvas(canvasWidth,canvasHeight);
  background(255);
  startButton.hide()
  instructButton.hide()
  backButton.hide()
  

  if(playerCount == 0)
    {
      player.push(new Player(250, 250));
      playerCount += 1;
      
    }
    
  bgOffsetX = -(player[0].x % bgTileSize);
  bgOffsetY = -(player[0].y % bgTileSize);
  
  for (let i = 0; i < bgTilesY; i++) {
    for (let j = 0; j < bgTilesX; j++) {
      image(dungeonBrick, j*bgTileSize+bgOffsetX, i*bgTileSize+bgOffsetY, bgTileSize, bgTileSize);
      
    }
  }
  
  
  
  
  for(let m=0; m<player.length;m++)
  {
    player[m].display();
    
    for(let j=0; j<healthPack.length;j++)
      {
        healthPack[j].display();
        
        
        var healthDist = dist(player[m].x, player[m].y, healthPack[j].x, healthPack[j].y)
        
        if(healthDist <= 20)
          {
            healthPack.splice(j, 1)
            increaseHealth();
            healthAmount -= 1;
          }
        
        
        
      }
    
    
    
    
  for(let hit1=0; hit1<bullet.length;hit1++)
  {
    for(let enemyhit1=0; enemyhit1<enemy1.length; enemyhit1++)
      {
        enemy1Hit = dist(enemy1[enemyhit1].x, enemy1[enemyhit1].y, bullet[hit1].x, bullet[hit1].y)
        
        
        if(enemy1Hit < 10)
          {
            enemy1[enemyhit1].health -= 5;
            bullet.splice(hit1, 1);
            break;
          }
        if(enemy1[enemyhit1].health <= 0)
          {
            enemy1.splice(enemyhit1,1);
            enemyCount1 -= 1;
            increaseExperience();
            score += 1;
            break;
          }
        if (level == 1)
      {
      spawnBoss = true;
        enemy1.splice(enemyhit1, 5);
        
      
      }
      }
  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    for(let n=0; n<enemy1.length;n++)
    {
      
      enemy1[n].display(); 
      enemy1[n].move();
      
      let enemy1barFill = map(enemy1[n].health, 0, enemy1[n].maxHealth, 0, enemy1barWidth);
  

    stroke(0);
    noFill();
    rect(enemy1[n].x-20, enemy1[n].y-25, enemy1barWidth, enemy1barHeight);
  
    fill(255, 0, 0);
    rect(enemy1[n].x-20, enemy1[n].y-25, enemy1barFill, enemy1barHeight);
        
    }
  }
  
  
  
  
  
  
  
    
  
  let barFill = map(health, 0, maxHealth, 0, barWidth);
  

  stroke(0);
  noFill();
  rect(player[0].x-22, player[0].y+35, barWidth, barHeight);
  
  fill(255, 0, 0);
  rect(player[0].x-22, player[0].y+35, barFill, barHeight);
  
  push();
  textFont(myFont);
  textSize(20);
  fill('black');
  text(level, player[0].x+9, player[0].y+22);
  
  pop();
  
  let expbarFill = map(experience, 0, maxExperience, 0, expbarWidth);
  

  stroke(0);
  noFill();
  rect(player[0].x-22, player[0].y+45, expbarWidth, expbarHeight);
  
  fill('#00BCD4');
  rect(player[0].x-22, player[0].y+45, expbarFill, expbarHeight);
  
  
  if (keyIsDown(87)) { // W
    player[0].y = max(player[0].y - 3, 250);
  }
  if (keyIsDown(83)) { // S
    player[0].y = min(player[0].y + 3, canvasHeight - 30);
  }
  if (keyIsDown(65)) { // A
    player[0].x = max(player[0].x - 3, 0);
  }
  if (keyIsDown(68)) { // D
    player[0].x = min(player[0].x + 3, canvasWidth - 30);
  }
  
 


  
  for (let i=0; i<bullet.length; i++) 
  {
    bullet[i].display();
    bullet[i].move();

  }
  
  for(let dodge=0; dodge<enemyBullet.length;dodge++)
    {
      enemyBullet[dodge].display();
      enemyBullet[dodge].moveSide();
      
      for(let playerHit1=0; playerHit1<player.length;playerHit1++)
        {
          if(enemyBullet[dodge].x < player[playerHit1].x + 30 / 2 &&
      enemyBullet[dodge].x + 10 > player[playerHit1].x - 30 / 2 &&
      enemyBullet[dodge].y < player[playerHit1].y + 30 / 2 &&
      enemyBullet[dodge].y > player[playerHit1].y - 30 / 2) 
        {
            decreaseHealth();
            enemyBullet.splice(dodge,1);
        }
        }
      
      
    }
  
    if (millis() - lastShieldActivation > shieldCooldown) {
    if (keyIsPressed && key === 'q' && !shieldActive) {
      activateShield();
    }
  }
    if (shieldActive) {
    // Display the shield
    displayShield();
    
    // Check if the shield duration has elapsed
    if (millis() - lastShieldActivation > shieldDuration) {
      shieldActive = false;
      lastShieldActivation = millis();
    }
  }
  
  
  
  if (health <= 0)
    {
      dead();
    }
  
  
  
  
  if (experience>= 100)
    {
      level += 1;
      experience = 0;
    }
  
  
  if(spawnBoss)
    {
        bossX += bossSpeed * bossDirection;
        if (bossX > width - 15 || bossX < 15) {
        bossDirection *= -1; 
        }


        if (random() < bossChangeChance) {
        bossDirection *= -1;
        }
        

        push();
        fill('purple');
        rect(bossX, bossY, 30, 30, 10);
        fill('blue');
        circle(bossX+15, bossY+15, 20)
        fill('red');
        circle(bossX+20, bossY+15, 5) 
        circle(bossX+10, bossY+15, 5) 
      
      
        pop();
        shieldX = player[0].x+15;
        shieldY = player[0].y+15;
        for (let boss = bossBullet.length - 1; boss >= 0; boss--) {
        bossBullet[boss].move();
        bossBullet[boss].display();

        if (bossBullet[boss].y > height) {
        bossBullet.splice(boss, 1); 
          
          
        
        }
          for(let bossHit = player.length -1; bossHit>=0; bossHit--)
            {
            if(bossBullet[boss].x < player[bossHit].x + 30 / 2 &&
      bossBullet[boss].x + 10 > player[bossHit].x - 30 / 2 &&
      bossBullet[boss].y < player[bossHit].y + 30 / 2 &&
      bossBullet[boss].y > player[bossHit].y - 30 / 2 && shieldActive == false) 
        {
            decreaseHealth();
            bossBullet.splice(boss, 1);
            break;
          
          
        }
        bossShield = dist(shieldX, shieldY, bossBullet[boss].x, bossBullet[boss].y);
        if(bossShield <= shieldRadius/2 && shieldActive)
            {
              bossBullet.splice(boss,1);
              break;
            }
        }
          
        }
      
        for(let bossShot=0; bossShot<bullet.length;bossShot++)
          {
            bossHit = dist(bullet[bossShot].x, bullet[bossShot].y, bossX, bossY)
        
        
        if(bossHit < 15)
          {
            bossHealth -= 10;
            bullet.splice(bossHit, 1);
            break;
          }
          }

  // Occasionally fire bullets
  if (frameCount % 30 === 0) {
    bossBullet.push(new Bossbullet(bossX, bossY + 15));
  }
  let bossBarFill = map(bossHealth, 0, maxBossHealth, 0, bossBarWidth);
  

  stroke(0);
  noFill();
  rect(bossX-22, bossY+35, bossBarWidth, bossBarHeight);
  
  fill(255, 0, 0);
  rect(bossX-22, bossY+35, bossBarFill, bossBarHeight);
  
      
      if (bossHealth <= 0)
        {
          bossHealth = 0;
          win();
        }
      
    }
}

function activateShield() {
  shieldActive = true;
  lastShieldActivation = millis();
}

function displayShield() {
  push();
  noFill();
  stroke(0, 0, 255, 100);
  strokeWeight(3);
  shieldRadius = player[0].radius * 2 + 70;
  shieldX = player[0].x+15;
  shieldY = player[0].y+15;
  circle(shieldX, shieldY, shieldRadius);
  pop();
}


function keyPressed()
{
  if(keyCode == '32')
  {
    bullet.push(new Bullet(player[0].x+35, player[0].y));
  }
}

function timer2()
{
  if (gameStart)
    {
      healthAmount += 1;
  
      if(healthAmount <= 3)
      {
        healthPack.push(new Health(random(10, 490), random(250,490)));
      }
    }
}

function timer3()
{
  if (gameStart)
    {
      enemyBullet.push(new Enemybullet(0, random(250,300)));
      enemyBullet.push(new Enemybullet(0, random(300,400)));
      enemyBullet.push(new Enemybullet(0, random(400,500)));
    }
}




function canvas3()
{
  video.hide();
  video1.hide();
  video2.hide();
  startButton.hide();
  instructButton.hide();
  backButton.show();
  createCanvas(500, 500);
  background(dungeonBack);
  textFont(myFont);
  push();
  textSize(50);
  fill('white');
  text("Instructions:", 110, 100);
  pop();
  push();
  textSize(20);
  let instruct = "WASD to Move, Space to Shoot, Q for Shield, Kill Enemies to Gain Points, Killing too Many Enemies Might Cause Unforeseen Consequences!";
  fill('white');
  text(instruct,160,130,200,200);
  pop();
}

function canvas4()
{
  createCanvas(500,500);
  image(video1, 0, 0, width, height);
  startButton.hide();
  instructButton.hide();
  backButton.hide();
  video.hide();
  video2.hide();
  push();
  textFont(myFont);
  fill('red');
  textSize(100);
  stroke('black');
  strokeWeight(4);
  text("DEAD", 90, 280);
  pop();
  push();
  fill('red');
  textSize(50);
  textFont(myFont);
  stroke('black');
  strokeWeight(4);
  text("You Earned " + score + " Points!", 10, 330); 
  pop();
}

function canvas5()
{
  createCanvas(500,500)
  video.hide();
  video1.hide();
  startButton.hide();
  instructButton.hide();
  backButton.hide();
  image(video2, 0, 0, width, height);
  push();
  textSize(80)
  textFont(myFont);
  fill('gold');
  text('You Won!', 65, 130);
  pop();
  
  
}



function decreaseHealth() {
  let damage = 20;
  health -= damage;
  if (health < 0) {
    health = 0;
  }
}

function increaseExperience()
{
  let drop = 20;
  experience += drop;
  if (experience > 100)
    {
      experience = 100;
    }
}


function increaseHealth() {
  let healing = 10;
  health += healing;
  if (health > maxHealth) {
    health = maxHealth;
  }
}

