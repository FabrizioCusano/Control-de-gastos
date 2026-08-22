let tipo;
let categoriaElegida;
const saldoenpantalla = document.querySelector(".saldo");
let saldo;
let movimientos = [];
let paginaActual = 1;
if (localStorage.getItem("movimientosguardados") !== null) {
    movimientos = JSON.parse(localStorage.getItem("movimientosguardados"))
}
const saldoqueveelcliente = document.querySelector(".saldoqueveelcliente");
let numeroIngresado = "";
const boton0 = document.querySelector(".boton0");
const boton1 = document.querySelector(".boton1");
const boton2 = document.querySelector(".boton2");
const boton3 = document.querySelector(".boton3");
const boton4 = document.querySelector(".boton4");
const boton5 = document.querySelector(".boton5");
const boton6 = document.querySelector(".boton6");
const boton7 = document.querySelector(".boton7");
const boton8 = document.querySelector(".boton8");
const boton9 = document.querySelector(".boton9");
const borrarnumerodesaldo = document.querySelector(".borrarnumerodesaldo");
const pantallaborrosa = document.querySelector(".pantallaborrosa");
const confirmarSaldo = document.querySelector(".confirmarSaldo");
const ingresarnumero = document.querySelector(".IngresarNumero");
const categorias = document.querySelector(".categorias");
const boton = document.querySelector(".botonAgregar");
const iconosCategoria = {
    comida: "fork_spoon",
    ropa: "Apparel",
    compras: "Shopping_Cart",
    otros: "more_horiz"
};
boton.addEventListener("click", function(){
menu.style.display = "flex"
});
const confirmar = document.querySelector(".Confirmar");
const menu = document.querySelector(".menuboton");
const gasto = document.querySelector(".botonGasto");
const ingreso = document.querySelector(".botonIngreso");
const movimientostarjeta = document.querySelector(".tarjetamovimientos");
const paginacion = document.querySelector(".paginacion");
gasto.addEventListener("click", function(){
    tipo = "gasto"
    categorias.style.display = "flex"
});
ingreso.addEventListener("click", function(){
    tipo = "ingreso"
    ingresarnumero.style.display = "flex"
    confirmar.style.display = "flex"
});
confirmar.addEventListener("click", function(){
let cantidad = Number(ingresarnumero.value);
if (tipo === "gasto") {
    saldo = saldo - cantidad
    saldoenpantalla.textContent = "$" + saldo;
    ingresarnumero.style.display = "none"
    confirmar.style.display = "none"
    menu.style.display = "none"
    ingresarnumero.value = ""
    localStorage.setItem("saldoguardado", saldo)
} else {
    saldo = saldo + cantidad
    saldoenpantalla.textContent = "$" + saldo;
    ingresarnumero.style.display = "none"
    confirmar.style.display = "none"
    menu.style.display = "none"
    ingresarnumero.value = ""
    localStorage.setItem("saldoguardado", saldo)
}
movimientos.push({fecha: new Date().toLocaleDateString(), tipo: tipo, cantidad: cantidad,categoria: categoriaElegida})
localStorage.setItem("movimientosguardados",JSON.stringify(movimientos) )
funcionmovimientos();
funcionpaginacion();
});
if (localStorage.getItem("saldoguardado") === null) {
pantallaborrosa.style.display = "flex"
}
else{
    saldo = Number(localStorage.getItem("saldoguardado"))
}
saldoenpantalla.textContent = "$" + saldo;
function funcionmovimientos(){
    movimientostarjeta.textContent = "";
    const invertido = movimientos.slice().reverse();
    const desde = (paginaActual - 1) * 5;
    const hasta = paginaActual * 5;
    for (const movimiento of invertido.slice(desde, hasta)){
        const p = document.createElement("p");
        if (movimiento.tipo === "gasto"){
            p.style.color = "red";
            p.textContent = movimiento.categoria +"-" + movimiento.fecha + "- $" + movimiento.cantidad;
        }
        else{
            p.style.color = "green";
            p.textContent = movimiento.categoria + "-" + movimiento.fecha + "+ $" + movimiento.cantidad;
        }
        movimientostarjeta.appendChild(p);
    }
}
funcionmovimientos();
function funcionpaginacion(){
    paginacion.textContent = "";
    let totalPaginas = Math.ceil(movimientos.length / 5);
    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement("button");
        boton.textContent = i;
        paginacion.appendChild(boton);
        boton.addEventListener("click", function(){
            paginaActual = i;
            funcionmovimientos();
            for (const b of botones){ 
                b.classList.remove("activo")
            } 
            boton.classList.add("activo");
        });
    }
    const botones = document.querySelectorAll(".paginacion button");
}
funcionpaginacion();
boton0.addEventListener("click", function(){
    numeroIngresado += "0";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton1.addEventListener("click", function(){
    numeroIngresado += "1";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton2.addEventListener("click", function(){
    numeroIngresado += "2";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton3.addEventListener("click", function(){
    numeroIngresado += "3";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton4.addEventListener("click", function(){
    numeroIngresado += "4";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton5.addEventListener("click", function(){
    numeroIngresado += "5";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton6.addEventListener("click", function(){
    numeroIngresado += "6";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton7.addEventListener("click", function(){
    numeroIngresado += "7";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton8.addEventListener("click", function(){
    numeroIngresado += "8";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
boton9.addEventListener("click", function(){
    numeroIngresado += "9";
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
confirmarSaldo.addEventListener("click",function(){
saldo = Number(numeroIngresado);
localStorage.setItem("saldoguardado", saldo);
    saldoenpantalla.textContent = "$" + saldo;
    pantallaborrosa.style.display = "none";
});
borrarnumerodesaldo.addEventListener("click",function(){
    numeroIngresado = numeroIngresado.slice(0,numeroIngresado.length-1)
    saldoqueveelcliente.textContent = "$" + numeroIngresado;
});
categorias.addEventListener("click", function(event){
    const boton = event.target.closest("button");
    if (!boton) return;
    categoriaElegida = boton.classList[0];
    categorias.style.display = "none";
    ingresarnumero.style.display = "flex";
    confirmar.style.display = "flex";
});