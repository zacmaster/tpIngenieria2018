var mapa;
var depositos = [];
var mapContainer;

function requestDepositos(idMapContainer){
    $.ajax({
        url: 'https://infraccionesya.herokuapp.com/api/depositos',
        cache: false,
        success: function (data) {
            if($("#" + idMapContainer).children().length < 4){
                $('#ajax-spinner').hide();
                callbackDepositos(data, idMapContainer);
            }
        }
    });
}


var callbackDepositos = function (response, idMapContainer) {
    
    var cache = response;
    cache.depositos.forEach(element => {
        depositos.push(element);
    });
    dibujarMapaV2(idMapContainer);
}

var depositoIcon = L.icon({
    iconUrl: 'resources/leaflet/images/depositoMarker.png',

    iconSize:     [38, 65], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});



function dibujarMapaV2(contenedor){
    
    mapa = createMap(contenedor);
    dibujarDepositos(mapa);
}

function dibujarDepositos(mymap){
    mymap.setView([depositos[1].ubicacion.lat,depositos[1].ubicacion.lon],15);

    function clickZoom(e) {
        mymap.setView(e.target.getLatLng(),15);
    }
    
    depositos.forEach(deposito => {
        var p = L.marker([deposito.ubicacion.lat,deposito.ubicacion.lon],{icon: depositoIcon});
        var etiqueta =  '"' + deposito.nombre + '"' +
                        '<br>Abierto de ' + deposito.horarios +
                        '<br>Dir. ' + deposito.direccion +    
                        '<br> Tel. ' + deposito.telefono;
        p.addTo(mymap).bindPopup(etiqueta).on('click', clickZoom);
    });
}

