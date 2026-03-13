/*
 Title: Spongebob Squarepants Burger Flip Mania
 Author: Benjamin Holmes
 Date: 08/01/2024
 Info: Spongebob Squarepants Burger Flip Mania is a time-based cooking game that is influenced by 80's 8-bit arcade, NES and Atatri games.
 In the player receives orders for burgers cooked to different preferences and the player must serve the corresponding burgers to collect
 score and add time to their remaining time. 
 The orders will come through from the top left of the screen and will be color-coded to correspond to the cooking preferences.
 Serving Raw or Burnt burgers, or burgers that are not ordered will lead to deductions in time and score.
 The prefences of cooking of the burgers is represented in different colours which change every 6 seconds:
 Red = Raw
 Blue = Medium Rare
 Green = Medium
 Yellow = Medium Well
 Brown = Well done
 Black = Burnt 
 This game only works with a gamepad and this is enabled through the p5.joystick.js library.
 To place burgers hold the L trigger, and move the burger using the Directional-Pad, then press the A button to place the burgers.
 To serve the burger hold the R trigger, and move the spatula using the Directional-Pad onto the burger until it is highlighted, 
 and then press the X button to serve.
 The game serves both as a fun time-based game and also as an educational cooking game. 


*/

//Global Variables
let burgers = []; // array of burgers
let orders = []; // array of orders
let joystick; // variable for joystick
let squareOneX = 500; // starting x position for controller
let squareOneY = 250; // starting y position for controller
let img; // variable for spatula
let img1; // variable for game over image
let img2; // variable for spongebob in game
let remainingTime = 60; // Initial remaining time in seconds
let score = 0; // variable for score
let instructionsVisible = true; // Initial state of start menu
let isSketchRunning = false; // variable to stop sketch running when start screen is present
let gamePaused = false;

//function to preload images
function preload() {
  img = loadImage('assets/spatula.png');
  img1 = loadImage('assets/game-over.png');
  
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("game-container");
  joystick = createJoystick();
  setInterval(generateOrder, 5000); // Generate a new order every 5 seconds
  
}

function draw() {
  if (isSketchRunning) {
  background(0);
  
  strokeWeight(4);
  stroke(255, 255, 255);
  fill(0);

  //legs of grill
  //left leg
  rect(windowWidth/3.12, windowHeight/1.15, windowWidth/25, windowHeight/ 5);  
  //right leg
  rect(windowWidth/1.47, windowHeight/1.15, windowWidth/25, windowHeight/ 5); 

  //top of grill
  rect(windowWidth/2, windowHeight/3, windowWidth/2.5, windowHeight/3);
  //bottom of grill
  rect(windowWidth/2, windowHeight/1.36, windowWidth/2.5, windowHeight/15);
  fill(178, 190, 181);
  rectMode(CENTER);
  //grill
  rect(windowWidth/2, windowHeight/2, windowWidth/2.5, windowHeight/2.5);
  noStroke();
  textSize(32);
  fill(255, 255, 0);
  textAlign(CENTER, TOP);
  //Text for time countdown
  text("Time: " + remainingTime, width / 2, 20);
  //Text for score
  text("Score: " + score, width / 1.1, 20);

  console.log(burgers);
  
  
 
  // Check if the instructions are not visible before processing orders and burgers
  if (!instructionsVisible && !gamePaused) {
   //loop to show burgers and for them to change colour over time   
    for (let i = 0; i < burgers.length; i++) {
      if (burgers[i].contains(squareOneX, squareOneY)) {
        burgers[i].changeColor(255, 255, 0, 50);
      } else {
        burgers[i].changeColor(0);
      }
      burgers[i].show();
    }

    // Added functions into draw
    noStroke();
    displayOrders();
    buttonControls();
    keyboardControls()
    Move()
    toolChange();
    updateTimer();
    gameOver();
    }
  }

  // Call startScreen()
  startScreen();
  startScreenKeyboard()
}





