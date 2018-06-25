var asyncQuery = function(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4){
            if(this.status === 200 ||this.status === 304){
                console.log("STATUS: "+ this.status);
                respuesta = JSON.parse(xhttp.responseText);
                callback(respuesta);
            }
        }
    };
    xhttp.open("GET", url, true);
    return xhttp.send();
}