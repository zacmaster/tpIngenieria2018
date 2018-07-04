var Grua = function(id, posicionesYEstado) {
    this.id = id;
    this.posicionesYEstado = posicionesYEstado;

    var actualIx = 0;

    this.run = function(callback) {
        var self = this;
        setTimeout(function() {
            callback(posicionesYEstado[actualIx]);

            actualIx += 1;
            if(actualIx < posicionesYEstado.length) {
                self.run(callback);
            }
        }, 1000);
    }
};

var DatosGrua = function(latitud, longitud, estado){
    this.latitud = latitud;
    this.longitud = longitud;
    this.estado = estado;
}

