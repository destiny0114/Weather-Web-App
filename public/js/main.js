const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);
const storage = new Storage();
const defaultweather = storage.getLocation();
const weather = new Weather(defaultweather.lat, defaultweather.lon);
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initPostion, null, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });

        function initPostion(position) {
            if (localStorage.getItem('lat') === null || localStorage.getItem('lon') === null) {
                weather.changeLocation(position.coords.latitude, position.coords.longitude);
            }

            weather.geocode()
                .then(result => {
                    let city, region, country;

                    for (let i = 0; i < result.length; i++) {
                        if (result[i].types[0] == 'locality') {
                            city = result[i].long_name;
                        }

                        if (result[i].types[0] == 'administrative_area_level_1') {
                            region = result[i].long_name;
                        }

                        if (result[i].types[0] == 'country') {
                            country = result[i].long_name;
                        }
                    }

                    let place_address = formatLocation([city, region, country]);

                    weather.sendLocation()
                        .then(result => {
                            ui.displayWeather(place_address, result);
                        })
                        .catch(err => {
                            console.log(err);
                        });

                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});


searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];

    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();

    weather.changeLocation(lat, lon);
    storage.setLocation(lat, lon);

    weather.sendLocation().then(result => {
        ui.displayWeather(place.formatted_address, result);
    }).catch(
        err => {
            console.log(err);
        });
});

function formatLocation(arr) {
    let result;

    if (arr.length > 2) {
        result = arr.slice(0, -1).join(' ').concat(', ') + arr.slice(-1);
    } else {
        result = arr.filter(val => val).join(', ');
    }
    return result;
}