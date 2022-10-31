class Tile {
  constructor(x, y, size, color,color2, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = true;
    this.arcAngle = Math.round(Math.random()) * (Math.PI / 2);
    this.angle = Math.PI / 2;

    this.ctx = ctx;
    this.bgColor = color;
    this.bgColor2 = color2;
    this.lineColor = this.bgColor === "lightgreen" ? "purple" : "purple";
    this.lineColor2 = this.bgColor2 === "orange" ? "lightgreen" : "orange";
    // this.r = Math.round(Math.random() * 255);
    // this.g = Math.round(Math.random() * 255);
    // this.b = Math.round(Math.random() * 255);
  }

  updateAngle() {
    this.angle += 0.001;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    
    if (this.rotation) {
      this.angle += 0.1;
    }

    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 10;
    
    
    //white rect
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.rect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
    this.ctx.fill();
    //this.ctx.stroke();
    this.ctx.closePath();

    

    this.ctx.strokeStyle = this.bgColor;
    this.ctx.beginPath();
    this.ctx.moveTo(0-this.size/7,0-this.size/7);
    this.ctx.lineTo(this.size/7,this.size/7);
    this.ctx.stroke();
    this.ctx.closePath();

    //top shape
    this.ctx.strokeStyle = this.bgColor2;
    this.ctx.beginPath();
    this.ctx.arc(0,0, this.size/4 , 0, Math.PI/2,false);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.rotate(Math.PI);
    this.ctx.arc(0,0, this.size/4 , Math.PI/2, 0,true);
    this.ctx.stroke();
    this.ctx.closePath();




    
    //


    // //bottom shape 2 
    // this.ctx.beginPath ();
    // this.ctx.rotate(this.arcAngle);
    // this.ctx.arc(0, 0, this.size/6, 0, Math.PI,false);
    // this.ctx.stroke();
    // this.ctx.closePath();

    // //top shape 2
    // this.ctx.beginPath();
    // this.ctx.arc(0-this.size/2,0-this.size/2, this.size/5 , 0, Math.PI/4,false);
    // this.ctx.fill();
    // this.ctx.stroke();
    // this.ctx.closePath();

    // this.ctx.beginPath();
    // this.ctx.rotate(this.arcAngle);
    // this.ctx.arc(0+this.size/2,0-this.size/2, this.size/3, 0, -Math.PI/4,false);
    // this.ctx.stroke();
    // this.ctx.closePath();

    // this.ctx.beginPath();
    // //this.ctx.rotate(this.arcAngle);
    // this.ctx.arc(0+this.size/4,0+this.size/2, this.size/4, 0, -Math.PI/2,true);
    // this.ctx.stroke();
    // this.ctx.closePath();

    
    
    
    this.ctx.restore();
  }
}
