// Global var
var pixelDistance, pixelCountX, pixelCountY, pixelCountXHalf, pixelCountYHalf, t;
var colorArray = [], density;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  density = displayDensity();
  pixelDensity(density);
  // frameRate(10);
  pixelDistance = 10;
  setupArray();
  noStroke();
  smooth(); 
  t=0;
}

function draw() {
  background(10);
  for(let i = 0;i<pixelCountX;i++) {
    for(let j = 0;j<pixelCountY;j++) {
        if(i<pixelCountXHalf && j<pixelCountYHalf) {
          var array = colorArray[pixelCountXHalf-1-i][pixelCountYHalf-1-j];
          fill(array[0], array[1], array[2]);

        } else if(i>=pixelCountXHalf && j<pixelCountYHalf) {
          var array = colorArray[i - pixelCountXHalf][pixelCountYHalf-1-j];
          fill(array[0], array[1], array[2]);

        } else if(i<pixelCountXHalf && j>=pixelCountYHalf) {
          var array = colorArray[pixelCountXHalf-1-i][j - pixelCountYHalf];
          fill(array[0], array[1], array[2]);

        } else if(i>=pixelCountXHalf && j>=pixelCountYHalf) {
          var array = colorArray[i - pixelCountXHalf][j - pixelCountYHalf];
          fill(array[0], array[1], array[2]);

        }  

      if(i<pixelCountXHalf && j<pixelCountYHalf) {
        colorArray[i][j][0] = round(map(noise(i/10/density-t,j/10/density+t),0,1,0,255));
        colorArray[i][j][1] = round(map(noise(i/10/density-t,j/10/density-t),0,1,0,255));
        colorArray[i][j][2] = round(map(noise(i/10/density+t,j/10/density-t),0,1,0,255));
      }
      
      ellipse(i*pixelDistance + pixelDistance/2 ,j*pixelDistance + pixelDistance/2 ,pixelDistance/2+1,pixelDistance/2+1);
    }
  }
  t+=0.02;

}

function setupArray() {
  pixelCountX = round(width/pixelDistance);
  pixelCountY = round(height/pixelDistance);
  pixelCountXHalf = ceil(pixelCountX/2);
  pixelCountYHalf = ceil(pixelCountY/2);

  for(let i = 0;i<pixelCountXHalf; i++) {
    colorArray[i] = [];
    for(let j = 0;j<pixelCountYHalf; j++) {
      colorArray[i][j] = [];
      colorArray[i][j][0] = 20;
      colorArray[i][j][1] = 20;
      colorArray[i][j][2] = 20;
    }
  }
}

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
  setupArray();
}
