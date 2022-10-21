//Variables
let cartasback = 0;
let carta1 = null;
let carta2 = null;
let primerback = null;
let segundoback = null;
let movimientos = 0;
let aciertos = 0;
let cartablock = null;

//Mostrar movimientos
let mostrarmov = document.getElementById('movimientos');
let mostraraci = document.getElementById('aciertos');

//Para crear un array aleatorio utilizaremos sort.
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);



//Funcion voltear
function back(id){
    //contador de cartas destapadas
    cartasback++;
    console.log(cartasback);
    
    if(cartasback == 1){
        //Mostramos la primera carta
        carta1 = document.getElementById(id);
        //Guardamos el valor del primer back
        primerback = numeros[id];
        //Imprimimos la imagen
        carta1.innerHTML = `<img src="./img/${primerback}.png">`;
        //Deshabilitamos la primer seleccion
        carta1.disable = true;
    }else if(cartasback == 2){
        //Mostramos la segunda carta
        carta2 = document.getElementById(id);
        //Guardamos el segundo valor del back
        segundoback = numeros[id];
        //Imprimimos la imgane
        carta2.innerHTML = `<img src="./img/${segundoback}.png">`;
        //Deshabilitamos la segunda seccion
        carta2.disable = true;

        //Incremento de movimientos
        movimientos++;
        mostrarmov.innerHTML = `Movimientos:${movimientos}`;

        //Revisamos si los resuultados son iguales
        if(carta1 == carta2){
            cartasback = 0;
            //Imprimimos el acierto
            aciertos++;
            mostraraci.innerHTML = `Aciertos:${aciertos}`;

        }else{
            //mostrar imagenes y volver a tapar
            setTimeout(()=>{
                carta1.innerHTML = ' ';
                carta2.innerHTML = ' ';
                carta1.disable = false;
                carta2.disable = false;
                //Para volver a destapar
                cartasback = 0;
            },1000);
        }
    }
}