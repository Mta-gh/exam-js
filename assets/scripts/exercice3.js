const villesV2 = [
    { name: "Bruxelles", desc: "Capitale de l’Europe", url: "brussels.jpg" },
    { name: "Londres", desc: "Le melting pot anglais", url: "london.jpg" },
    { name: "Washington", desc: "Cité de la Maison Blanche", url: "washington.jpg" },
    { name: "Madrid", desc: "La Capitale du Royaume", url: "madrid.jpg" },
    { name: "Ottawa", desc: "Capitale du pays des Caribous", url: "ottawa.jpg" },
    { name: "Paris", desc: "La Ville Lumière", url: "paris.jpg" },
    { name: "Tokyo", desc: "Ville la plus peuplée du monde", url: "tokyo.jpg" },
    { name: "Rome", desc: "La ville aux sept collines", url: "rome.jpg" },
    { name: "Lisbonne", desc: "La cité aux mille couleurs", url: "lisboa.jpg" }
];

const infoBruxelles = {
    temp: 9,
    precip: "5%",
    humidite: "68%",
    vent: 5,
    icon: "https://ssl.gstatic.com/onebox/weather/64/sunny.png"
}



// faire apparaitre images etc  
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

// recuperer tout les elements html nécéssaires
let meteoInfo = document.querySelector(".meteo-info");
let villeNameModal = document.querySelector('.ville-name');
let villeTemp = document.querySelector('.ville-temp');
let villeVent = document.querySelector('.ville-vent');
let innerPrecip = document.querySelector('.inner-precip');
let innerHumid = document.querySelector('.inner-humid');
let precipPercent = document.querySelector('.precip-percent');
let humidPercent = document.querySelector('.humid-percent');
let cross = document.querySelector('.cross');
let laVille

// faire apparaitre les infos

for (let i = 0; i < villesV2.length; i++) {
    
    imageCard[i].addEventListener('click', function() {
        
        laVille = villesV2[i].name
        let lesInfosApi
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    lesInfosApi = JSON.parse(xhr.responseText);
                    console.log(lesInfosApi);
                    meteoInfo.classList.toggle('appear')
                    villeNameModal.innerHTML =  villesV2[i].name;
                    villeTemp.innerHTML= lesInfosApi.currentConditions.temp.c + '°C'
                    villeVent.innerHTML = lesInfosApi.currentConditions.wind.km + ' km/h'
                    // innerHumid.style.transition = `all 1s ease-in-out`
                    
                    innerPrecip.style.width = lesInfosApi.currentConditions.precip
                    innerHumid.style.width = lesInfosApi.currentConditions.humidity
                    
                    precipPercent.innerHTML = lesInfosApi.currentConditions.precip
                    humidPercent.innerHTML = lesInfosApi.currentConditions.humidity
                }
            };
            xhr.open("GET", `https://weatherdbi.herokuapp.com/data/weather/${laVille}`, true);
            xhr.send();
        
    })
    
    cross.addEventListener ('click', function() {
        meteoInfo.classList.remove('appear')
    })
}
