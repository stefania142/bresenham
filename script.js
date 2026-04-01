//script.js
//punto de partida del proyecto

/**
 *Función principalque se ejecuta al hacer clic en "dibujar".
 *lee los valores de la tabla y los muestra en consola 
 */

 function dibujar(){
    //leer los valores y convertirlos a numero entero
    let x0= parseInt(document.getElementById("x0").value);
    let y0= parseInt(document.getElementById("y0").value);
    let x1= parseInt(document.getElementById("x1").value);
    let y1= parseInt(document.getElementById("y1").value);

    //obtener el canvas y su contexto de dibujo 2d
    let canvas=document.getElementById("miCanvas");
    let ctx = canvas.getContext("2d");

    //limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.Width, canvas.height);
    //dibujar las marcas de la escala
    dibujarEscala(ctx, 4, canvas.Width, canvas.height);

    //se llama al algoritmo, que pasa por la funcion plot
    bresenham(x0, y0, x1, y1, function(x,y) {
        plot(ctx, x, y);
    });
}
/**
 * dibuja un pixel en el canvas en la posición (x, y)
 * @param {CanvasRenderingContext2D} ctx - contexto del canvas
 * @param {number} x - Coordenadas X del pixel
 * @param {number} y - Coordenadas Y del pixel
 */
 
function plot (ctx, x, y){
    ctx.fillStyle = "black";
    //Cada pixel se va a dibujar como un cuadrado para que sea mas visible
    ctx.fillRect(x*4,y*4,4,4);
}
/**
 * implementaos el algoritmo de lineas de bresenham
 * @param {number} x0 - coordenadas x inicial
 * @param {number} y0 - coodernadas y inicial
 * @param {number} x1 - coordenadas x final
 * @param {number} y1 - coordenadas y final
 * @param {Function} plot - funcion para dibujar el pixel (x, y)
 */

function bresenham (x0 , y0, x1, y1, plot){
    let dx = Math.abs(x1-x0);
    let dy = Math.abs(y1-y0);
    let sx = (x0<x1)?1:-1;
    let sy = (y0<y1)?1:-1;
    let err = dx-dy;

    while(true){
        plot(x0,y0);
        if(x0===x1 && y0===y1) 
            break;
        let e2 = 2 *err;

        if(e2>-dy){
            err-=dy;
            x0+=sx;
        }
        if(e2<dx){
            err+=dx;
            y0+=sy;
        }
    }
}
/**
 * dibuja las marcasde escala numerica en los bordesdel canvas
 * tambien se muestra el eje y el eje y
 * @param {CanvasRenderingContext2D} ctx - contexto del canvas 
 * @param {number} escala - tamaño en pixeles en cada unidad donde esto tiene que coincidir con el plot
 * @param {number} ancho - ancho total del canvas en px
 * @param {number} alto - alto total del canvas en px
*/

function dibujarEscala(ctx, escala, ancho, alto){
    ctx.fillStyle="black";
    ctx.font="10px Arial";

    //aqui se calculan cuantas marcas entran en cada eje 
    let marcasX = Math.floor(ancho/escala);
    let marcasY = Math.floor(alto/escala);

    //se dibujan los numeros en el eje x
    for (let i=0;i<=marcasX;i++){
         ctx.fillText(i, i*escala, alto-5);
    }
    //se dibujan los numeros en el eje y
    for (let j=0; j<=marcasY; j++){
        ctx.fillText(j, 2, j*escala+10);
    }
}