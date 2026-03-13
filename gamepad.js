/*let joystick;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  joystick = createJoystick();
  if(!joystick.calibrated())
    joystick.calibrate(true);
  joystick.onButtonPressed(onJoystick);
  joystick.onButtonReleased(onJoystick);
  joystick.onAxesPressed(onJoystick);
  joystick.onAxesReleased(onJoystick);
}

function draw(){
  background(100);
  joystick.draw(width/2, height/2);
}

function onJoystick(e) {
  console.log("onJoystick", e);
} */