//Variables
//Cartas destapadas
let cartasback = 0;
//Carta 1 y Carta 2
let carta1 = null;
let carta2 = null;
let primerRes = null;
let segundoRes = null;
let verde = 'aciertoVerde';
let rojo =  'errorRojo';
//Los aciertos, movimientos y tiempo
let aciertos = 0;
let movimientos = 0;
let tiempo = false;
let timer = 50;
let timerIn = 50;
let tiempoR = null;

//Sonidos
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/clic.wav');

//Mostrar movimientos
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');


//Para crear un array aleatorio utilizaremos sort.
let imagenes = [];
let numCartas = 32;
let numPares = 8;
let maxPares = 31;
let minPares = 0;

init();
function init(){
imagenes = [];
for(var i=0; i < numPares; i++){
  let idImages = random();
  if(imagenes.indexOf(idImages)<0){
    imagenes.push(idImages);
    imagenes.push(idImages);
  } else {
    i--;
  }
}
imagenes = imagenes.sort(()=>{return Math.random() - 0.5});
console.log(imagenes);
}
function random() {
    return Math.floor((Math.random() * (maxPares - minPares + 1)) + minPares);
}
//Funciones
function contarTiempo(){
    tiempoR = setInterval(()=>{
        mostrarTiempo.innerHTML = `Tiempo: ${timer}s`;
        timer--;
        if(timer < 0){
            clearInterval(tiempoR);
            //Se bloquean las tarjetas
            bloquearCartas(imagenes);
            loseAudio.play();
        }
    },1000,timer);
}
//Bloquer tarjetas con el tiempo
function bloquearCartas(imagenes){
    for(let i=0; i<=15; i++){
    //declaramos la varibale carta bloqueada
      let cartaBloqueada = document.getElementById(i);
      cartaBloqueada.innerHTML =  `<img src="./img/${imagenes[i]}.png">`;
      cartaBloqueada.disabled = true;
    }
}
//Funcion voltear
function back(id) {
    //temporizador
    if(tiempo == false){
        //Funcion contar el tiempo
        contarTiempo();
        //Se activa.
        tiempo = true;
    }
    //contador de cartas destapadas
    if(cartasback == 0) {
        //Mostramos la primera carta
        carta1 = document.getElementById(id);
        //Guardamos el valor del primer back del arreglo
        primerRes = imagenes[id];
        //Imprimimos la imagen
        carta1.innerHTML = `<img src="./img/${primerRes}.png">`;
        //Play
        clickAudio.play();
        //Deshabilitamos la primer seleccion
        carta1.disabled = true;
        cartasback ++;

    }else if(cartasback == 1) {
        //Mostramos la segunda carta
        carta2 = document.getElementById(id);
        //Guardamos el segundo valor del back
        segundoRes = imagenes[id];
        //Imprimimos la imgane
        carta2.innerHTML = `<img src="./img/${segundoRes}.png">`;
        //Deshabilitamos la segunda seccion
        carta2.disabled = true;
        cartasback ++;
        //Incremento de movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    
        //Revisamos si los resuultados son iguales
        if(primerRes == segundoRes) {
            //Ponemos en 0 las tarjetas destapadas y se resetea.
            cartasback = 0;
            carta1.className = verde;
            carta2.className = verde;
            console.log(carta1);
            //Imprimimos el acierto
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            //Play
            winAudio.play();
        }else{
            //Play
            loseAudio.play();
            carta1.className = rojo;
            carta2.className = rojo;
            console.log(carta1);
            //mostrar imagenes momentaneamente y volver a tapar
            //Temporizamos
            setTimeout(()=>{
                carta1.innerHTML = ' ';
                carta2.innerHTML = ' ';
                carta1.className = ' ';
                carta2.className = ' ';
                carta1.disabled = false;
                carta2.disabled = false;
                //Para volver a escojer otras tarejtas
                cartasback = 0;
                
            },800);
        }
    }
    if(aciertos == 8){
        //Play
     winAudio.play();
        clearInterval(tiempoR);
        mostrarAciertos.innerHTML = `Felicidades tus aciertos: ${aciertos}`;
        mostrarTiempo.innerHTML =  `Solo demoraste: ${timerIn - timer -1 } segundos`;
        mostrarMovimientos.innerHTML = `Tus Movimientos fueron: ${movimientos}`;
    }
}
function reinicio(){  
    location.reload()
}

