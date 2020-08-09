let teddy = document.getElementById('teddy');
let camera = document.getElementById('camera');
let furniture = document.getElementById('furniture');

teddy.addEventListener('click', function () {
    let teddyUrl = "teddy";
    document.location.href = 'product.html?id=' + teddyUrl;
    window.open('product.html');
});

camera.addEventListener('click', function () {
    let cameraUrl = "camera";
    document.location.href = 'product.html?id=' + cameraUrl;
    window.open('product.html');
});

furniture.addEventListener('click', function () {
    let furnitureUrl = "furniture";
    document.location.href = 'product.html?id=' + furnitureUrl;
    window.open('product.html');
});

