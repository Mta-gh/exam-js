const villesV2 = [
    { name : "Bruxelles", desc : "Capitale de l’Europe", url : "brussels.jpg"},
    { name : "Londres", desc : "Le melting pot anglais", url : "london.jpg"},
    { name : "Washington", desc : "Cité de la Maison Blanche", url : "washington.jpg"},
    { name : "Madrid", desc : "La Capitale du Royaume", url : "madrid.jpg"},
    { name : "Ottawa", desc : "Capitale du pays des Caribous", url : "ottawa.jpg"},
    { name : "Paris", desc : "La Ville Lumière", url : "paris.jpg"},
    { name : "Tokyo", desc : "Ville la plus peuplée du monde", url : "tokyo.jpg"},
    { name : "Rome", desc : "La ville aux sept collines", url : "rome.jpg"},
    { name : "Lisbonne", desc : "La cité aux mille couleurs", url : "lisboa.jpg"}
];


let imageCard = document.querySelectorAll('.image-card');

for (let i = 0; i < villesV2.length; i++) {
    let imgContain = document.createElement('div')
    let image = document.createElement('img')
    let villeName = document.createElement('h2');
    let villeDesc = document.createElement('p');
    image.src = `assets/images/${villesV2[i].url}`
    villeName.innerHTML =  villesV2[i].name
    villeDesc.innerHTML =  villesV2[i].desc
    imageCard[i].appendChild(imgContain)
    imgContain.appendChild(image)
    imageCard[i].appendChild(villeName);
    imageCard[i].appendChild(villeDesc);
}

