// VARIÁVEIS DA BOLINHA
let xBola = 50;
let yBola = 190;
let velocidadeX = 3;
let velocidadeY = 3;
let diametro = 20;
let raio = diametro / 2;

// VARIÁVEIS DA RAQUETE
let larguraRaq = 10;
let alturaRaq = 80;
let xRaq1 = 10;
let yRaq1 = 200 - alturaRaq / 2;

let xRaq2 = 580;
let yRaq2 = 200 - alturaRaq / 2;

let colisao = false;
let colisao2 = false;

// PONTUAÇÃO
let pontosJ1 = 0;
let pontosJ2 = 0;

// VARIÁVEIS DO JOGO
let jogoAtivo = true;
const pontosParaVencer = 7;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  trilha.setVolume(0.6);
  ponto.setVolume(0.6);
  raquetada.setVolume(1.5);
}

function draw() {
  background(30); // Cor de fundo modificada
  if (jogoAtivo) {
    movimentaBolinha();
    movimentaRaquete();
    colisaoRaquete();
    contaPontos();
  } else {
    mostraVencedor();
  }
  mostraPontos();
}

function movimentaBolinha() {
  fill(0, 255, 255); // Cor da bolinha modificada
  circle(xBola, yBola, diametro);
  xBola = xBola + velocidadeX;
  yBola = yBola + velocidadeY;

  if (xBola + raio >= 600 || xBola - raio <= 0) {
    velocidadeX = velocidadeX * -1;
  }

  if (yBola + raio >= 400 || yBola - raio <= 0) {
    velocidadeY = velocidadeY * -1;
  }
}

function movimentaRaquete() {
  fill(255, 165, 0); // Cor das raquetes modificada
  rect(xRaq1, yRaq1, larguraRaq, alturaRaq);
  rect(xRaq2, yRaq2, larguraRaq, alturaRaq);

  // Movimenta raquete do jogador 1
  if (keyIsDown(87)) {
    yRaq1 -= 5;
  }
  if (keyIsDown(83)) {
    yRaq1 += 5;
  }

  // Movimenta raquete do jogador 2
  if (keyIsDown(UP_ARROW)) {
    yRaq2 -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaq2 += 5;
  }

  // Limites para raquete do jogador 1
  if (yRaq1 < 0) {
    yRaq1 = 0;
  }
  if (yRaq1 + alturaRaq > height) {
    yRaq1 = height - alturaRaq;
  }

  // Limites para raquete do jogador 2
  if (yRaq2 < 0) {
    yRaq2 = 0;
  }
  if (yRaq2 + alturaRaq > height) {
    yRaq2 = height - alturaRaq;
  }
}

function colisaoRaquete() {
  colisao = collideRectCircle(xRaq1, yRaq1, larguraRaq, alturaRaq, xBola, yBola, diametro);
  colisao2 = collideRectCircle(xRaq2, yRaq2, larguraRaq, alturaRaq, xBola, yBola, diametro);
  if (colisao || colisao2) {
    raquetada.play();
    velocidadeX = velocidadeX * -1;
    velocidadeX *= 1.05; // Aumenta a velocidade a cada colisão
  }
}

function contaPontos() {
  if (xBola + raio >= 600) {
    ponto.play();
    pontosJ1 += 1;
    if (pontosJ1 >= pontosParaVencer) {
      jogoAtivo = false;
    }
    resetaBolinha();
  }

  if (xBola - raio <= 0) {
    ponto.play();
    pontosJ2 += 1;
    if (pontosJ2 >= pontosParaVencer) {
      jogoAtivo = false;
    }
    resetaBolinha();
  }
}

function resetaBolinha() {
  xBola = width / 2;
  yBola = height / 2;
  velocidadeX = (velocidadeX > 0) ? 5 : -5;
  velocidadeY = (velocidadeY > 0) ? 5 : -5;
}

function mostraPontos() {
  stroke(255);
  textAlign(CENTER);
  textSize(28);

  fill(255, 0, 127);
  rect(170, 20, 60, 40);
  fill(255);
  text(pontosJ1, 200, 50);

  fill(0, 150, 0);
  rect(370, 20, 60, 40);
  fill(255);
  text(pontosJ2, 400, 50);
}

function mostraVencedor() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  if (pontosJ1 >= pontosParaVencer) {
    text("Jogador 1 venceu!", width / 2, height / 2);
  } else if (pontosJ2 >= pontosParaVencer) {
    text("Jogador 2 venceu!", width / 2, height / 2);
  }
}
