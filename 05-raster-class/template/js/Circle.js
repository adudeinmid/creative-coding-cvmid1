class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.color = "red";
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(Math.PI/2);
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(0,this.radius*2);
    this.ctx.lineTo(this.radius*2,this.radius*2);
    this.ctx.lineTo(0,0);
    //this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
