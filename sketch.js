var itachi
var itachiImage
var itachiImage2
var itachiImage3
var itachiImage4
var itachiImage5
var itachiimage12
var ground
var enemy,enemy1,enemy2,enemy3;
var score=0
var enemyGroup
var GameState="play"
var InvisibleGround
var itachiCollided
var gameOver,gameoverimage
var gamesound,enemydepth
function preload(){
itachiImage=loadAnimation("Image1.png","Image2.png","Image3.png","Image4.png","Image5.png","image12.png")
groundImage=loadImage("image6.jpeg")
itachiCollided=loadImage("Image1.png")
enemy1Image=loadImage("image7.png")
enemy2Image=loadImage("image9.png")
enemy3Image=loadImage("image10.png")
gameoverimage=loadImage("gameover.jpg")
gamesound=loadSound("sound.mp3")
}
function setup() {
  createCanvas(800,400);
  //createSprite(400, 200, 50, 50);
  ground=createSprite(400,200,800,400);
  ground.addAnimation("go",groundImage)
  ground.scale=5.5

  itachi=createSprite(250,300,50,50)
itachi.addAnimation("fly",itachiImage)
itachi.scale=2
itachi.addImage("collided",itachiCollided)
enemyGroup=new Group()
InvisibleGround=createSprite(400,height-20,width,10)
InvisibleGround.visible=false
gameOver=createSprite(width/2,height/2)
gameOver.scale=1
gameOver.addImage(gameoverimage)
gameOver.visible=false
//itachi.debug=true
itachi.setCollider("rectangle",0,0,50,100)
}

function draw() {
  background(255,255,255);  
if(GameState==="play"){
if(keyWentDown("space")){
itachi.velocityY=-12

}
itachi.velocityY+=0.5
if(ground.x>800){
ground.x=ground.width/2

}
if(frameCount%80===0){
spawnEnemies()

}
if(frameCount%10===0){
score=score+1

}
ground.velocityX=5

if(enemyGroup.isTouching(itachi)){
GameState="end"
gamesound.play()

}
}

else if(GameState==="end"){
ground.velocityX=0
itachi.velocityY=0
enemyGroup.setVelocityXEach(0)
enemyGroup.setLifetimeEach(-1)
itachi.changeImage("collided",itachiCollided)
gameOver.depth=enemydepth+1
gameOver.visible=true

}
itachi.collide(InvisibleGround)
  drawSprites();
  fill("red")
  textSize(20)
  text("score: "+score,width-100,50)
  
}
function spawnEnemies(){
var enemy=createSprite(width,250,30,30)
enemy.setCollider("rectangle",0,0,50,100)
enemy.velocityX=-5
var rand=Math.round(random(1,3))
switch(rand){
  case 1:enemy.addImage(enemy3Image)
  break
  case 2:enemy.addImage(enemy1Image)
  break
  case 3:enemy.addImage(enemy2Image)
  break
  
  
}
//enemy.debug=true
enemy.scale=1.5
enemydepth=enemy.depth
enemy.lifetime=width/enemy.velocityX
enemyGroup.add(enemy)
}