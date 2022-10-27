class Tile {
  constructor(x, y, size, color, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = false;
    // this.angle = Math.round(Math.random()) * (Math.PI / 2);
    this.angle = (Math.PI / 2);

    this.ctx = ctx;
    this.bgColor = color;
    this.lineColor = this.bgColor === "lightgreen" ? "purple" : "lightgreen";
    // this.r = Math.round(Math.random() * 255);
    // this.g = Math.round(Math.random() * 255);
    // this.b = Math.round(Math.random() * 255);
  }

  updateAngle() {
    this.angle += Math.PI / 2;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    
    // if (this.rotation) {
    //   this.angle += 1;
    // }

    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.rect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
    this.ctx.fill();
    this.ctx.closePath();
    

    //top form

    this.ctx.fillStyle = "#7418E7";
    this.ctx.beginPath ();
    this.ctx.lineTo(0-this.size/2,0-this.size/2);
    this.ctx.arc(this.size/2, this.size /2, this.size/2, Math.PI, - Math.PI /2);
    this.ctx.fill();
    this.ctx.closePath();

    //bottom form
    this.ctx.fillStyle = "lightgreen";
    this.ctx.beginPath();
    this.ctx.lineTo(0+this.size/2 , 0 + this.size/2);
    this.ctx.arc(0-this.size/2,0-this.size/2, this.size/2 , 0, Math.PI/2,false);
    this.ctx.fill();
    this.ctx.closePath();
    //
    
    
    
    this.ctx.restore();
  }
}
