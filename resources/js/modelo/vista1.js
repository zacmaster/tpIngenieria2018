var tiposInfraccion = [];
var infraccionesTemp = [];

urlTiposInfraccion = 'https://infraccionesya.herokuapp.com/api/tiposInfraccion/';

function requestTiposInfraccion(url){
    return ;
}

function cargarTiposInfraccion(urlTiposInfraccion){
    var response =  callSincronico(url);
    response.tipos.forEach(e => {
        tiposInfraccion.push(e.descripcion);
    });
}



// var patente = "";
// buscarInfraccion(patente);
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
    asyncQuery(urlInf, callbackInfraccion);
}

function callbackInfraccion(response){
    
    if(response.infracciones.length == 0){
        cargarPatenteNoEncontrada(response);
        console.log('sin infracciones');
    }

    else{
        console.log('con infracciones');
        cargarListadoInfracciones(response);
        console.log(response);
    }
    
}


// var callbackInfraccion = function(response){
//     if(response.length === 0) cargarPatenteNoEncontrada(patente);
//     else{
//         var cache = [];
//         response.infracciones.forEach(element => {
//             cache.push(element); });
            
//         response = cache;
//         var patente = devolverPatente(response);
//         if (response.length > 0){cargarListadoInfracciones(patente, response)}
//         else{cargarPatenteNoEncontrada(patente, response)}
//     }
// }

function devolverPatente(){
    return patente;
}

function setTitulo(dato){
    $('.titulo').append('<h3>Patente ' + dato + '</h3>');
}

function cargarPatenteNoEncontrada(response){
    var patente = response.patente;
    console.log('patente'+ patente + 'no encontrada');
    $('#patenteLabel').append(patente);
    $('.noEncontrado').show();

}

function cargarListadoInfracciones(patente,respuesta){
    $('.lado-derecho div.contenido').load('listadoInfracciones.html');
    $('#titulo-patente').val('Infracciones para la patente nro ' + patente);
    agregarListado(respuesta);
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

function dibujarDeposito(idMapContainer, deposito){
    
    console.log(idMapContainer);
    

    var mymap = L.map(idMapContainer).setView([51.505, -0.09], 13);
    
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    
    mymap.setView([deposito.ubicacion.lat,deposito.ubicacion.lon],15);

    function clickZoom(e) {
        mymap.setView(e.target.getLatLng(),15);
    }
    
    var p = L.marker([deposito.ubicacion.lat,deposito.ubicacion.lon],{icon: depositoIcon});
    var etiqueta =  '"' + deposito.nombre + '"' +
                    '<br>Abierto de ' + deposito.horarios +
                    '<br>Dir. ' + deposito.direccion +    
                    '<br> Tel. ' + deposito.telefono;
    p.addTo(mymap).bindPopup(etiqueta).on('click', clickZoom);
}
