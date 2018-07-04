var estadosGrua = [];
var posicionesGruas = [];
var gruas = [];

var cantGruas = 0;
var urlEstados = 'https://infraccionesya.herokuapp.com/api/estadosGruas/';
var urlGruas = 'https://infraccionesya.herokuapp.com/api/gruas/';
	


function cargarEstados(){
    var estados = callSincronico(urlEstados);
    estados.estados.forEach(element => {
        estadosGrua.push(element.descripcion);
    });
    console.log("cargarEstados");
    console.log(estadosGrua);
}

function cargarPosicionesGruas(){
    var s1 = 'https://infraccionesya.herokuapp.com/api/gruas/';
    var s2 = '/posiciones';
    cantGruas = callSincronico(s1).gruas.length;
    console.log(cantGruas);
    
    for (let index = 1; index < cantGruas+1; index++) {
        var x = callSincronico(s1+index+s2).posiciones;
        posicionesGruas.push(x);
        console.log('cargarPosicionesGrua');
    }
}

function cargarGruas(){
    var gruasRequest = callSincronico(urlGruas).gruas;
    
    for (let index = 0; index < cantGruas; index++) {
        var datos = [];
        posicionesGruas[index].forEach(e => {
            datos.push(new DatosGrua(
                e.ubicacion.lat,
                e.ubicacion.lon,
                estadosGrua[e.estado]
            ))
        });
        gruas.push(new Grua(gruasRequest[index].id,datos))
    }
}


var gruaIcon = L.icon({
    iconUrl: 'resources/leaflet/images/gruaMarker.png',

    iconSize:     [38, 65], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function dibujarGruas(){

    mapa.setView([gruas[0].posicionesYEstado[0].latitud,
        gruas[0].posicionesYEstado[0].longitud],14);

    var gruasLayer = L.layerGroup().addTo(mapa);
    mapa.layersControl.addOverlay(gruasLayer, 'Gruas');
    gruas.forEach(e => {
        var p = L.marker(   [e.posicionesYEstado[0].latitud,
                            e.posicionesYEstado[0].longitud],
                            {icon: gruaIcon}
        );
        gruasLayer.addLayer(p);
    });
    // var p = L.marker([gruas[0].posicionesYEstado[1].latitud,
    //     gruas[0].posicionesYEstado[1].longitud],{icon: gruaIcon});

    // gruasLayer.addLayer(p);
    
}






