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
let overlay = document.querySelector(".overlay");

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
                meteoInfo.classList.add('appear')
                overlay.classList.add('appear')
                villeNameModal.innerHTML =  villesV2[i].name;
                villeTemp.innerHTML= lesInfosApi.currentConditions.temp.c + '°C'
                villeVent.innerHTML = lesInfosApi.currentConditions.wind.km + ' km/h'
                
                innerPrecip.style.width = lesInfosApi.currentConditions.precip
                innerHumid.style.width = lesInfosApi.currentConditions.humidity
                
                precipPercent.innerHTML = lesInfosApi.currentConditions.precip
                humidPercent.innerHTML = lesInfosApi.currentConditions.humidity
                
                // le graphique
                // Recuperer et push les infos nécéssaires dans un nouveau Array
                let allDays = []
                let maxTemp = []
                let minTemp = []
                
                for (i in lesInfosApi.next_days) {
                    // Recuperer les jours suivants
                    allDays.push(lesInfosApi.next_days[i].day)
                    // Recuperer les temp max 
                    maxTemp.push(lesInfosApi.next_days[i].max_temp.c)
                    // Recuperer les temp min 
                    minTemp.push(lesInfosApi.next_days[i].min_temp.c)
                }

                
                function createChart() {
                    const ctx = document.getElementById('myChart').getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: allDays,
                            datasets: [{
                                label: 'Max Temp',
                                data: maxTemp,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            },{
                                label: 'Min Temp',
                                data: minTemp,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                        
                    });
                    myChart.update()

                    // myChart.destroy()
                    cross.addEventListener ('click', function() {
                        meteoInfo.classList.remove('appear')
                        overlay.classList.remove('appear')
                        myChart.destroy()
                    })
                }
                createChart()
            }
        };
        xhr.open("GET", `https://weatherdbi.herokuapp.com/data/weather/${laVille}`, true);
        xhr.send();
    })
    
    
}

