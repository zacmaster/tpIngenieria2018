var asyncQuery = function(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4){
            if(this.status === 200 || this.status === 304){
                console.log("STATUS: "+ this.status);
                // var x = JSON.parse(xhttp.responseText);
                // console.log(x.infracciones.length);
                
                callback(JSON.parse(xhttp.responseText));
            }
        }
    };
    xhttp.open("GET", url, true);
    return xhttp.send();
}