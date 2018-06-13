var elementos = [];

var asyncQuery = function(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // https://stackoverflow.com/questions/13293617/why-is-my-ajax-function-calling-the-callback-multiple-times
        if (this.readyState === 4) {
            if (this.status === 200) {
                // parseamos el resultado para obtener el objeto JavaScript
                resObj = JSON.parse(xhttp.responseText)
                // llamamos a la función callback con el objeto parseado como parámetro.
                callback(resObj);
            }
        }
    };
    xhttp.open("GET", url, true);
    var ret = xhttp.send();
    return ret;
}


var url = Config.url;
var urlPantente = '/ABC123';
var urlinfracciones = '/infracciones/';



var callback = function(response){
    response.infracciones.forEach(element => {
        elementos.push(element);
    });
    agregarListado(elementos);
}


function agregarListado(arreglo){
    
    setTitulo(arreglo[0].patente);
    for (let index = 0; index < arreglo.length; index++) {

        let objeto = arreglo[index];
        let id = objeto.id;
        let fechaRegistro = objeto.fechaHoraRegistro;
        let fechaActualizacion = objeto.fechaHoraActualizacion;
        let direccionRegistrada = objeto.direccionRegistrada;
        let tipoInfraccion = objeto.tipoInfraccion;
        let montoAPagar = objeto.montoAPagar;
        let existeAcarreo = objeto.existeAcarreo;

        let tag = '<div>' +
        'Infracción: ' + id + '<br>' +
        fechaRegistro + '<br>' +
        fechaActualizacion + '<br>' +
        direccionRegistrada + '<br>' +
        tipoInfraccion + '<br>' +
        montoAPagar + '<br>' +
        existeAcarreo + '</div><br>';  
        $('.contenedor').append(tag);
    }
}
function setTitulo(dato){
    $('.titulo').append('<h3>Patente ' + dato + '</h3>');
}
// var callback = function(response) {
    
//     var states = response.estados.reduce(function(dict, state) {
//         dict[state.id] = state;			
//         return dict;
//     }, {});

//     //pedimos la grua 1
//     var callback2 = function(response) {
//         console.log(states);
//         var grua = response.grua;

//         console.log(grua);

//         grua.estado = states[response.grua.estado_id];            
//         delete grua.estado_id;

//         console.log(grua);

//         drawer.drawTowTruckInMap(grua, map);
//     }
//     asyncQuery(url + urlGruas + "1", callback2);

// };
var urlCompleta = url + urlPantente +urlinfracciones;
// console.log(urlCompleta);
// var urlJoda = 'http://localhost:8000/infracciones.json'; 
asyncQuery(urlCompleta,callback);

