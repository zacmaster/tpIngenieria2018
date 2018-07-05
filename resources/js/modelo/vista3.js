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


    var gruasLayer = L.layerGroup().addTo(mapa);
    mapa.layersControl.addOverlay(gruasLayer, 'Gruas');

    var arr2 = [];
    var velocidades = []
    gruas.forEach(e => {
        var aux = [];
        var velocidadesAux = [];
        for (let index = 0; index < e.posicionesYEstado.length; index++) {
            var arr = [];
            arr.push(e.posicionesYEstado[index].latitud);
            arr.push(e.posicionesYEstado[index].longitud);
            aux.push(arr);
            velocidadesAux.push(500);

        }
        arr2.push(aux);
        velocidades.push(velocidadesAux);
    });
    
    for (let index = 0; index < arr2.length; index++) {
        
        var p = L.Marker.movingMarker(arr2[index],velocidades[index], {autostart: true,loop:true, icon: gruaIcon});
        gruasLayer.addLayer(p);
    }
    


}






    //forma automatica.
var marker = L.Marker.movingMarker([[123123,123123],[123123,123123]],
    [3000,3000], {autostart: true});
    






