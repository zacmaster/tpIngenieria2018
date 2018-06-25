var callbackInfraccion = function(response){
    var cache = [];
    response.infracciones.forEach(element => {
        cache.push(element); });
        
    response = cache;
    var patente = devolverPatente(response);
    if (response.length > 0){cargarListadoInfracciones(patente, response)}
    else{cargarPatenteNoEncontrada(patente, response)}
}

function devolverPatente(){
    return 'ABC123';
}

function setTitulo(dato){
    $('.titulo').append('<h3>Patente ' + dato + '</h3>');
}

function consultarInfraccion(patente){
    patente = patente.toUpperCase();
    var urlPantente = '/' + patente; 
    var urlCompleta = url + urlPantente + urlinfracciones;
    asyncQuery(urlCompleta,  callbackInfraccion);
}

function quitarResultados(){
    $('button').click(function() {
    });
}

function buscarInfraccion(){
    $('#btn-buscarPatente').click(function(){
        var patente = $('#input-patente').val();
        console.log(patente);
        $('#input-patente').val('');
        consultarInfraccion(patente);
    });
}

function cargarPatenteNoEncontrada(patente){
    $('.lado-derecho div.contenido').load('listadoInfracciones.html');
    $('#titulo-patente').val('La patente ' + patente.toUpperCase() + 'no fue encontrada');
}

function cargarListadoInfracciones(patente,respuesta){
    $('.lado-derecho div.contenido').load('listadoInfracciones.html');
    $(document).ready(function(){
        $('#titulo-patente').val('Infracciones para la patente nro ' + patente);
        agregarListado(respuesta);
    });
}


function agregarListado(respuesta){
    console.log(respuesta);
    respuesta.forEach(o => {
        
        let tag = '<div>' +
        'Infracción: ' + o.id + '<br>' +
        o.fechaHoraRegistro + '<br>' +
        o.fechaHoraActualizacion + '<br>' +
        o.direccionRegistrada + '<br>' +
        o.tipoInfraccion + '<br>' +
        o.montoAPagar + '<br>' +
        o.existeAcarreo + '</div><br>';
        
        $('#infracciones-contenedor').append(tag);
    });
}

$(document).ready(function(){
    buscarInfraccion();
});