//File containing all Functions for Spongebob Squarepants Burger Flip Mania


//function to create controls for placing and serving burgers and also to restart the game
//My fellow student Marcus Round was very helpful with using the p5.Joystick library
function buttonControls() {
    let burgerToRemove = -1; // Initialize to an invalid index
   
    //hold R trigger and move spatula with directional-pad and flip highlighted burger with X button
    for (let i = burgers.length - 1; i >= 0; i--) {
      if (burgers[i].contains(squareOneX, squareOneY) &&
          joystick.getButtonPressedByIndex(0, 3) && joystick.getButtonPressedByIndex(0, 5)) {
          burgerToRemove = i;   
          break; // Stop searching after finding the first burger under the spatula
      }
    }
  
    if (burgerToRemove !== -1) {
      // Check if the removed burger matches any order
      checkOrder(burgers[burgerToRemove]);
      burgers.splice(burgerToRemove, 1);
    }
    
    //hold L trigger and move burger with directional-pad and place using the A button
    if (burgers.length <= 30 &&
        joystick.getButtonPressedByIndex(0, 1) && joystick.getButtonPressedByIndex(0, 4) &&
        squareOneX > windowWidth/3.17 && squareOneX < windowWidth/1.4615 &&
        squareOneY > windowHeight/3.02 && squareOneY < windowHeight/1.499) {
      createNewBurger();
    }
    
    //Press select to restart the game
    if(joystick.getButtonPressedByIndex(0, 8)){
      location.reload()
    }
    
}
  
//function for start screen that begins the game  
function startScreen() {
  let start = document.getElementById("instructions");

  if (joystick.getButtonPressedByIndex(0, 9) == true) {
    // Toggle the visibility state
    instructionsVisible = !instructionsVisible;

    // Set the display property based on the new state
    start.style.display = instructionsVisible ? "block" : "none";

    // Start or stop the sketch based on visibility
    isSketchRunning = !instructionsVisible;

    // Pause or resume the game logic based on visibility
    gamePaused = instructionsVisible;
  }
}
  
//function changes tool to spatula by the R trigger, and to burger when pressing L trigger  
function toolChange() {
  if (joystick.getButtonPressedByIndex(0, 5) ||   keyIsDown(17) )  {
    image(img, squareOneX, squareOneY, img.width/6, img.height/6);
  } else if (joystick.getButtonPressedByIndex(0, 4) || keyIsDown(16) ) {
    stroke(255);
    strokeWeight(1);
    fill(255, 0, 0);
    ellipse(squareOneX, squareOneY, width/30, width/30);
  }
}

// keyboard version of buttonControls
function keyboardControls() {
  let burgerToRemove = -1;

  // Hold CTRL (R trigger) + press D to flip/remove burger
  for (let i = burgers.length - 1; i >= 0; i--) {
    if (
      burgers[i].contains(squareOneX, squareOneY) &&
      keyIsDown(17) &&   // left ctrl
      keyIsDown(32)      // space
    ) {
      burgerToRemove = i;
      break;
    }
  }

  if (burgerToRemove !== -1) {
    checkOrder(burgers[burgerToRemove]);
    burgers.splice(burgerToRemove, 1);
  }

  // Hold Shift (L trigger) + press E to place burger
  if (
    burgers.length <= 30 &&
    keyIsDown(16) &&   // shift
    keyIsDown(32) &&   // space
    squareOneX > windowWidth/3.17 &&
    squareOneX < windowWidth/1.4615 &&
    squareOneY > windowHeight/3.02 &&
    squareOneY < windowHeight/1.499
  ) {
    createNewBurger();
  }

  // Press R to restart
  if (keyIsDown(82)) {  // R
    location.reload();
  }
}

// keyboard version of startScreen
function startScreenKeyboard(keyCodePressed) {
  let start = document.getElementById("instructions");

  // Detect single press of Enter
  if (keyCodePressed === ENTER) {

    instructionsVisible = !instructionsVisible;

    start.style.display = instructionsVisible ? "block" : "none";

    isSketchRunning = !instructionsVisible;
    gamePaused = instructionsVisible;
  }
}

function keyPressed() {
  startScreenKeyboard(keyCode);
}
  
//funtion to check if burgers are overlapping and if they are not then a burger can be placed on that part of the grill  
function createNewBurger() {
  let x = squareOneX;
  let y = squareOneY;

  // Check if the proposed burger location overlaps with any existing burgers
  let overlapping = false;
  for (let i = 0; i < burgers.length; i++) {
    let d = dist(x, y, burgers[i].x, burgers[i].y);
    if (d < burgers[i].r * 1.2) {
      overlapping = true;
      break; // Exit the loop early if overlap is found
    }
  }

  // If no overlap is found, create a new burger
  if (!overlapping) {
    let r = width/30;
    let b = new Burger(x, y, r);
    burgers.push(b);
  }
}

function Move() {
  const speed = 2.5;

  let dx =
      joystick.getButtonPressedByIndex(0, 15) -
      joystick.getButtonPressedByIndex(0, 14) +
      keyIsDown(RIGHT_ARROW) -
      keyIsDown(LEFT_ARROW);

  let dy =
      joystick.getButtonPressedByIndex(0, 13) -
      joystick.getButtonPressedByIndex(0, 12) +
      keyIsDown(DOWN_ARROW) -
      keyIsDown(UP_ARROW);

  squareOneX += speed * dx;
  squareOneY += speed * dy;
}

//function to update timer
function updateTimer() {
  // Decrease the remaining time every second
  if (frameCount % 60 === 0 && remainingTime > 0) {
    remainingTime--;
  }
}
  
//function for game over screen if time runs out or orders length reaches 20  
function gameOver(){
  if(orders.length == 20 || remainingTime <=0) {
    // 20 orders or time running out means Game Over
    background(0);
    imageMode(CENTER);
    //game over image courtesy of Midjourney.ai
    image(img1, windowWidth/2, windowHeight/2);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(0, 255, 0);
    stroke(255, 255, 0);
    strokeWeight(10)
    text('GAME OVER', windowWidth/2, windowHeight/2);
    text('PRESS R TO RESTART', windowWidth/2, windowHeight/1.08);
  } 
}

//function to create orders from orders array 
//I had help from chatGPT with the order system
function generateOrder() {
  // Only generate orders if instructions are not visible
  if (!instructionsVisible) {
    // Define color names for each stage
    let colors = ["Medium Rare", "Medium", "Medium Well", "Well Done"];
    // Choose a random color for the order
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    // Add the order to the orders array
    orders.push(randomColor);
  }
}

//function to display orders in top left of the game screen
function displayOrders() {
  textAlign(LEFT, TOP);
  textSize(32);
  fill(255, 255, 0);
  text("Orders:", 50, 20); // Title above orders
  textSize(20);
  for (let i = 0; i < orders.length; i++) {
    let textColor = getColorRGB(orders[i]);
    fill(textColor[0], textColor[1], textColor[2]);
    text(orders[i], 50, 50 + i * 30); // Adjust the Y position to separate orders
  }
}
  

//function to check if order is on the order list and whether to add time and score or take away time and score  
//I had help from chatGPT with the order system
function checkOrder(burger) {
  // Check if the removed burger matches any order
  let orderIndex = orders.indexOf(burger.color);
  if (orderIndex !== -1) {
    // Award points for correct order
    score += 10;
    remainingTime += 5;
    // Remove the matched order from the orders array
    orders.splice(orderIndex, 1);
  } else if(burger.color == "Raw" || "Burnt" ){
    score -= 10;
    remainingTime -= 2;
  } else {
    // Deduct points for incorrect order
    score -= 10;
  }
}
  
// function to get the color name based on RGB values
function getColorName(color) {
  let colorNames = {
    "255,0,0": "Raw", // red
    "0,0,255": "Medium Rare",  //blue
    "0,255,0": "Medium", //green
    "255,255,0": "Medium Well",   //yellow
    "139,69,19": "Well Done",  //brown
    "0,0,0": "Burnt"  //black
  };
  return colorNames[color.join()];

}

// function to get the RGB values based on color name
function getColorRGB(colorName) {
  let colorValues = {
    "Raw": [255, 0, 0],        // Red
    "Medium Rare": [0, 0, 255], // Blue
    "Medium": [0, 255, 0],  // Green
    "Medium Well": [255, 255, 0],   // Yellow
    "Well Done": [139, 69, 19],     // Brown
    "Burnt": [255, 255, 255]       // Black
  };
  return colorValues[colorName];
}  

