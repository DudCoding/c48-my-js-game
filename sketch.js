var player, alienBoss, stone, bgImg;    
var playerImg, alienBossImg, stoneImg, ufoImg;  
var gameState = "start", score =0;  
var alien1Img, alien2Img, alien3Img;  
var alien, alienGroup, alienX;  
var laser, bossLaser, laserImg,  bossLaserImg, laserGroup, bossLaserGroup;    
var youDid;  
var hits = 0, playerLives = 5;   
var explosion;   
var randomUpDown;   
var edges;  
  
  
function preload(){  
    bgImg = loadImage("galaxy.jpg");  
  
    alienBossImg = loadImage("alien image.jpg");  
    ufoImg = loadImage("ufo.jpg");  
  
    playerImg = loadImage("spaceship.jpg");  
  
    stoneImg = loadImage("space stone.png");  
  
    alien1Img = loadImage("alien image 1.jpg");  
    alien2Img = loadImage("alien image 2.png");  
    alien3Img = loadImage("alien image 3.jpg");  
  
    laserImg = loadImage("green laser.jpg");  
    bossLaserImg = loadImage("red laser.jpg");  
  
    explosion = loadSound("explosion.mp3");  
  
}  
  
function setup(){  
    createCanvas(windowWidth-10,windowHeight-10);  
  
    player = createSprite(width/2 - 150,height-150,50,50);  
    player.addImage(playerImg);  
    player.scale = .4;  
  
    alienBoss = createSprite(width/2 - 150, height/2+55,50,50);  
      
     alien = createSprite(21939293,210932,2,2);  
  
    // alienBoss.addImage(ufoImg);  
    // alienBoss.velocityX = 6;  
    // alienBoss.velocityY = -4;   
  
  
    stone = createSprite(width/2-150, alienBoss.y + 99,50,50);  
    stone.addImage(stoneImg);  
    stone.scale = .79;  
    // stone.velocityX = 6;  
    // stone.velocityY = -4;   
  
    alienGroup = new Group();   
  
    // player.debug = true  
  
    laserGroup = new Group();  
  
    bossLaserGroup = new Group();  
  
    edges = createEdgeSprites();  
  
  
}  
  
function draw(){  
    background(bgImg);  
    drawSprites();  
  
    console.log(frameCount);  
    if(frameCount=== 2500){  
        gameState = "boss fight";  
  
        alienBoss.y = height/2;  
    }  
      
  
    player.bounceOff(edges);  
  
    if(gameState === "start"){  
        alienBoss.addImage(ufoImg);  
        fill("red");  
        textSize(25);  
        text("You have a powerful stone but that alien is stealing it! You must catch him and get it back!", width/2-376, height/2 - 300 );  
        text("Press space to begin hunting!", width/2-336, height/2 - 265 );  
        if(keyDown("space")){  
            gameState = "chase begins";  
  
        }  
  
          
    }  
  
    if(gameState === "chase begins"){  
        stone.velocityX = -6;  
        stone.velocityY = -4;   
  
        alienBoss.velocityX = -6;  
        alienBoss.velocityY = -4;   
  
        if(alienBoss.y <= 0){  
            spawnAlien();  
  
        }  
  
        // if(alien.x < 0){  
        //     score = score -2;   
        // }  
  
          
  
  
        if(keyDown("left")){  
            player.x -= 7;   
        }  
        if(keyDown("right")){  
            player.x += 7;   
        }  
        if(keyDown("up")){  
            player.y -= 7;   
        }  
        if(keyDown("down")){  
            player.y += 7;   
        }  
  
        if(keyDown("space") && frameCount % 20 === 0){  
            laser = createSprite(player.x, player.y, 20,20);  
            laser.addImage(laserImg);  
            laser.velocityX = 19;  
              
            laserGroup.add(laser);  
        }  
  
        if(laserGroup.isTouching(alienGroup)){  
            score += 1;   
            alienGroup.destroyEach();  
            laserGroup.destroyEach();  
        }  
  
  
  
  
        fill("cyan");  
        textSize(30);  
        text("Score: "+ score, windowWidth/2,200);  
  
          
    }  
  
      
    if(gameState === "boss fight" || frameCount >= 2500){  
        alienBoss.addImage(alienBossImg);  
        alienBoss.x  = windowWidth - 100;   
          
  
        console.log("(" + alienBoss.x +","+ alienBoss.y);  
       // alienBoss.y = windowHeight/2;  
        alienBoss.scale = .2;  
  
        alienBoss.debug = true;  
        alienBoss.setCollider("rectangle", 0,0, 1000,1000);  
  
        alienBoss.velocityX = 0;  
  
        alienBoss.bounceOff(edges);  
          
  
          
        if(frameCount%40===0){  
            randomUpDown = Math.round(random(1,2));  
        }  
  
        if(randomUpDown === 1){  
            alienBoss.velocityY = random(-9,-4);  
        }   
  
        if(randomUpDown === 2){  
            alienBoss.velocityY = random(4,9);  
        }  
  
  
  
  
  
        if(alienBoss.isTouching(laserGroup)){  
            hits+=1  
            explosion.play();  
            laserGroup.destroyEach();  
        }  
  
         
        if(bossLaserGroup.isTouching(player)){  
            playerLives -= 1  
            bossLaserGroup.destroyEach();  
        }  
  
  
      
  
        if(hits>= 5 || playerLives <= 0){  
            gameState = "end";  
  
        }  
  
        if(keyDown("left")){  
            player.x -= 7;   
        }  
        if(keyDown("right")){  
            player.x += 7;   
        }  
        if(keyDown("up")){  
            player.y -= 7;   
        }  
        if(keyDown("down")){  
            player.y += 7;   
        }  
        // player shooting  
        if(keyDown("space") && frameCount % 20 === 0){  
            laser = createSprite(player.x, player.y, 20,20);  
            laser.addImage(laserImg);  
            laser.velocityX = 19;  
              
            laserGroup.add(laser);  
        }  
        // boss shooting  
        if(frameCount % 20 === 0){  
            bossLaser = createSprite(alienBoss.x, alienBoss.y, 20,20);  
            bossLaser.addImage(bossLaserImg);  
            bossLaser.scale = .9;   
            bossLaser.velocityX = -19;  
              
            bossLaserGroup.add(bossLaser);  
        }  
    }  
  
    if(gameState === "end"){  
        if(score <= 5){  
            youDid = "TERRIBLE";  
        }  
        else if(score > 5 && score <= 10){  
            youDid = "GOOD";  
        }  
        else if(score > 15){  
            youDid = "AWESOME";  
        }  
                                                                                      
  
        stone.visibility = false;  
        alienBoss.visibility = false;  
  
        player.x = width + 2000;  
        stone.x = width+ 2000;  
        alienBoss.x = width + 2000;  
  
          
  
  
        if(hits >= 5){  
  
          
            fill("white");  
            textSize(40);  
            text("You did " + youDid + "! Press 'r' to restart", windowWidth/2, windowHeight/2);  
        }  
  
  
        if(playerLives <= 0){  
            fill("red");  
            textSize(40);  
            text("GAME OVER! You didn't get back your stone! Press 'r' to restart", windowWidth/2, windowHeight/2);  
        }  
  
        if(keyDown("r")){  
            gameState = "start";   
  
            player.x = width/2 - 150;  
            stone.x = width/2 - 150;  
            alienBoss.x = width/2 - 150;   
              
            alienBoss.scale = 1;   
        }  
  
          
    }  
  
      
  
}  
  
  
  
  
function spawnAlien(){  
      
      
    if(frameCount % 110 === 0){  
        alien = createSprite(width - 20, Math.round(random(0,height)), 20,20);  
        alien.velocityX = -(score + 6);  
      
  
        alienX = alien.x;   
  
  
  
          
        alien.lifetime = width/ alien.velocityX;   
  
  
  
  
  
  
        var randomImg = Math.round(random(1,3));  
  
        switch (randomImg){  
            case 1:  
                alien.addImage(alien1Img);  
                alien.scale = .6;  
                  
                break  
            case 2:   
                alien.addImage(alien2Img);  
                alien.scale = 1.4;  
                  
                break  
  
            case 3:  
                alien.addImage(alien3Img);  
                alien.scale = 0.35;   
                  
                break  
        }  
          
  
  
        alienGroup.add(alien);  
  
      
    }  
    //  if(alien.x <0){  
    //      score = score - 2;   
    //  }  
  
      
  
  
  
  
}  