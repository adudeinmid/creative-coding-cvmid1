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
    this.img_file = "./asset/andy.jpg";

    ////////////////////////
    // Image segmentation //
    ////////////////////////
    this.video = document.getElementById('webcam');
    this.demosSection = document.getElementById('demos');
    this.liveView = document.getElementById('liveView');
    this.previousSegmentationComplete = true;
  
    // An object to configure parameters to set for the bodypix model.
    // See github docs for explanations.
    this.bodyPixProperties = {
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 4
    };
  
    // An object to configure parameters for detection. I have raised
    // the segmentation threshold to 90% confidence to reduce the
    // number of false positives.
    this.segmentationProperties = {
      flipHorizontal: false,
      internalResolution: 'high',
      segmentationThreshold: 0.9
    };
    ////////////////////////
    
    this.setup();
  }


  setup() {
    this.points = [];
    this.totalLines = 120;
    this.subdivisions = 160;
    this.space = window.innerWidth / 0.5 / this.subdivisions;
    this.width = this.space * this.subdivisions;
    this.topLeft = {
      x: this.canvas.width / 2 - this.width / 2,
      y: this.canvas.height / 2 - (this.totalLines * this.space) / 2,
    };
  
    // build grid
    for (let j = 0; j < this.totalLines; j++) {
      for (let i = 0; i < this.subdivisions; i++) {
        const x = i * this.space + this.topLeft.x;
        let y = j * this.space + this.topLeft.y;
        const circle = new Circle(x, y, 4, this.ctx);
        this.points.push(circle);
      }
    }

    this.ctx.lineWidth = 3 * this.pixelRatio;
    this.ctx.strokeStyle = "black";

    // load image
    // this.img = new Image();
    // console.log(this.img)
    // this.img.onload = () => {
    //   this.detectPixels();
    //   // this.processSegmentation();
    // };
    // this.img.src = this.img_file;


    /////////////////
    // Load model //
    /////////////////
    // Let's load the model with our parameters defined above.
    // Before we can use bodypix class we must wait for it to finish
    // loading. Machine Learning models can be large and take a moment to
    // get everything needed to run.
    this.modelHasLoaded = false;
    this.model = undefined;

    this.model = bodyPix.load(this.bodyPixProperties).then(function (loadedModel) {
      this.model = loadedModel;
      this.modelHasLoaded = true;
      // Show demo section now model is ready to use.
      // demosSection.classList.remove('invisible');
    }.bind(this));


    // Lets create a canvas to render our findings to the DOM.
    this.webcamCanvas = document.createElement('canvas');
    this.webcamCanvas.setAttribute('class', 'overlay');
    this.liveView.appendChild(this.webcamCanvas);

    // We will also create a tempory canvas to render to that is in memory only
    // to store frames from the web cam stream for classification.
    this.videoRenderCanvas = document.createElement('canvas');
    this.videoRenderCanvasCtx = this.videoRenderCanvas.getContext('2d');

    // If webcam supported, add event listener to button for when user
    // wants to activate it.
    if (this.hasGetUserMedia()) {
      this.enableWebcamButton = document.getElementById('webcamButton');
      this.enableWebcamButton.addEventListener('click', this.enableCam.bind(this));
    } else {
      console.warn('getUserMedia() is not supported by your browser');
    }
    /////////////////
  }

  detectPixels() {
    this.ctx.drawImage(this.img, 0, 0);
    // get image data from canvas
    this.imgData = this.ctx.getImageData(0, 0, this.img.width, this.img.height);
    // get pixel data
    this.pixels = this.imgData.data;
    // get steps for 100 x 100
    this.stepX = Math.floor(this.img.width / 120);
    this.stepY = Math.floor(this.img.width / 160);

    // get rgb data for each step pixel in 100 x 100
    
    this.rgb = [];
    for (let i = 0; i < this.img.height; i += this.stepX) {
      for (let j = 0; j < this.img.width; j += this.stepY) {
        let index = (i * this.img.width + j) * 4;
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          b: this.pixels[index + 2],
          a: this.pixels[index + 3],
        });
      }
    }
    this.draw();
  }



  processSegmentation(canvas, segmentation) {
    var ctx = this.canvas.getContext('2d');

    this.rgb = [];

    for (let i = 0; i < canvas.height; i += 4) {
      for (let j = 0; j < canvas.width; j += 4) {
        let index = (i * canvas.width + j);
    // for (let i = 0; i < data.length; i ++) {
        if (segmentation.data[index] !== -1) {
          this.rgb.push({
            r: 100,
            g: 100,
            b: 100,
            a: 255,
          });
        } else {
          this.rgb.push({
            r: 10,
            g: 10,
            b: 10,
            a: 255,
          });
        }
        // n++;
      }
    }
    
    // ctx.putImageData(imageData, 0, 0);
    // console log the length of this.rgb
    //console.log(this.rgb.length)
    this.draw();
  }

  // Check if webcam access is supported.
  hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  // This function will repeatidly call itself when the browser is ready to process
  // the next frame from webcam.
  predictWebcam() {
    if (this.previousSegmentationComplete) {
      // Copy the video frame from webcam to a tempory canvas in memory only (not in the DOM).
      this.videoRenderCanvasCtx.drawImage(this.video, 0, 0);
      this.previousSegmentationComplete = false;
      // Now classify the canvas image we have available.
     this.model.segmentPersonParts(this.videoRenderCanvas,this.segmentationProperties).then(function(segmentation) {
        this.processSegmentation(this.webcamCanvas, segmentation);
        this.previousSegmentationComplete = true;
      }.bind(this));
    }

    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(this.predictWebcam.bind(this));
  }


  // Enable the live webcam view and start classification.
  enableCam(event) {
    if (!this.modelHasLoaded) {
      return;
    }
    console.log('Loading webcam...')
    
    // Hide the button.
    event.target.classList.add('removed');  
    
    // getUsermedia parameters.
    const constraints = {
      video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      this.video.addEventListener('loadedmetadata', function() {
        // Update widths and heights once video is successfully played otherwise
        // it will have width and height of zero initially causing classification
        // to fail.
        this.webcamCanvas.width = this.video.videoWidth;
        this.webcamCanvas.height = this.video.videoHeight;
        this.videoRenderCanvas.width = this.video.videoWidth;
        this.videoRenderCanvas.height = this.video.videoHeight;
        console.log(this.video)
      }.bind(this));
      
      this.video.srcObject = stream;
      
      this.video.addEventListener('loadeddata', this.predictWebcam.bind(this));
    }.bind(this));
  }

  /////////////////

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // build grid
    this.points = [];
    for (let j = 0; j < this.totalLines; j++) {
      for (let i = 0; i < this.subdivisions; i++) {
        const x = i * this.space + this.topLeft.x;
        let y = j * this.space + this.topLeft.y;
        const circle = new Circle(x, y, 4, this.ctx);
        this.points.push(circle);
      }
    }

    //draw all circle of the grid
    //console.log(this.points)
    this.points.forEach((circle, index) => {
      // pass if color is undefined
      // if (!this.rgb[index]) return;
      const color = this.rgb[index];
      circle.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
      circle.draw();
    });

    for (let i = 0; i < this.totalLines; i++) {
      this.ctx.beginPath();
      for (let j = 0; j < this.subdivisions - 1; j++) {
        const index = i * this.subdivisions + j;
        if (j == 0) {
          this.ctx.moveTo(this.points[index].x, this.points[index].y);
        }
        // replace that line with a quadratic curve
        //this.ctx.lineTo(this.points[index + 1].x, this.points[index + 1].y);
        const cx = (this.points[index].x + this.points[index + 1].x)/2;
        const cy = (this.points[index].y + this.points[index + 1].y)/2;
        this.ctx.quadraticCurveTo(
          this.points[index].x,
          this.points[index].y,
          cx,
          cy
        );
      }
      this.ctx.save();
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.fill();
      this.ctx.restore();
      this.ctx.stroke();
      this.ctx.closePath();
    }

    // requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
