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
    //this.circle = new Circle(100, 100, 50, this.ctx);
   
    //create a grid 
    this.grid = [];

    for(let j = 0; j < 100; j++){
      for (let i = 0; i < 100; i++) {
   
        const element = this.circle = new Circle(i*20,j*20,10,this.ctx);
        this.grid.push(element);
      
      }
    }

    //load the image
    this.img = new Image();
    
    this.img.onload = ()=>{
      // this.draw();
      this.detectPixels();
    }

    this.img.src = "asset/david.jpg";
    
  }

  detectPixels(){
    this.ctx.drawImage(this.img,0,0);
    const imageData = this.ctx.getImageData(0,0,this.img.width,this.img.height);
    
    console.log(imageData);
    this.pixels = imageData.data;

    this.rgb =[];
    const steps = this.img.width / 100;

    for(let j = 0; j < this.img.height; j+= steps){
      for (let i = 0; i < this.img.width; i+= steps) {
        let index = (j * this.img.width + i)*4; // (y * width of image + x) *4
        this.rgb.push(
        {
        r: this.pixels[index],
        g: this.pixels[index + 1],
        b: this.pixels[index+ 2],
        }
        );      
      
      }
    }
    
    this.draw();
    //console.log(this.rgb);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    

    this.grid.forEach((element,index) => {
      //element.color = this.rgb[index];
      element.color = 
      "rgb("+ 
      this.rgb[index].r +
      ","+ 
      this.rgb[index].g +
      ","+ 
      this.rgb[index].b +
      ")";
      element.draw();
    });

    
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
