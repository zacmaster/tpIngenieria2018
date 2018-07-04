var patente = "";
buscarInfraccion(patente);
function buscarInfraccion(patente){
    $('button').click(function(){
        patente = $('#inputPatente').val();
        console.log(patente);
        // $('#inputPatente').val('');
        consultarInfraccion(patente);
    });
}
function consultarInfraccion(patente){
    console.log('consultando');
    
    var patente = patente.toUpperCase();
    var urlInf = 'https://infraccionesya.herokuapp.com/api/' + patente + '/infracciones';
    asyncQuery(urlInf,callbackInfraccion);
}


var callbackInfraccion = function(response){
    if(response.length === 0) cargarPatenteNoEncontrada(patente);
    else{
        var cache = [];
        response.infracciones.forEach(element => {
            cache.push(element); });
            
        response = cache;
        var patente = devolverPatente(response);
        if (response.length > 0){cargarListadoInfracciones(patente, response)}
        else{cargarPatenteNoEncontrada(patente, response)}
    }
}

function devolverPatente(){
    return patente;
}

function setTitulo(dato){
    $('.titulo').append('<h3>Patente ' + dato + '</h3>');
}

function cargarPatenteNoEncontrada(patente){
    console.log('patente'+ patente + 'no encontrada');
    
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
