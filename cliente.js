var elementos = [];

var asyncQuery = function(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // https://stackoverflow.com/questions/13293617/why-is-my-ajax-function-calling-the-callback-multiple-times
        if (this.readyState === 4) {
            
            if (this.status === 200) {
                // parseamos el resultado para obtener el objeto JavaScript
                resObj = JSON.parse(xhttp.responseText);
                if(resObj.infracciones.length > 0){
                    callback(resObj);
                    return true;
                }
                else{
                    sinInfracciones();
                    return false;
                }

                // llamamos a la función callback con el objeto parseado como parámetro.
            }
            // if(this.status === 404){
            //     sinInfracciones();
            // }
        }
    };
    xhttp.open("GET", url, true);
    var ret = xhttp.send();
    return ret;
}

function sinInfracciones(){
    console.log('No se encontraron infracciones para la patente');
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
    arreglo.forEach(o => {

        let tag = '<div>' +
        'Infracción: ' + o.id + '<br>' +
        o.fechaHoraRegistro + '<br>' +
        o.fechaHoraActualizacion + '<br>' +
        o.direccionRegistrada + '<br>' +
        o.tipoInfraccion + '<br>' +
        o.montoAPagar + '<br>' +
        o.existeAcarreo + '</div><br>';  
        $('.contenedor').append(tag);

    });

}
function setTitulo(dato){
    $('.titulo').append('<h3>Patente ' + dato + '</h3>');
}
var urlCompleta = url + urlPantente + urlinfracciones;
// console.log(urlCompleta);
// var urlJoda = 'http://localhost:8000/infracciones.json';

function consultarInfraccion(patente){
    var urlPantente = '/' + patente; 
    var urlCompleta = url + urlPantente + urlinfracciones;
    return asyncQuery(urlCompleta,  callback);
}


