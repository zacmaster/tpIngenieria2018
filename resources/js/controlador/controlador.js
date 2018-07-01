$(document).ready(function () {
    new Promise(function (resolve, reject) {
        resolve(cargarVista1());
    }).then(console.log("Hola mundo"));
});


// let miPrimeraPromise = new Promise((resolve, reject) => {
//     // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
//     // En este ejemplo, usamos setTimeout(...) para simular código asíncrono. 
//     // En la vida real, probablemente uses algo como XHR o una API HTML5.
//     setTimeout(function(){
//       resolve("¡Éxito!"); // ¡Todo salió bien!
//     }, 250);
//   });