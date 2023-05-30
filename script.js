const containerEl = document.querySelector(".container");  
const btnDif = document.querySelector("#btnDif");
const btnMed = document.querySelector("#btnMed");
const btnFac = document.querySelector("#btnFac");
const cronometro = document.querySelector("#cronometro")

const clases = ["container-facil", "container-medio", "container-dif"];

const NUM_DIF = 30;  
const NUM_MED = 24;
const NUM_FAC = 16;
 
let total;   
let arrElegidos = [];    
let contador = 0;

let seg = -2;  
let min = 0; 
let intervalCrono;

btnDif.addEventListener("click", () => {
    containerEl.classList.remove(...clases);
    containerEl.classList.add("container-dif");
    limpiarContainer();
    agregarCajas(NUM_DIF);
    chequeoCronometro();
})

btnMed.addEventListener("click", () => {
    containerEl.classList.remove(...clases);
    containerEl.classList.add("container-medio");
    limpiarContainer();
    agregarCajas(NUM_MED);
    chequeoCronometro();
})

btnFac.addEventListener("click", () => {
    containerEl.classList.remove(...clases);
    containerEl.classList.add("container-facil");
    limpiarContainer();
    agregarCajas(NUM_FAC);
    chequeoCronometro();
})

function limpiarContainer(){

    while(containerEl.childNodes.length >= 1){
        containerEl.childNodes[0].remove();
    }
}

function agregarCajas(num){

    contador = 0;

    let imagenes = [
        "url(images/arg.png)", "url(images/arg.png)",
        "url(images/bol.png)", "url(images/bol.png)",
        "url(images/bra.png)", "url(images/bra.png)",
        "url(images/par.png)", "url(images/par.png)",
        "url(images/uru.png)", "url(images/uru.png)",
        "url(images/mex.png)", "url(images/mex.png)",
        "url(images/eng.png)", "url(images/eng.png)",
        "url(images/esp.png)", "url(images/esp.png)",
        "url(images/fra.png)", "url(images/fra.png)",
        "url(images/usa.png)", "url(images/usa.png)",
        "url(images/can.png)", "url(images/can.png)",
        "url(images/ale.png)", "url(images/ale.png)",
        "url(images/hol.png)", "url(images/hol.png)",
        "url(images/chi.png)", "url(images/chi.png)",
        "url(images/sue.png)", "url(images/sue.png)",
    ]

    if(num === NUM_MED){
        imagenes = imagenes.slice(0, NUM_MED);
        total = NUM_MED / 2;
    }
    else if(num === NUM_FAC){
        imagenes = imagenes.slice(0, NUM_FAC);
        total = NUM_FAC / 2;
    }
    else{
        total = NUM_DIF / 2;
    }

    imagenes = imagenes.sort(() => Math.random() - 0.5);

    for(let i= 0; i < num; i++){
        let imagen = imagenes[i];

        const caja = document.createElement("div");
        caja.classList.add("cajas");
        caja.datasrc = imagen;
        caja.style.backgroundImage = imagen;
        caja.style.animation = "dar-vuelta 0.5s linear";
        caja.style.pointerEvents = "none";

        setTimeout(()=>{
            caja.style.animation = "dar-vuelta-rev 0.5s linear";
            caja.style.backgroundImage = "url(images/signo-preg.png)";
            caja.style.pointerEvents = "auto";
        },2000)

        caja.addEventListener("click", clickHandler);

        containerEl.appendChild(caja);
    }
}

function clickHandler(e){
    
    let tarjeta = e.target;
    tarjeta.style.animation = "dar-vuelta 0.5s linear";
    tarjeta.style.backgroundImage = tarjeta.datasrc;
    tarjeta.style.pointerEvents = "none";
    
    if(arrElegidos.length === 0){
        arrElegidos.push(tarjeta)
    }
    else{
        containerEl.style.pointerEvents = "none";

        arrElegidos.push(tarjeta);
        if(arrElegidos[0].datasrc === arrElegidos[1].datasrc){
            contador += 1;
            arrElegidos[0].style.boxShadow = "1px -1px 17px 5px rgba(12,157,1,0.75)";
            arrElegidos[1].style.boxShadow = "1px -1px 17px 5px rgba(12,157,1,0.75)";
            arrElegidos = [];
            if(contador === total){
                clearInterval(intervalCrono);
                setTimeout(()=>{
                    limpiarContainer();
                    mostrarMensajeGana();
                },1000)
            }
        }
        else{
            darVuelta(arrElegidos);
            arrElegidos = [];
        }

        setTimeout(()=>{
            containerEl.style.pointerEvents = "auto";
        },1500)
    }
}

function darVuelta(arr){
    setTimeout(()=>{
        arr.forEach(tarjeta => {
            tarjeta.style.backgroundImage = "url(images/signo-preg.png)";
            tarjeta.style.pointerEvents = "auto";
            tarjeta.style.animation= "dar-vuelta-rev 0.5s linear";
        });
    }, 1000)
}

function mostrarMensajeGana(){
    containerEl.classList.remove(...clases);
    cronometro.textContent = "";
    let mensaje = document.createElement("div");
    if(min < 10){
        min = `0${min}`;
    }
    if(seg < 10){
        seg = `0${seg}`;
    }
    mensaje.innerHTML = `<p>Ganaste con un tiempo de ${min}:${seg} <span class="ec ec-trophy"></span></p>`;
    mensaje.classList.add("msj-victoria");
    containerEl.appendChild(mensaje);
}

function chequeoCronometro(){
    if(intervalCrono){
        clearInterval(intervalCrono)
        cronometro.textContent = "";
        min = 0;
        seg = -2;
        intervalCrono = setInterval(avance, 1000);
    }else{
        intervalCrono = setInterval(avance, 1000);
    }
}

function avance(){
    seg += 1
    if(seg === 60){
        min += 1;
        seg = 0;
    }
    if(seg < 10 && seg >= 0){
        cronometro.textContent = `0${min}:0${seg}`;
    }else if(seg > 0){
        cronometro.textContent = `0${min}:${seg}`;
    }
}   
