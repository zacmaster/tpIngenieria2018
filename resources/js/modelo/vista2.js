function requestDepositos(idMapContainer){
    $.ajax({
        url: 'https://infraccionesya.herokuapp.com/api/depositos',
        cache: false,
        success: function (data) {
            if($("#" + idMapContainer).children().length < 4){
                $('#ajax-spinner').hide();
                callbackDepositos(data,idMapContainer);
            }
        }
    });
}

var depositos = [];

var callbackDepositos = function (response,idMapContainer) {
    
    var cache = response;
    cache.depositos.forEach(element => {
        depositos.push(element);
    });
    dibujarDepositos(idMapContainer);
}

var depositoIcon = L.icon({
    iconUrl: 'resources/leaflet/images/depositoMarker.png',

    iconSize:     [38, 65], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

    

function dibujarDepositos(idMapContainer){
    console.log('idMapContainer');
    
    console.log(idMapContainer);
    

    var mymap = L.map(idMapContainer).setView([51.505, -0.09], 13);
    
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    
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

