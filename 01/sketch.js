let colors = [];
let w = 0;
let h = 1000;




function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResize();
  background(0);
  frameRate(60);
  
}
function draw() {

  //background(0);
  //number of colums 
  let colums = 7;
  w = windowHeight / colums; //width of each column
  h = windowHeight / colums; //height of each column
  //let ColorChangeFactor= round(map(mouseX, 0, windowWidth, 1, colums)); // color changes depending on mouseX position
  let ColorChangeFactor = 1;

  //console.log(ColorChangeFactor); 

  //wall drawing colors rgb values
  // color(132,171,204),
  // color(208, 122, 107),
  // color(239, 148, 74),
  // color(88, 56, 60),
  // color(224, 200, 92),
  // color(134, 234, 74),  
  // color(88, 234, 74),  
  
  let colors = [
    color(0),  
    color(187,158,46),
    color(175,77,66),
    color(71,118,126,255),
    color(222,111,41),
    color(135,173,63),
    color(144,114,139),  
    
  ];
  
  
  //create rectangles 
    for (let y = 0; y < 1; y++) {

    for (let x = 0; x < colums; x++) {
      
      let xpos = x * windowWidth/colums;
      let ypos = y * windowWidth/colums;
      let position = xpos * (frameCount *0.001); 
      
      //noStroke();
      stroke(colors[x]);
      strokeWeight(2);
      fill(colors[x]);

      //line(xpos, ypos, mouseX, height);
      line(position, ypos, position, height);

      //rect(xpos, ypos, windowWidth/colums, height);
      //ellipse(xpos, ypos, 40);
      //console.log(round(xpos));
      console.log(floor(position));

      if(position > w *colums){
        noLoop();
      }


    }


  


    }
 

}

 function windowResize(){
  createCanvas(windowWidth,windowHeight);
}




