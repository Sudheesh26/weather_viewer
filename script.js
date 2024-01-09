const weatherDataElement = document.getElementById('weatherData');

function applyBlur() {
    const blurredArea = document.querySelector('.blurred-area');
    blurredArea.style.backdropFilter = 'blur(10px)'; // Adjust the blur radius as needed
}

function removeBlur() {
    const blurredArea = document.querySelector('.blurred-area');
    blurredArea.style.backdropFilter = 'none';
}




document.addEventListener("keyup", function (event) {
    if(event.key == 'Enter')
    {
        weather_find();
    }
})

function weather_find() {
    const city = document.querySelector('#cityInput').value;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0a92c302ab9402a52161959f2c8a6352`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`+ city+ `&units=metric&appid=5aaaa5f4b01a17068af419420c9e0379`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const img_id = data.weather[0].icon;
            const img_url = document.createElement("img");
            img_url.src = `https://openweathermap.org/img/wn/${img_id}@2x.png`;


            const temp = data.main.temp;
            const name = data.name;
            const description = data.weather[0].description;

            
            weatherDataElement.innerHTML = `${name} <img src="${img_url.src}"> <br><br> Temperature: ${temp}, Weather : ${description}`;
            
            background(data.weather[0].id)
            
        })
        .catch(error => {
            console.log(error);
            weatherDataElement.innerHTML = `<h4>Enter a valid City Name, or please check your spelling</h4>`
        });
}

//document.addEventListener("DOMContentLoaded", 
function background(weather_id) {
    // Assume weather_id is defined and contains the weather condition code

    var videoElement = document.createElement("video");
    videoElement.id = "background-video";
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;

    var contentDiv = document.querySelector(".content");
    contentDiv.appendChild(videoElement);

    var weather;
    if ((weather_id >= 300 && weather_id <= 321) || (weather_id >= 500 && weather_id <= 531)) {
        setVideoSource('rain.mp4');
    } else if ((weather_id >= 700 && weather_id <= 781)) {
        setVideoSource('mist.mp4');
    } else if (weather_id == 800) {
        setVideoSource('clear_sky.mp4');
    } else if (weather_id >= 801 && weather_id <= 804) {
        setVideoSource('cloudy.mp4');
    } else if (weather_id >= 200 && weather_id <= 232) {
        setVideoSource('thunderstorm.mp4');
    }else if (weather_id >= 600 && weather_id <= 622) {
        setVideoSource('snowfall.mp4');
    }

    function setVideoSource(videoFileName) {
        var sourceElement = document.createElement("source");
        sourceElement.src = 'wallpapers/' + videoFileName;
        sourceElement.type = 'video/mp4';
        videoElement.appendChild(sourceElement);
    }
};
