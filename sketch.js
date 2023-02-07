//Variaveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15;
let raio = dBolinha/2;

//Velocidade Bolinha
let velXBolinha = 4;
let velYBolinha = 4;

//Minha Raquete
let xRaquete = 5;
let yRaquete = 150;
let RComprimento = 10;
let RAltura = 90;
let colidiu = false;

//Raquete Inimiga
let xRaqueteI = 585;
let yRaqueteI = 150;
let velInimigo;

//Placar de Pontos
let meusPontos = 0;
let PontosInimigos = 0;
let chanceDeErrar = 0;

//Sons
let RequetadaSom;
let PontoSom;
let trilha;

function preload(){
 trilha = loadSound("trilha.mp3");
 PontoSom = loadSound("ponto.mp3");
 RaquetadaSom = loadSound("raquetada.mp3");
}
  
function setup() {
  createCanvas(600, 400);
  trilha.loop();
};

function draw() {
  background(0);
  mostrabolinha();
  movimentabolinha();
  //colisaoborda();
  colisaoborda2();
  MinhaRaquete(xRaquete,yRaquete);
  RaqueteInimiga(xRaqueteI,yRaqueteI);
  MovRaquete();
  colisaoraquete(xRaquete,yRaquete);
  //MovRaqueteMultiplayer();
  colisaoraquete(xRaqueteI,yRaqueteI);
  incluiPlacar();
  marcaponto();
  MovRaqueteI();
};

function colisaoborda2(){
    if (xBolinha + raio > width||
     xBolinha - raio < 0){
    xBolinha=300;
    yBolinha=200;
  };
  
   if (yBolinha + raio > height||
     yBolinha - raio < 0){
    velYBolinha *= -1;
  };
};

function mostrabolinha(){
  circle(xBolinha,yBolinha,dBolinha);
};

function movimentabolinha(){
  xBolinha += velXBolinha;
  yBolinha += velYBolinha;
};

function colisaoborda(){
    if (xBolinha + raio > width||
     xBolinha - raio < 0){
    velXBolinha *= -1;
  };
  
   if (yBolinha + raio > height||
     yBolinha - raio < 0){
    velYBolinha *= -1;
  };
};

function MinhaRaquete(x,y){
  rect(x, y, RComprimento, RAltura);
};

function MovRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  };
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  };
};

function colisaoraquete(x,y){
  colidiu = collideRectCircle(x,y, RComprimento, RAltura, xBolinha, yBolinha,raio);
  
  if (colidiu){
    RaquetadaSom.play();
    velXBolinha *= -1;
  }
  
};

function RaqueteInimiga(x,y){
  rect(x, y, RComprimento, RAltura);
};

function MovRaqueteMultiplayer(){

   if (keyIsDown(87)){
  yRaqueteI -= 10;
};
  if (keyIsDown(83)){
    yRaqueteI += 10;
  };
}

function MovRaqueteI(){
  velInimigo = yBolinha - yRaqueteI - RComprimento/2 - 30;
  yRaqueteI += velInimigo + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (PontosInimigos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
    fill(color(255,140,0));
  rect(150, 10, 40, 20);
    fill(255);
  text(meusPontos, 170, 26);
    fill(color(255,140,0));
  rect(450, 10, 40, 20);
    fill(255);
  text(PontosInimigos, 470, 26);
};

function marcaponto(){
  if (xBolinha > 590){
    meusPontos += 1;
    PontoSom.play();
  }
  
  if (xBolinha < 10){
    PontosInimigos += 1;
    PontoSom.play();
  }
}


