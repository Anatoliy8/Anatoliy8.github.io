var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var stop = 0;
var level =0;
var population = 0;
var stop = 0;
ctx.fillStyle = "rgba(88,88,88, 0.7)";

canvas.onclick = function (event) {
  var x = event.offsetX;
  var y = event.offsetY;
  //console.log(x);
  //console.log(y);
  x = Math.floor(x / 10);
  y = Math.floor(y / 10);
   mas[y][x] = mas[y][x] === 1 ? 0 : 1;
  //console.log(y,x);
  //console.log(mas);
  drawField();
};
function goLife() {

  for (var i = 0; i < 70; i++) {
    mas[i] = [];
    for (var j = 0; j < 70; j++) {
      mas[i][j] = [0];
    }
  }
}
goLife();
function stopLife() {
  stop = 1;
  //console.log(stop);
}

function clearField() {
  
  ctx.clearRect(0, 0, 700, 700);
  goLife();
  count = 0;
  document.getElementById('count').innerHTML = count;
  stop = 0;
  population = 0;
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML = 'EMPTY';
}

function drawField() {
  ctx.clearRect(0, 0, 700, 700);

  for (var i = 0; i < 70; i++) {
    for (var j = 0; j < 70; j++) {
      if (mas[i][j] == 1) {
        ctx.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }
}
function startLife() {
  console.log(level);
  var mas2 = [];
  //console.log(mas);
  for (var i = 0; i < 70; i++) {
    mas2[i] = [];

    for (var j = 0; j < 70; j++) {
      var neighbors = 0;
      if (mas[fpm(i) - 1][j] == 1) neighbors++;
      if (mas[i][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][j] == 1) neighbors++;
      if (mas[i][fpm(j) - 1] == 1) neighbors++;
      if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
      if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;
       mas2[i][j] = 0

      if (neighbors == 3 && mas[i][j] == 0) {
        mas2[i][j] = 1
      } 
      if ((neighbors == 2 || neighbors == 3) && mas[i][j] == 1) {
        mas2[i][j] = 1
      }
    }
  }
  mas = mas2;
  drawField();
  count++;
  if ((level == 1)) {
    check1level();
  }
  count_population();
  document.getElementById('count').innerHTML = count;
  document.getElementById('popul').innerHTML = population;
  if (stop == 0) timer = setTimeout(startLife, 700);
}
function fpm(i) {
  if (i == 0) return 70;
  else return i;
}
function fpp(i) {
  if (i == 69) return -1;
  else return i;
}

function loadlevel(lvl) {
 goLife();
  switch(lvl) {
    case 1:
      mas[20][20] = 1;
      mas[21][19] = 1;
      mas[21][20] = 1;
      mas[22][18] = 1;
      mas[22][20] = 1;
      mas[23][20] = 1;
      mas[24][20] = 1;
      mas[25][20] = 1;
      mas[26][20] = 1;
      mas[27][20] = 1;
      mas[28][18] = 1;
      mas[28][19] = 1;
      mas[28][20] = 1;
      mas[28][21] = 1;
      mas[28][22] = 1;
      break;
    case 2: 
      mas[18][20] = 1;
      mas[18][22] = 1;
      break;
    case 3: 
      mas[22][20] = 1;
      mas[22][21] = 1;
      break;
    case 4: 
      mas[15][15] = 1;
      mas[15][42] = 1;
      mas[15][43] = 1;
      mas[16][15] = 1;
      mas[33][43] = 1;
      mas[34][14] = 1;
      mas[34][15] = 1;
      mas[34][43] = 1;
      break;
    case 5: 
      
      break;
    case 6:
      mas[31][27] = 1;
      mas[31][28] = 1;
      mas[32][27] = 1;
      mas[32][28] = 1;
      break;
  }
  level = 1;
  count_population();
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML =
    'Размер популяции должен быть равен 158 к 10 поколению';
  drawField();
}

function count_population() {
  population=0;
  for (var i = 0; i < 70; i++) {
    for (var j = 0; j < 70; j++) {
      if (mas[i][j] == 1) {
        population++;
      }
    }
  }
  console.log(population);
}

function check1level() {
  count_population();
  
  if (count == 10 && population == 158) {
    stopLife();
    document.getElementById('info').innerHTML = 'You score';
  } else if (count > 10 && population != 158) {
    stopLife();
    document.getElementById('info').innerHTML = 'Didn’t work, Try again';
  }
}
function print(){
  for (var i = 0; i < 70; i++) {
    for (var j = 0; j < 70; j++) {
      if (mas[i][j] == 1) {
        console.log('mas['+i+']['+j+'] = 1;')
      }
    }
  }
}

