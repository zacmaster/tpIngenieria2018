$(document).ready(function(){
    $('#buscar').click(function(e){
        e.preventDefault();
        console.log("asd");
        $('#lado-derecho').load('listadoInfracciones.html');
    });

});

