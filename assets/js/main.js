// CLASES PARA CONSTRUIR OBJETOS
class ValorHora {
  constructor(tipoDrone, horasVuelo) {
    (this.tipoDrone = tipoDrone), (this.horasVuelo = horasVuelo);
  }
  seleccionDrone() {
    if (this.tipoDrone == 1) {
      return "Ala fija";
    } else if (this.tipoDrone == 2) {
      return "Multirotor";
    }
  }
  seleccionHoras() {
    if (this.horasVuelo >= 1) {
      return 1 * this.horasVuelo;
    }
  }
}

class CantidadCalidad {
  constructor(cantidad) {
    this.cantidad = cantidad;
  }
}

class ValorFotos {
  constructor(calidad, cantidad, precio) {
    (this.calidad = calidad),
      (this.cantidad = cantidad),
      (this.precio = precio),
      (this.vendido = false);
  }
  calculoPrecio() {
    if (this.calidad == 12) {
      return 6000;
    } else if (this.calidad == 20) {
      return 8000;
    } else if (this.calidad == 48) {
      return 12000;
    }
  }
}

// FUNCION PARA EJECUTAR COMPRAS
// COTIZAR SERVICIO
$(`#form1`).on("submit", function () {
  const tipoDrone = $(`#tipoUas`).val();
  const horasVuelo = $(`#horasVuelo`).val();

  const precio1 = new ValorHora(tipoDrone, horasVuelo);
  let drone = precio1.seleccionDrone();
  console.log(drone);
  let horas = precio1.seleccionHoras();
  console.log(horas);
  console.log(precio1);

  function precioDrone() {
    if (drone === "Ala fija") {
      return 150000 * horas;
    } else if (drone === "Multirotor") {
      return 100000 * horas;
    }
  }

  let precio = precioDrone();
  console.log(precio);

  mostrarCotizacion(precio1);

  // eliminar elementos
  function mostrarCotizacion(coti) {
    let formulario = document.getElementById("containerGeneral");
    formulario.parentNode.removeChild(formulario);
    //agregar elementos
    $("#main").prepend(
      `<div class="info-coti"><p>Hola, tu cotización tiene un costo de <span id="spanPrecio">${precio} COP</span>. Consta de una operación con UAS de tipo <span id="spanDrone">${drone}</span> con una duración de <span id="spanHora">${horasVuelo} horas</span>. <br> Para realizar otra cotización oprima el siguiente botón <input type="button" value="Cotizador" onclick="location.reload()"/></p></div> `
    );
    $("#spanPrecio")
      .fadeOut("fast")
      .fadeIn(2000, function () {
        $("#spanDrone")
          .fadeOut("fast")
          .fadeIn(2000, function () {
            $("#spanHora").fadeOut("fast").fadeIn(2000);
          });
      });
  }
});

// COMPRA DE FOTOS ALEATORIAS

function comprarFotos() {
  listaFotos = [];

  const calidad = $(`#calidad`).val();
  const cantidad = $(`#cantidad`).val();

  let articuloIngresado = new ValorFotos(calidad, cantidad);
  console.log(articuloIngresado);
  let precio = articuloIngresado.calculoPrecio();
  console.log(precio);
  articuloIngresado = listaFotos.push(
    new ValorFotos(calidad, cantidad, precio)
  );
  console.log(listaFotos);

  listaFotos.forEach((foto) => {
    let fotoStringifada = JSON.stringify(foto);
    localStorage.setItem(foto.id, fotoStringifada);
  });
  const tomarTodoLocal = () => {
    for (let i = 0; i < localStorage.length; i++) {
      let clave = localStorage.key(i);
      console.log("Clave: " + clave);
      console.log("Valor: " + localStorage.getItem(clave));
    }
  };
  tomarTodoLocal();
  mostrarPrecio(articuloIngresado);

  // eliminar elementos
  function mostrarPrecio(valor) {
    let formulario = document.getElementById("containerGeneral");
    formulario.parentNode.removeChild(formulario);
    //agregar elementos
    $("#main").prepend(
      `<div class="info-foto"><p>Hola, el costo de tus <span id="spanCantidad">${cantidad}</span> fotografías en calidad de <span id="spanCalidad">${calidad} MP</span>, tienen un costo de <span id="spanCosto">${
        precio * cantidad
      } COP</span> <br> Para realizar otra compra oprime el siguiente botón <input type="button" value="Comprar" onclick="location.reload()"/> <br> <button id="btnFicha">Ver ficha técnica</button> <div id="mostrarFicha"></div> </p></div> `
    );
    $("#spanCantidad")
      .fadeOut("fast")
      .fadeIn(2000, function () {
        $("#spanCalidad")
          .fadeOut("fast")
          .fadeIn(2000, function () {
            $("#spanCosto").fadeOut("fast").fadeIn(2000);
          });
      });
  }

  // INICIO Llamada AJAX
  const UrlDelJson = "uas.json";
  // let para limitar la impresión de la ficha técnica
  let numAppend = 0;
  $("#btnFicha").click(() => {
    $.getJSON(UrlDelJson, (respuesta, status) => {
      if (status === "success") {
        let misDatos = respuesta;
        if (numAppend == 0) {
          if (calidad === "12") {
            $("#mostrarFicha").append(
              `<li>Drone modelo: ${misDatos["uas"][0]["model"]}</li><li>Calidad de imagen de ${misDatos["uas"][0]["calidad"]} MP</li><li>Apertura de ${misDatos["uas"][0]["apertura"]}</li><li>CMOS de ${misDatos["uas"][0]["cmos"]} pulgadas</li>`
            );
            numAppend++;
          } else if (calidad === "20") {
            $("#mostrarFicha").append(
              `<li>Drone modelo: ${misDatos["uas"][1]["model"]}</li><li>Calidad de imagen de ${misDatos["uas"][1]["calidad"]} MP</li><li>Apertura de ${misDatos["uas"][1]["apertura"]}</li><li>CMOS de ${misDatos["uas"][1]["cmos"]} pulgadas</li>`
            );
            numAppend++;
          } else if (calidad === "48") {
            $("#mostrarFicha").append(
              `<li>Drone modelo: ${misDatos["uas"][2]["model"]}</li><li>Calidad de imagen de ${misDatos["uas"][2]["calidad"]} MP</li><li>Apertura de ${misDatos["uas"][2]["apertura"]}</li><li>CMOS de ${misDatos["uas"][2]["cmos"]} pulgadas</li>`
            );
            numAppend++;
          }
        } else {
          console.log("Solo se imprime una vez la ficha técnica");
        }
      }
    });
  });
  // FIN Llamada AJAX
}

// VALIDAR COMPRA DE FOTOS
$(`#form2`).on("submit", function () {
  const calidad = $(`#calidad`).val();
  if (calidad != 12 && calidad != 20 && calidad != 48) {
    alert("Hubo un error. Digita solo el numero 12, 20 ó 48");
  } else [comprarFotos()];
});
