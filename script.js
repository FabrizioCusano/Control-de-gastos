let tipo;
const saldoenpantalla = document.querySelector(".saldo");
let saldo;
let movimientos = [];
let paginaActual = 1;
if (localStorage.getItem("movimientosguardados") !== null) {
    movimientos = JSON.parse(localStorage.getItem("movimientosguardados"))
}
const ingresarnumero = document.querySelector(".IngresarNumero");
const boton = document.querySelector(".botonAgregar");
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
    ingresarnumero.style.display = "flex"
    confirmar.style.display = "flex"
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
movimientos.push({fecha: new Date().toLocaleDateString(), tipo: tipo, cantidad: cantidad})
localStorage.setItem("movimientosguardados",JSON.stringify(movimientos) )
funcionmovimientos();
funcionpaginacion();
});
if (localStorage.getItem("saldoguardado") === null) {
saldo = Number(prompt("¿Cual es tu saldo actual?"))
localStorage.setItem("saldoguardado", saldo)
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
            p.textContent = movimiento.fecha + "- $" + movimiento.cantidad;
        }
        else{
            p.style.color = "green";
            p.textContent = movimiento.fecha + "+ $" + movimiento.cantidad;
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
        });
    }
}
funcionpaginacion();