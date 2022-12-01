class Wing {
  constructor(x, y, radius, wingPos, ctx) {
    //EASING POSTITION
    this.position = { x: x, y: y };
    this.target = {
      x: x,
      y: y,
    };
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };

    //EASING SCALE
    this.radius = radius;
    this.originRadius = radius;
    this.targetRadius = radius;
    this.wingIsUp = false;
    this.wingAnimComplete = false;

    //EASING FLAPPY WING
    this.wingPos = wingPos;
    this.originwingPos = wingPos;
    this.targetwingPos = wingPos;

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

    if (Math.abs(this.targetwingPos - this.wingPos) > 0.01) {
      this.wingPosition();
    } else if(this.wingAnimComplete == false){
      this.resetAndGo(this.position.x, this.position.y);
      this.wingPos = this.targetwingPos;
      this.callWingAnim();
      this.wingAnimComplete = true;
    }
    else{
      this.wingPos = this.targetwingPos;
    }

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    // this.ctx.translate(100,100);

    //wing
    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-this.radius, this.radius - this.wingPos);
    this.ctx.lineTo(-this.radius, 0);
    this.ctx.lineTo(0, 0);
    //this.ctx.stroke();
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

  handleClick(){

    this.wingAnimComplete=false;
    this.callWingAnim();
    // this.wingIsUp = false;
  }

  callWingAnim(){
    if(this.wingIsUp == true){
      this.animateWingDown();
    }else{
      this.animateWingUp();
    }
  }


animateWingUp(){
  this.t = 0;
  this.originwingPos = this.wingPos;

  this.targetwingPos = this.radius * 2;
  this.wingIsUp = true;
}

animateWingDown(){
  this.t = 0;
  this.originwingPos = this.wingPos;
  this.wingIsUp = false;
  this.targetwingPos = 0;
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
    this.radius = Math.abs(
      this.originRadius + (this.targetRadius - this.originRadius) * ease
    );
  }

  wingPosition() {

    this.speed = 0.001;
    this.t += this.speed;

    const ease = Easing.elasticOut(this.t);

    this.wingPos = Math.abs(
      this.originwingPos + (this.targetwingPos - this.originwingPos) * ease
    );
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
