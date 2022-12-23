class Rectangle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.radius = radius;
    this.ctx = ctx;
    this.color = "rgb(255,255,255)";
    this.replacement_color = "rgb(255,255,255)";

  }

  draw() {
    const lumiance_percentage = this.detectLuminance();
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = "red";
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();

    if(lumiance_percentage > 0.5){
      this.ctx.fillStyle = "white";
      this.ctx.font = `${this.radius * lumiance_percentage * 2}px sans-serif`;
      this.ctx.fillText("X", 0, 0);
    }else {
      this.ctx.fillStyle = "orange";
      this.ctx.rect(0,0,this.radius * lumiance_percentage *2,this.radius * lumiance_percentage *2);
    }
    
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

  }



  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }
}
