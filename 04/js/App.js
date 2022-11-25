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
    this.bird = new Bird(100, 100, 50, this.ctx, 45 * Math.PI / 180);
   

    document.addEventListener("click", this.click.bind(this));
    document.addEventListener("mousemove", this.move.bind(this));

    
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bird.draw();


    requestAnimationFrame(this.draw.bind(this));
  }

  click(e) {
    this.bird.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );
    // this.bird.updateAngle();

  }

  move(e){
    this.mouse = {
      x: e.clientX * this.pixelRatio,
      y: e.clientY * this.pixelRatio,
    };
  }


}

window.onload = function () {
  new App();
};
