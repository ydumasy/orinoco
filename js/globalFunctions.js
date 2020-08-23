// Fonction avec promesse permettant d'effectuer une requête HTTP asynchrone
function ajaxGet(url) {
    let req = new XMLHttpRequest();
    return new Promise ((resolve, reject) => {
        req.open("GET", url);
        req.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status < 400) {
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject(console.error(req.status + " " + req.statusText + " " + url));
                }
            }
        };
        req.send(null);
    });
}

