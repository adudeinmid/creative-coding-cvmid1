// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;
let angle = 0;
let isRotating = false;
const tiles = [];

function start() {
  // constante locale
  monCanvas = document.getElementById("ecal");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
  mesOutils = monCanvas.getContext("2d");

  // on stoke les tiles dans un tableau
  // pour pouvoir les manipuler plus facilement
  const number = 10;
  const size = monCanvas.width / number;
  const color = Math.random() > 0.6 ? "lightgreen" : "purple";
  const color2 = Math.random() > 0.3 ? "orange" : "lightgreen";

  
  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number; j++) {
      tiles.push(new Tile(i * size + size / 2,j * size + size / 2,size,color,color2,mesOutils));
    }
  }

  // event listener - user's mouse position
  //  on the document //mousemove or click 
  document.addEventListener("mousemove", function (event) {
    
    // on vérifie si l'utilisateur a cliqué sur un tile
    tiles.forEach((tile) => {
      if (
        (event.clientX - 60) * pixelRatio > tile.x - tile.size / 2 &&
        (event.clientX - 60) * pixelRatio < tile.x + tile.size / 2 &&
        (event.clientY - 60) * pixelRatio > tile.y - tile.size / 2 &&
        (event.clientY - 60) * pixelRatio < tile.y + tile.size / 2
      ) {
        // on inverse la rotation du tile
        tile.rotation = !tile.rotation;
        tile.updateAngle();
      }
    });
  });



  // lancement de la fonction de dessin
  animate();
}

// creation d'un fonction d'animation
// cette fonction sera appelée à chaque frame
function animate() {
  // on efface le canvas
  mesOutils.fillStyle = "white"
  //mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);

  // on dessine les tiles
  tiles.forEach((tile) => {
    tile.draw();
  });

  // on demande à rappeler la fonction animate
  // à la prochaine frame
  requestAnimationFrame(animate);
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};
