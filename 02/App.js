// constante globale
const pixelRatio = window.devicePixelRatio;

// variable globale
let myCanvas;
let myTools;
let screenDivider = 8;
let rayon = 100;
let angle = 0;
let deplacementx = 0;
let deplacementy = 0;
let pointsCos = [];
let pointsSin = [];

let lWidth = 2;

function start() {
  // constante locale
  myCanvas = document.getElementById("canvas");
  myCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  myCanvas.height = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  myCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  myCanvas.style.height = window.innerWidth - 60 * pixelRatio;
  myTools = myCanvas.getContext("2d");

  // rayon par défaut
  rayon = window.innerHeight - 200;

  // lancement de la fonction de dessin
  animate();
}

// creation d'un fonction d'animation
// cette fonction sera appelée à chaque frame
function animate() {
  // on efface le canvas
  myTools.clearRect(0, 0, myCanvas.width, myCanvas.height);
  // on dessine
  dessine();

  // on demande à rappeler la fonction animate
  // à la prochaine frame
  requestAnimationFrame(animate);
}



function dessine() {
  

 cosWave1();
 sinWave1(); //middle
 sinWave2(); 
 sinWave3();




}

function cosWave1(){
 
  let x = myCanvas.width /2;
  let y = myCanvas.height / 2;

  //on dessgine des axes
  //dessineAxes(x, y);

  // on initialise l'épaisseur du trait
  myTools.lineWidth = lWidth;
  //on arrondit les extrémités des lignes
  myTools.lineCap = "round";


  myTools.strokeStyle = "white";
  // on "colle" un ball en tête de ligne

  let sin =   Math.cos(angle * (Math.PI /360)) * (rayon *0.8);
  let sin2 =  Math.cos(angle * (Math.PI /360)) * (rayon *0.7);
  let sin3 =  Math.cos(angle * (Math.PI /360)) * (rayon *0.6);
  let sin4 =  Math.cos(angle * (Math.PI /360)) * (rayon *0.5);
  let sin5 =  Math.cos(angle * (Math.PI /360)) * (rayon *0.4);
  let sin6 =  Math.cos(angle * (Math.PI /360)) * (rayon *0.3);
  let sin7 =  Math.cos(angle * (Math.PI /360)) * (rayon *0.1);
  
  myTools.beginPath();

  /////////// + 

  let marginFactor = 4;

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x+20*marginFactor, y);
  myTools.lineTo(x+20*marginFactor, y + sin2);
  myTools.moveTo(x+20*marginFactor, y);
  myTools.lineTo(x+20*marginFactor, y - sin2);

  //line 3
  myTools.moveTo(x+40*marginFactor, y);
  myTools.lineTo(x+40*marginFactor, y + sin3);
  myTools.moveTo(x+40*marginFactor, y);
  myTools.lineTo(x+40*marginFactor, y - sin3);

  //line 4+
  myTools.moveTo(x+60*marginFactor, y);
  myTools.lineTo(x+60*marginFactor, y + sin4);
  myTools.moveTo(x+60*marginFactor, y);
  myTools.lineTo(x+60*marginFactor, y - sin4);

  //line 5
  myTools.moveTo(x+80*marginFactor, y);
  myTools.lineTo(x+80*marginFactor, y + sin5);
  myTools.moveTo(x+80*marginFactor, y);
  myTools.lineTo(x+80*marginFactor, y - sin5);

  //line 6
  myTools.moveTo(x+100*marginFactor, y);
  myTools.lineTo(x+100*marginFactor, y + sin6);
  myTools.moveTo(x+100*marginFactor, y);
  myTools.lineTo(x+100*marginFactor, y - sin6);

  //line 7+
  myTools.moveTo(x+120*marginFactor, y);
  myTools.lineTo(x+120*marginFactor, y + sin7);
  myTools.moveTo(x+120*marginFactor, y);
  myTools.lineTo(x+120*marginFactor, y - sin7);


    /////////// -

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x-20*marginFactor, y);
  myTools.lineTo(x-20*marginFactor, y + sin2);
  myTools.moveTo(x-20*marginFactor, y);
  myTools.lineTo(x-20*marginFactor, y - sin2);-
  //line -*marginFactor
  myTools.moveTo(x-40*marginFactor, y);
  myTools.lineTo(x-40*marginFactor, y + sin3);
  myTools.moveTo(x-40*marginFactor, y);
  myTools.lineTo(x-40*marginFactor, y - sin3);-
  //line 4-*marginFactor
  myTools.moveTo(x-60*marginFactor, y);
  myTools.lineTo(x-60*marginFactor, y + sin4);
  myTools.moveTo(x-60*marginFactor, y);
  myTools.lineTo(x-60*marginFactor, y - sin4);-
  //line -*marginFactor
  myTools.moveTo(x-80*marginFactor, y);
  myTools.lineTo(x-80*marginFactor, y + sin5);
  myTools.moveTo(x-80*marginFactor, y);
  myTools.lineTo(x-80*marginFactor, y - sin5);-
  //line -*marginFactor
  myTools.moveTo(x-100*marginFactor, y);
  myTools.lineTo(x-100*marginFactor, y + sin6);
  myTools.moveTo(x-100*marginFactor, y);
  myTools.lineTo(x-100*marginFactor, y - sin6);-
  //line 7-**marginFactr
  myTools.moveTo(x-120*marginFactor, y);
  myTools.lineTo(x-120*marginFactor, y + sin7);
  myTools.moveTo(x-120*marginFactor, y);
  myTools.lineTo(x-120*marginFactor, y - sin7);

  myTools.stroke();
  myTools.closePath();

  // on fait augmenter l'angle
  angle += 0.5;
  if (angle > 360) {
    angle = 0;
  }
}

function sinWave1(){
 
  let x = myCanvas.width /2 ;
  let y = myCanvas.height / 2;

  //on dessgine des axes
  //dessineAxes(x, y);

  // on initialise l'épaisseur du trait
  myTools.lineWidth = lWidth;
  //on arrondit les extrémités des lignes
  myTools.lineCap = "round";


  myTools.strokeStyle = "white";
  // on "colle" un ball en tête de ligne

  let sin =   Math.sin(angle * (Math.PI / 360)) * (rayon *0.7)
  let sin2 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.6);
  let sin3 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.5);
  let sin4 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.4);
  let sin5 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.3);
  let sin6 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.2);
  let sin7 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.1);
  
  myTools.beginPath();

  /////////// + 

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x+20, y);
  myTools.lineTo(x+20, y + sin2);
  myTools.moveTo(x+20, y);
  myTools.lineTo(x+20, y - sin2);

  //line 3
  myTools.moveTo(x+40, y);
  myTools.lineTo(x+40, y + sin3);
  myTools.moveTo(x+40, y);
  myTools.lineTo(x+40, y - sin3);

  //line 4+
  myTools.moveTo(x+60, y);
  myTools.lineTo(x+60, y + sin4);
  myTools.moveTo(x+60, y);
  myTools.lineTo(x+60, y - sin4);

  //line 5
  myTools.moveTo(x+80, y);
  myTools.lineTo(x+80, y + sin5);
  myTools.moveTo(x+80, y);
  myTools.lineTo(x+80, y - sin5);

  //line 6
  myTools.moveTo(x+100, y);
  myTools.lineTo(x+100, y + sin6);
  myTools.moveTo(x+100, y);
  myTools.lineTo(x+100, y - sin6);

  //line 7+
  myTools.moveTo(x+120, y);
  myTools.lineTo(x+120, y + sin7);
  myTools.moveTo(x+120, y);
  myTools.lineTo(x+120, y - sin7);


    /////////// -

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x-20, y);
  myTools.lineTo(x-20, y + sin2);
  myTools.moveTo(x-20, y);
  myTools.lineTo(x-20, y - sin2);-
  //line -
  myTools.moveTo(x-40, y);
  myTools.lineTo(x-40, y + sin3);
  myTools.moveTo(x-40, y);
  myTools.lineTo(x-40, y - sin3);-
  //line 4-
  myTools.moveTo(x-60, y);
  myTools.lineTo(x-60, y + sin4);
  myTools.moveTo(x-60, y);
  myTools.lineTo(x-60, y - sin4);-
  //line -
  myTools.moveTo(x-80, y);
  myTools.lineTo(x-80, y + sin5);
  myTools.moveTo(x-80, y);
  myTools.lineTo(x-80, y - sin5);-
  //line -
  myTools.moveTo(x-100, y);
  myTools.lineTo(x-100, y + sin6);
  myTools.moveTo(x-100, y);
  myTools.lineTo(x-100, y - sin6);-
  //line 7-
  myTools.moveTo(x-120, y);
  myTools.lineTo(x-120, y + sin7);
  myTools.moveTo(x-120, y);
  myTools.lineTo(x-120, y - sin7);

  myTools.stroke();
  myTools.closePath();

  // on fait augmenter l'angle
  angle += 0.5;
  if (angle > 360) {
    angle = 0;
  }
}

function sinWave2(){
 
  let x = myCanvas.width /2 - myCanvas.width*0.2;
    let y = myCanvas.height / 2;

  //on dessgine des axes
  //dessineAxes(x, y);

  // on initialise l'épaisseur du trait
  myTools.lineWidth = lWidth;
  //on arrondit les extrémités des lignes
  myTools.lineCap = "round";


  myTools.strokeStyle = "white";
  // on "colle" un ball en tête de ligne

  let sin =   Math.sin(angle * (Math.PI / 360)) * (rayon *0.7)
  let sin2 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.6);
  let sin3 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.5);
  let sin4 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.4);
  let sin5 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.3);
  let sin6 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.2);
  let sin7 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.1);
  
  myTools.beginPath();

  /////////// + 

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x+20, y);
  myTools.lineTo(x+20, y + sin2);
  myTools.moveTo(x+20, y);
  myTools.lineTo(x+20, y - sin2);

  //line 3
  myTools.moveTo(x+40, y);
  myTools.lineTo(x+40, y + sin3);
  myTools.moveTo(x+40, y);
  myTools.lineTo(x+40, y - sin3);

  //line 4+
  myTools.moveTo(x+60, y);
  myTools.lineTo(x+60, y + sin4);
  myTools.moveTo(x+60, y);
  myTools.lineTo(x+60, y - sin4);

  //line 5
  myTools.moveTo(x+80, y);
  myTools.lineTo(x+80, y + sin5);
  myTools.moveTo(x+80, y);
  myTools.lineTo(x+80, y - sin5);

  //line 6
  myTools.moveTo(x+100, y);
  myTools.lineTo(x+100, y + sin6);
  myTools.moveTo(x+100, y);
  myTools.lineTo(x+100, y - sin6);

  //line 7+
  myTools.moveTo(x+120, y);
  myTools.lineTo(x+120, y + sin7);
  myTools.moveTo(x+120, y);
  myTools.lineTo(x+120, y - sin7);


    /////////// -

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x-20, y);
  myTools.lineTo(x-20, y + sin2);
  myTools.moveTo(x-20, y);
  myTools.lineTo(x-20, y - sin2);-
  //line -
  myTools.moveTo(x-40, y);
  myTools.lineTo(x-40, y + sin3);
  myTools.moveTo(x-40, y);
  myTools.lineTo(x-40, y - sin3);-
  //line 4-
  myTools.moveTo(x-60, y);
  myTools.lineTo(x-60, y + sin4);
  myTools.moveTo(x-60, y);
  myTools.lineTo(x-60, y - sin4);-
  //line -
  myTools.moveTo(x-80, y);
  myTools.lineTo(x-80, y + sin5);
  myTools.moveTo(x-80, y);
  myTools.lineTo(x-80, y - sin5);-
  //line -
  myTools.moveTo(x-100, y);
  myTools.lineTo(x-100, y + sin6);
  myTools.moveTo(x-100, y);
  myTools.lineTo(x-100, y - sin6);-
  //line 7-
  myTools.moveTo(x-120, y);
  myTools.lineTo(x-120, y + sin7);
  myTools.moveTo(x-120, y);
  myTools.lineTo(x-120, y - sin7);

  myTools.stroke();
  myTools.closePath();

  // on fait augmenter l'angle
  angle += 0.5;
  if (angle > 360) {
    angle = 0;
  }
}

function sinWave3(){
 
  let x = myCanvas.width /2 + myCanvas.width*0.2;
  let y = myCanvas.height / 2;

  //on dessgine des axes
  //dessineAxes(x, y);

  // on initialise l'épaisseur du trait
  myTools.lineWidth = lWidth;
  //on arrondit les extrémités des lignes
  myTools.lineCap = "round";


  myTools.strokeStyle = "white";
  // on "colle" un ball en tête de ligne

  let sin =   Math.sin(angle * (Math.PI / 360)) * (rayon *0.7)
  let sin2 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.6);
  let sin3 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.5);
  let sin4 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.4);
  let sin5 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.3);
  let sin6 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.2);
  let sin7 =  Math.sin(angle * (Math.PI / 360)) * (rayon *0.1);
  
  myTools.beginPath();

  /////////// + 

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x+20, y);
  myTools.lineTo(x+20, y + sin2);
  myTools.moveTo(x+20, y);
  myTools.lineTo(x+20, y - sin2);

  //line 3
  myTools.moveTo(x+40, y);
  myTools.lineTo(x+40, y + sin3);
  myTools.moveTo(x+40, y);
  myTools.lineTo(x+40, y - sin3);

  //line 4+
  myTools.moveTo(x+60, y);
  myTools.lineTo(x+60, y + sin4);
  myTools.moveTo(x+60, y);
  myTools.lineTo(x+60, y - sin4);

  //line 5
  myTools.moveTo(x+80, y);
  myTools.lineTo(x+80, y + sin5);
  myTools.moveTo(x+80, y);
  myTools.lineTo(x+80, y - sin5);

  //line 6
  myTools.moveTo(x+100, y);
  myTools.lineTo(x+100, y + sin6);
  myTools.moveTo(x+100, y);
  myTools.lineTo(x+100, y - sin6);

  //line 7+
  myTools.moveTo(x+120, y);
  myTools.lineTo(x+120, y + sin7);
  myTools.moveTo(x+120, y);
  myTools.lineTo(x+120, y - sin7);


    /////////// -

  //line 1
  myTools.moveTo(x, y);
  myTools.lineTo(x, y + sin);
  myTools.moveTo(x, y);
  myTools.lineTo(x, y - sin);

  //line 2
  myTools.moveTo(x-20, y);
  myTools.lineTo(x-20, y + sin2);
  myTools.moveTo(x-20, y);
  myTools.lineTo(x-20, y - sin2);-
  //line -
  myTools.moveTo(x-40, y);
  myTools.lineTo(x-40, y + sin3);
  myTools.moveTo(x-40, y);
  myTools.lineTo(x-40, y - sin3);-
  //line 4-
  myTools.moveTo(x-60, y);
  myTools.lineTo(x-60, y + sin4);
  myTools.moveTo(x-60, y);
  myTools.lineTo(x-60, y - sin4);-
  //line -
  myTools.moveTo(x-80, y);
  myTools.lineTo(x-80, y + sin5);
  myTools.moveTo(x-80, y);
  myTools.lineTo(x-80, y - sin5);-
  //line -
  myTools.moveTo(x-100, y);
  myTools.lineTo(x-100, y + sin6);
  myTools.moveTo(x-100, y);
  myTools.lineTo(x-100, y - sin6);-
  //line 7-
  myTools.moveTo(x-120, y);
  myTools.lineTo(x-120, y + sin7);
  myTools.moveTo(x-120, y);
  myTools.lineTo(x-120, y - sin7);

  myTools.stroke();
  myTools.closePath();

  // on fait augmenter l'angle
  angle += 0.5;
  if (angle > 360) {
    angle = 0;
  }
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};
