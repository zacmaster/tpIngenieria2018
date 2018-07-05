function configuracionVistas(numeroVista, idButton){
    $('.contenedorVistas').empty();
    $('.contenedorVistas').load('vista' + numeroVista + '.html');
    
    $('.links a').removeClass('buttonSelected').addClass('buttonUnselected');
    $(idButton).addClass('buttonSelected');

}

function cargarVista1(){configuracionVistas('1', '#btnBuscarInfraccion')}
function cargarVista2(){configuracionVistas('2', '#btnDepositos')}
function cargarVista3(){configuracionVistas('3', '#btnGruas')}

function clickNavegacion() {
    $('#btnBuscarInfraccion').click(function(){ cargarVista1()});
    $('#btnDepositos').click(function(){ cargarVista2()});    
    $('#btnGruas').click(function(){ cargarVista3(); });
}

clickNavegacion();
cargarVista1();


