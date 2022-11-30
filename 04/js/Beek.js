class Beek {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    this.target = {
      x: x,
      y: y,
    };
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };

    this.originRadius = radius;
    this.targetRadius = radius;
    this.radius = radius;
    this.ctx = ctx;
    /*
      vitesse de d'incrémentation de t
    */
    this.speed = 0.002;
    /*
      t est un compteur qui va de 0 à 1
      qui definit la portion du chemin parcouru
    */
    this.t = 0;


  }






  draw() {
    //check si on est arrivé à destination
    if (this.distance(this.position, this.target) > 0.001) this.move();

    //check si on est arrivé à destination
    if (Math.abs(this.targetRadius - this.radius) > 0.01) this.scale();
    else this.radius = this.targetRadius; //on force la position finale
   


    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.translate(this.radius,0);

    //BEEK
    this.ctx.fillStyle = "Orange";
    this.ctx.beginPath();
    this.ctx.moveTo(50,0);
    this.ctx.lineTo(-200, +200);
    this.ctx.lineTo(-200,-200);
    this.ctx.lineTo(50,0);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  /**
   *
   *  remettre le compteur t à zero
   *  réinitialiser la position du point de départ
   *  assigner la nouvelle position de destination
   */
  resetAndGo(x, y) {
    this.t = 0;

    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };
    this.target = {
      x,
      y,
    };
    

    // this.originRadius = this.radius;
    // if (this.radius == 500) {
    //   this.targetRadius = 600;
    // } else {
    //   this.targetRadius = 500;
    // }

    
 
  }




  /**
   * function de calcul de l'animation
   */
  move() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.elasticOut(this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;


  }

  scale() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.elasticOut(this.t);

    //nouvelle scale
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)

    this.radius = Math.abs(this.originRadius + (this.targetRadius - this.originRadius) * ease);
  }


  /**
   * calcul de la distance entre deux points
   */
  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
