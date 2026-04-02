//script.js
//punto de partida del proyecto
let ESCALA =20;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarCuadricula(ctx, canvas.width, canvas.height);
    //dibujar las marcas de la escala
    dibujarEscala(ctx, canvas.width, canvas.height);

    //se llama al algoritmo, que pasa por la funcion plot
    bresenham(x0, y0, x1, y1, function(x,y) {
        plot(ctx, x, y, canvas.height);
    });
}
/**
 * dibuja un pixel en el canvas en la posición (x, y)
 * @param {CanvasRenderingContext2D} ctx - contexto del canvas
 * @param {number} x - Coordenadas X del pixel
 * @param {number} y - Coordenadas Y del pixel
 */
 
function plot (ctx, x, y, alto){
    ctx.fillStyle = "black";
    //Cada pixel se va a dibujar como un cuadrado para que sea mas visible
    let px = x*ESCALA;
    let py = (alto-20)-(y*ESCALA);
    ctx.fillRect(px, py, 6, 6);
}

/**
 * dibuja las marcasde escala numerica en los bordesdel canvas
 * tambien se muestra el eje y el eje y
 * @param {CanvasRenderingContext2D} ctx - contexto del canvas 
 * @param {number} ancho - ancho total del canvas en px
 * @param {number} alto - alto total del canvas en px
*/

function dibujarEscala(ctx, ancho, alto){
    ctx.fillStyle="black";
    ctx.font="10px Arial";

    //aqui se calculan cuantas marcas entran en cada eje 
    let marcasX = Math.floor(ancho/ESCALA);
    let marcasY = Math.floor((alto-20)/ESCALA);

    //se dibujan los numeros en el eje x
    for (let i=0; i<=marcasX; i++){
         ctx.fillText(i, i*ESCALA+2, alto-5);
    }
    //se dibujan los numeros en el eje y
    for (let j=0; j<=marcasY; j++){
        ctx.fillText(j,2, (alto-20)-(j*ESCALA)+10);
    }
}
    /**
 * implementación el algoritmo de lineas de bresenham
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

    //arreglo para guardar los pasos
    let pasos = [];

    while(true){
        plot(x0,y0);

        //calcula el e2 para guardarlo en la tabla
        let e2=2*err;

        //se guarda el estado actual como un objeto
        pasos.push({
            x: x0, y: y0,
            dx: dx, dy: dy,
            sx: sx, sy: sy,
            err: err, e2: e2
        })
        if(x0 === x1 && y0 === y1) 
            break;

        if(e2>-dy){
            err-=dy;
            x0+=sx;
        }
        if(e2<dx){
            err+=dx;
            y0+=sy;
        }
    }
    //aqui llamamos a generarTabla con los pasos ya recolectados
    generarTabla(pasos);
}
/**
 * geeneramos una tabla con los valores de cada paso del algotitmo
 * mostramos x, y, dx, dy, sx, sy, err y e2 en cada interaccion
 * @param {array} pasos - este funciona como el arreglo de los objetos con los valores de cada paso
 */
function generarTabla(pasos){
    //se obtiene el contenedor de la tabla 
    let contenedor = document.getElementById("contenedorTabla");

    //construimos la tabla 
    let html = "<table border='1'>";
    html += "<tr>";
    html += "<th>Paso</th>";
    html += "<th>x</th>";
    html += "<th>y</th>";
    html += "<th>dx</th>";
    html += "<th>dy</th>";
    html += "<th>sx</th>";
    html += "<th>sy</th>";
    html += "<th>err</th>";
    html += "<th>e2</th>";
    html += "</th>";

    //agregamos una fila por cada paso
    for (let i=0; i<pasos.length; i++){
        let p=pasos[i];
        html += "<tr>";
        html += "<td>" + (i+1)+"</td>";
        html += "<td>" + p.x + "</td>";
        html += "<td>" + p.y + "</td>";
        html += "<td>" + p.dx + "</td>";
        html += "<td>" + p.dy + "</td>";
        html += "<td>" + p.sx + "</td>";
        html += "<td>" + p.sy + "</td>";
        html += "<td>" + p.err + "</td>";
        html += "<td>" + p.e2 + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    contenedor.innerHTML = html;
}
function dibujarCuadricula (ctx, ancho, alto){
    ctx.strokeStyle="#dddddd";
    ctx.lineWidth =0.5;

    //lineas verticales
    for (let x=0; x <= ancho; x+= ESCALA){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,alto-20);
        ctx.stroke();
    }
    //lineas horizontales
    for(let y=0; y<= alto-20;y+=ESCALA){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(ancho,y);
        ctx.stroke();
    }
}
