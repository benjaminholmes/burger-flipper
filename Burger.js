// File for Burger Class

//The youTube video '7.5: Removing Objects from Arrays - p5.js Tutorial' by The Coding Train was a helpful reference point
//for my burger class and removing overlapping objects

class Burger {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.brightness = 0;
      // Color of the burger
      this.color = "Red"; // Default color
  
      // Store the timestamp when the burger is created
      this.creationTime = millis();
    }
    //allows for highlighting burger when axis are over the top of it
    changeColor(bright) {
      this.brightness = bright;
    }
  
    contains(px, py) {
      let d = dist(px, py, this.x, this.y);
      if (d <= this.r * 0.5) {
        return true;
      } else {
        return false;
      }
    }
  
    show() {
      stroke(255);
      strokeWeight(1);
  
      // Time parameters for color change
      let colorChangeInterval = 40000; 
  
      // Calculate the elapsed time since creation
      let elapsedTime = millis() - this.creationTime;
      
      // If elapsed time is less than colorChangeInterval, determine the current color
      //I had help from chatGPT with the burger color change system
      if (elapsedTime < colorChangeInterval) {
        // Define color values for each stage
        let colors = [
          [255, 0, 0],   // Red
          [0, 0, 255],   // Blue
          [0, 255, 0], // Green
          [255, 255, 0], // Yellow
          [139, 69, 19],  // Brown
          [0, 0, 0]      // Black
        ];
  
        // Determine the current color based on the elapsed time
        let currentColorIndex = floor(elapsedTime / (colorChangeInterval / colors.length));
        let currentColor = colors[currentColorIndex];
        // Update the color of the burger
        this.color = getColorName(currentColor);
        fill(currentColor[0], currentColor[1], currentColor[2]);
      } else {
        // If elapsed time is greater than colorChangeInterval, stay black
        fill(0, 0, 0);
      }
      
  
      // Draw the burger
      strokeWeight(4);
      stroke(this.brightness, 125);
      ellipse(this.x, this.y, this.r);
    }
  }
  