/**
 *  EASING REF:
 *  https://easings.net/#
 */

 let angle = 0;
 let isRotating = false;

class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.setup();
  }

  setup() {


    const center = {
      x: (window.innerWidth / 2) * this.pixelRatio,
      y: (window.innerHeight / 2) * this.pixelRatio,
    };

    const radius = 500;

    this.beek = new Beek(center.x,center.y,radius,this.ctx);
    this.bird = new Body(center.x, center.y, radius, this.ctx, 45 * Math.PI / 180);
    this.wing = new Wing(center.x, center.y,radius,0, this.ctx);  
    this.eyes = new Eye(center.x,center.y,radius*0.1,this.ctx);

    


    document.addEventListener("click", this.click.bind(this));
    //document.addEventListener("mousemove", this.move.bind(this));

    
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.beek.draw();
    this.bird.draw();
    this.wing.draw();
    this.eyes.draw();

    requestAnimationFrame(this.draw.bind(this));
  }

  click(e) {
    
    this.bird.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );


    this.eyes.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );


    this.wing.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );

    this.beek.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );

    this.wing.resetPosition();  
  }




}

window.onload = function () {
  new App();
};
