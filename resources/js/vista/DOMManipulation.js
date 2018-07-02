function configuracionVistas(nombreVista, idButton){
    $('.contenedorVistas').load(nombreVista);
    $('.links a').removeClass('buttonSelected').addClass('buttonUnselected');
    $(idButton).addClass('buttonSelected');

}

function cargarVista1(){
    configuracionVistas('vista1.html', '#btnBuscarInfraccion');
    clickNavegacion();
    $('.encontrado').hide();
}
function cargarVista2(){configuracionVistas('vista2.html', '#btnDepositos')}
function cargarVista3(){configuracionVistas('vista3.html', '#btnGruas')}

function clickNavegacion() {
    $('#btnBuscarInfraccion').click(function(){ cargarVista1()});
    $('#btnDepositos').click(function(){ cargarVista2()});    
    $('#btnGruas').click(function(){ cargarVista3(); });
  }


