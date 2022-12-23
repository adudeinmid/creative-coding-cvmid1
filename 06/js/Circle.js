class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.color = "rgb(255,255,255)";
    this.replacement_color = "rgb(255,255,255)";
    this.luminosityPercentage = this.detectLuminance();
    this.y += this.luminosityPercentage
    
  }

  draw() {
    const luminosity_percentage = this.detectLuminance();
    // if (luminosity_percentage > 0.19) {
    this.ctx.fillStyle = this.replacement_color;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();


    this.y -= luminosity_percentage * 60;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();



    
  }

  //  * luminosity_percentage
  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }
}
